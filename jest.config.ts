module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				importHelpers: true,
				tsconfig: "tests/tsconfig.test.json",
				diagnostics: {
					warnOnly: true,
				},
			},
		],
	},
	transformIgnorePatterns: ["/node_modules/(?!axios)"],
};
