export default (func: Function, action: Function, ...args: any[]) => {
    return (...rest: any[]) => {
        action(...args);
        return func(...rest);
    }
}
