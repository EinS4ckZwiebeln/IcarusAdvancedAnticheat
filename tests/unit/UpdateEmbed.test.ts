import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { UpdateEmbed } from "../../src/server/web/UpdateEmbed";

describe("UpdateEmbed", () => {
	it("should construct a update embed object", () => {
		const banEmbed = new UpdateEmbed("v1.0.0");
		const embed = banEmbed.embed[0];
		expect(embed.color).toBeDefined();
		expect(embed.author.name).toBeDefined();
		expect(embed.author.icon_url).toBeDefined();
		expect(embed.title).toBeDefined();
		expect(embed.description).toBeDefined();
		expect(embed.url).toBeDefined();
		expect(embed.footer).toBeDefined();
		expect(embed.fields).toBeUndefined();
		expect(embed.timestamp).toBeUndefined();
		expect(embed.image).toBeUndefined();
	});
});
