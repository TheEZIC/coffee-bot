import { VK } from "vk-io";
import { Client as DS, TextChannel } from "discord.js";

import Utils from "./Utils";
import Config from "./Config";
import startServer from "./Server";

export default class Bot {
    private VKClient = new VK({
        token: Config.vk.token,
        pollingGroupId: Number(Config.vk.groupId),
    })

    private DSClient = new DS();

    public async start() {
        await this.DSClient.login(Config.discord.token);
        await this.VKClient.updates.start();

        startServer();

        this.DSClient.user.setPresence({
            status: "online",
            activity: {
                name: "Пять Невест",
                type: "WATCHING",
            }
        });

        console.log("[Bot] Бот начал работу");

        this.VKClient.updates.on("wall_post_new", async ctx => {
            const { text } = ctx.wall;

            if (!text) return;

            const discordChannel = <TextChannel>this.DSClient.channels.cache.find(c => c.id === Config.discord.channelId);
            const hashtags = Utils.parseHashtags(text);
            const pureHashtags = hashtags.map(h => h.replace("#", ""));

            if (!discordChannel || !hashtags) 
                return;

            let hashtagsIds = [];

            for await (let tag of pureHashtags) {
                const role = await discordChannel.guild.roles.cache.find(r => r.name.toLowerCase() === tag.toLowerCase());
                if (role)
                    hashtagsIds.push(role?.id);
            }

            if (!hashtagsIds.length) return;

            discordChannel.send(hashtagsIds.map(h => `<@&${h}>`).join(" "));
        });
    }
}