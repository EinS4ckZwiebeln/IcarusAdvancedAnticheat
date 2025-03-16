const esbuild = require("esbuild");

esbuild
	.build({
		logLevel: "info",
		entryPoints: ["src/server/App.ts", "src/rpc_loader/RPCLoader.ts"],
		outdir: "dist",
		bundle: true,
		packages: "bundle",
		platform: "node",
		target: "node22",
		minifySyntax: true,
		minifyWhitespace: true,
	})
	.catch(() => {
		process.exit(1);
	});
