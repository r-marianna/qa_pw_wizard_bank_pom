export class RandomObject {
    static selectRandomKeyValue(obj) {
        const keys = Object.keys(obj);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];

        return {
            key: randomKey,
            value: obj[randomKey]
        };
    }
};
