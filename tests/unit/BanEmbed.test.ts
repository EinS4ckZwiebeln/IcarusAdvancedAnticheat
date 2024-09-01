import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { BanEmbed } from "../../src/server/web/BanEmbed";

describe("BanEmbed", () => {
	it("should construct a ban embed object", () => {
		const banEmbed = new BanEmbed(0, "TestReason", "image.png");
		const embed = banEmbed.embed[0];
		expect(embed.color).toBeDefined();
		expect(embed.author.name).toBeDefined();
		expect(embed.author.icon_url).toBeDefined();
		expect(embed.title).toBeDefined();
		expect(embed.fields).toBeDefined();
		expect(embed.timestamp).toBeDefined();
		expect(embed.image).toBeDefined();
		expect(embed.footer).toBeDefined();
		expect(embed.description).toBeUndefined();
		expect(embed.url).toBeUndefined();
	});
});
