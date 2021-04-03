import { readFileSync } from "fs";

interface IConfig {
    vk: {
        token: string,
        groupId: string,
    },
    discord: {
        token: string,
        channelId: string,
    },
}

const Config: IConfig = JSON.parse(readFileSync("./config.json").toString());

export default Config;