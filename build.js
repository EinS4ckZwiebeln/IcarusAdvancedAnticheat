const esbuild = require("esbuild");

esbuild
	.build({
		entryPoints: ["src/server/App.ts", "src/rpc_loader/RPCLoader.ts"],
		outdir: "dist",
		bundle: true,
		packages: "bundle",
		platform: "node",
		target: "node16.9.1",
		minifySyntax: true,
		minifyWhitespace: true,
	})
	.then(() => {
		console.log("Build succeeded");
	})
	.catch((error) => {
		console.error("Build failed:", error);
		process.exit(1);
	});
