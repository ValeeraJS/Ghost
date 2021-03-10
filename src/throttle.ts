export default (func: Function, wait: number): Function => {
	let pre = Date.now();
	let now: number;

	return (...rest: any[]) => {
		now = Date.now();
		if (now - pre >= wait) {
			func(...rest);
			pre = Date.now();
		}
	};
};
