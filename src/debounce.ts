export default (func: Function, wait?: number): Function => {
	if (!wait) {
		return func;
	}
	let id: number | undefined;

	return (...rest: any[]) => {
		return new Promise((resolve) => {
			if (id !== undefined) {
				clearTimeout(id);
				id = undefined;
			}
			id = window.setTimeout(() => {
				resolve(func(...rest));
			}, wait);
		});
	};
};
