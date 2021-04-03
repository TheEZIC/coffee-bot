import { readFileSync } from "fs";
import path from "path";

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

const Config: IConfig = JSON.parse(readFileSync(path.resolve(__dirname, "config.json") ).toString());

export default Config;