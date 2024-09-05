const esbuild = require("esbuild");

const build = async () => {
	try {
		const ctx = await esbuild.context({
			logLevel: "info",
			entryPoints: ["src/server/App.ts", "src/rpc_loader/RPCLoader.ts"],
			outdir: "dist",
			bundle: true,
			sourcemap: true,
			packages: "bundle",
			platform: "node",
			target: "node16.9.1",
		});
		await ctx.watch();
	} catch (error) {
		process.exit(1);
	}
};

build();
