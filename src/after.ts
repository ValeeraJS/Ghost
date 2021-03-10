export default (func: Function, action: Function, ...args: any[]) => {
	return (...rest: any[]): any => {
		const result = func(...rest);

		action(...args);

		return result;
	};
};
