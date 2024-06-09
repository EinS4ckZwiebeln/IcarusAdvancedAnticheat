module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	globals: {
		"ts-jest": {
			importHelpers: true,
			tsconfig: "tests/tsconfig.test.json",
			diagnostics: {
				warnOnly: true,
				pathRegex: /\.(spec|test)\.ts$/,
			},
		},
	},
	// Remove this transform stuff once cfx finally updates to a newer version of node.js
	/*
	transform: {
		"^.+\\.(ts|tsx|js|jsx)$": "esbuild-jest",
	},
	*/
	transformIgnorePatterns: ["/node_modules/(?!axios)"],
};
