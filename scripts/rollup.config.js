import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";

export default {
	input: "src/index.ts",
	output: [
		{
			file: "build/Ghost.js",
			format: "umd",
			indent: "\t",
			name: "Ghost",
			sourcemap: true
		},
		{
			file: "build/Ghost.module.js",
			format: "es",
			indent: "\t",
			sourcemap: true
		}
	],
	plugins: [
		json(),
		typescript({
			tsconfig: "./tsconfig.json"
		})
	]
};
