export default class Utils {
    public static parseHashtags(text: string): string[] {
        const regexp = /#\S+/gmi;
        let match;
        let result = [];

        do {
            match = regexp.exec(text);
            if (match)
                result.push(match[0]);
        } while (match);

        return result;
    }
}