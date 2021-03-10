const set = new Set();

interface IAnyObject extends Object {
	[key: string]: any;
}

const deep = (obj: IAnyObject) => {
	const propNames = Object.getOwnPropertyNames(obj);

	propNames.forEach((name: string) => {
		const prop: any = obj[name];

		if (typeof prop === "object" && prop !== null && !set.has(prop)) {
			set.add(prop);
			deep(prop);
		}
	});

	return Object.freeze(obj);
};

const freezeDeep = (obj: IAnyObject): IAnyObject => {
	set.clear();

	return deep(obj);
};

export default freezeDeep;
