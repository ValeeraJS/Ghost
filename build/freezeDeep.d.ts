interface IAnyObject extends Object {
    [key: string]: any;
}
declare const freezeDeep: (obj: IAnyObject) => IAnyObject;
export default freezeDeep;
