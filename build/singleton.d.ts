export declare const SINGLETON_KEY: unique symbol;
declare const singleton: {
    <T extends new (...args: any[]) => any>(classTarget: T): T;
    INSTANCE: typeof SINGLETON_KEY;
};
export default singleton;
