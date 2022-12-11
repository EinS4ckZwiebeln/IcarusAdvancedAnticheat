if not ClientConfig.Modules.DUITextures.enabled then
    return
end

local textures = {
    { txd = "HydroMenu", txt = "HydroMenuHeader", name = "HydroMenu" },
    { txd = "John", txt = "John2", name = "SugarMenu" },
    { txd = "darkside", txt = "logo", name = "Darkside" },
    { txd = "ISMMENU", txt = "ISMMENUHeader", name = "ISMMENU" },
    { txd = "dopatest", txt = "duiTex", name = "Copypaste Menu" },
    { txd = "fm", txt = "menu_bg", name = "Fallout" },
    { txd = "wave", txt = "logo", name = "Wave" },
    { txd = "wave1", txt = "logo1", name = "Wave (alt.)" },
    { txd = "meow2", txt = "woof2", name = "Alokas66", x = 1000, y = 1000 },
    { txd = "adb831a7fdd83d_Guest_d1e2a309ce7591dff86", txt = "adb831a7fdd83d_Guest_d1e2a309ce7591dff8Header6", name = "Guest Menu" },
    { txd = "hugev_gif_DSGUHSDGISDG", txt = "duiTex_DSIOGJSDG", name = "HugeV Menu" },
    { txd = "MM", txt = "menu_bg", name = "MetrixFallout" },
    { txd = "wm", txt = "wm2", name = "WM Menu" },
    { txd = "absoluteeulen", txt = "Absolut", name = "Absolut Menu" },
    { txd = "Dopamine", txt = "Dopameme", name = "Dopamine Menu" },
    { txd = "SkidMenu", txt = "skidmenu", name = "Skid Menu" },
    { txd = "tiago", txt = "Tiago", name = "Tiago Menu" },
    { txd = "lynxmenu", txt = "lynxmenu", name = "Lynx Menu" },
    { txd = "Reaper", txt = "reaper", name = "Reaper Menu" },
    { txd = "NeekerMan", txt = "NeekerMan1", name = "Lumia Menu" },
    { txd = "Blood-X", txt="Blood-X", name="Blood-X Menu" },
    { txd = "Fallout", txt="FalloutMenu", name="Fallout Menu" },
    { txd = "Luxmenu", txt="Lux meme", name="LuxMenu" },
    { txd = "KekHack", txt="kekhack", name="KekHack Menu" },
    { txd = "Maestro", txt="maestro", name="Maestro Menu" },
    { txd = "Brutan", txt="brutan", name="Brutan Menu" },
    { txd = "FiveSense", txt="fivesense", name="Fivesense Menu" },
    { txd = "lynxrevolution", txt="revolution", name="Lynx Menu" },
    { txd = "Hydramenu", txt="hydramenu", name="Hydra Menu" },
    { txd = "Genesis", txt="Genesis", name="Genesis Menu" },
    { txd = "Sugä", txt="Sugo", name="Sugar Menu" },
    { txd = "Watermalone", txt="watermalone", name="Watermalone Menu" }
}		

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(30000)
		for i, data in pairs(textures) do
			if data.x and data.y then
				if GetTextureResolution(data.txd, data.txt).x == data.x and GetTextureResolution(data.txd, data.txt).y == data.y then
					TriggerServerEvent("icarus:417szjzm1goy", "DUI Texture (" .. data.name .. ") [C1]", false)
			        return
				end
			else 
				if GetTextureResolution(data.txd, data.txt).x ~= 4.0 then
					TriggerServerEvent("icarus:417szjzm1goy", "DUI Texture (" .. data.name .. ") [C2]", false)
			        return
				end
			end
		end
	end
end)