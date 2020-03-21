export class Mapper {

    static Map(target, source){

        const keys = Object.keys(target);

        keys.forEach(key => {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        });

        return target;
    }
}