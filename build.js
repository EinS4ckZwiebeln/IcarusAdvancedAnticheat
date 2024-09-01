const esbuild = require("esbuild");

esbuild
	.build({
		logLevel: "info",
		entryPoints: ["src/server/App.ts", "src/rpc_loader/RPCLoader.ts"],
		outdir: "dist",
		bundle: true,
		packages: "bundle",
		platform: "node",
		target: "node16.9.1",
		minifySyntax: true,
		minifyWhitespace: true,
	})
	.catch(() => {
		process.exit(1);
	});
