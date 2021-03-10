export default (func: Function) => {
    const args: any[] = [];
    const fn = (...rest: any[]) => {
        if (rest.length) {
            for(let item of rest) {
                args.push(item);
            }
            return fn;
        } else {
            return func(...args);
        }
    };
    return fn;
}
