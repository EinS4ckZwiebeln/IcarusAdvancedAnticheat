Util = {}

if IsDuplicityVersion() then
    math.randomseed(os.time())
    math.random(); math.random(); math.random()
else
    math.randomseed(GetGameTimer())
    math.random(); math.random(); math.random()
end

local rName = GetCurrentResourceName()
function Util.GetResourceName()
    return rName
end

local version = GetResourceMetadata(Util.GetResourceName(), "version", 0)
function Util.GetVersion()
    return version
end

local isSpawned = false
AddEventHandler("playerSpawned", function()
    isSpawned = true
end)

AddEventHandler("playerDropped", function(reason)
	isSpawned = false
end)

function Util.IsPlayerSpawned()
    if isSpawned then
        return true
    else
        if NetworkIsSessionActive() then
            Citizen.Wait(5000)
            return true
        else
            return false
        end
    end
end

local meleeWeapons = {-1569615261, -1716189206, 1737195953, 1317494643, -1786099057, -2067956739, 1141786504, -102323637, -1834847097, -102973651, -656458692, -581044007, -1951375401, -538741184, -1810795771, 419712736, -853065399}
function Util.IsMeleeWeapon(hash)
    for i=1, #meleeWeapons do
        if meleeWeapons[i] == hash then
            return true
        end
    end
    return false
end

local aoeWeapons = {911657153, 1198879012, -1568386805, -1312131151, 2138347493, 1834241177, 1672152130, 1305664598, 125959754, -1813897027, 741814745, -1420407917, -1600701090, 615608432, 101631238, 883325847, 1233104067, -37975472, -1169823560}
function Util.IsAOEWeapon(hash)
    for i=1, #aoeWeapons do
        if aoeWeapons[i] == hash then
            return true
        end
    end
    return false
end

local damagelessWeapons = {911657153, 1198879012, 1233104067, 600439132, 126349499, -37975472, 101631238}
function Util.IsHarmlessWeapon(hash)
    for i=1, #damagelessWeapons do
        if damagelessWeapons[i] == hash then
            return true
        end
    end
    return false
end

function Util.GetRandomVariable(length)
	local res = ""
	for i = 1, length do
        local chance = math.random(0, 1)
        if chance == 0 then
		    res = res .. string.char(math.random(97, 122))
        elseif chance == 1 then
            res = res .. tostring(math.random(0, 9))
        end  
	end
	return res
end

function Util.GetResourceEvents()
    local events, files = {}, Util.GetFiles({"client_script", "server_script"})
    for i=1, #files do
        local file = LoadResourceFile(Util.GetResourceName(), files[i])
        for key, value in string.gmatch(file, 'icarus:(%w*)",') do
            if key and events[key] == nil then
                events[key] = key
            end
        end
    end
    return events
end

function Util.GetIdentifier(source, type)
    local identifier = GetPlayerIdentifiers(source)
    for k, v in pairs(identifier) do
        if string.sub(v, 1, string.len(type)) == type then
            return tostring(v)
        end
    end
    return (type .. "unknownlicense")
end

function Util.ConstructEmbed(source, reason, data, fileName)
	return {{
		["color"] = "8421631",
		["title"] = "Icarus Anticheat v" .. Util.GetVersion(),
		["fields"] = {
			{
				["name"] = "Violation",
				["value"] = reason,
				["inline"] = false
			},
            {
				["name"] = "Optional Data",
				["value"] = data,
				["inline"] = false
			},
			{
				["name"] = "Steam",
				["value"] = Util.GetIdentifier(source, "steam:"),
				["inline"] = false
			},
			{
				["name"] = "Discord",
				["value"] = Util.GetIdentifier(source, "discord:"),
				["inline"] = false
			},
			{
				["name"] = "FiveM",
				["value"] = Util.GetIdentifier(source, "license:"),
				["inline"] = false
			},
		},
        ["image"] = {
            ["url"] = "attachment://" .. fileName
        },
		["footer"] = {
			["text"] = "Icarus Data Collector"
		}
	}}
end

function Util.GetDistance(x1, y1, x2, y2)
	local dx = x1 - x2
	local dy = y1 - y2
	return math.sqrt (dx * dx + dy * dy)
end

function Util.GetFiles(options)
    local files = {}
    for k=1, #options do
        local occurences = GetNumResourceMetadata(Util.GetResourceName(), options[k])
        for i=1, occurences do
            local metaVal = GetResourceMetadata(Util.GetResourceName(), options[k], i)
            table.insert(files, metaVal)
        end
    end
    return files
end

function Util.HashifyList(list)
    local hashified = {}
    for i=1, #list do
        local hashVal = GetHashKey(list[i])
        table.insert(hashified, hashVal)
    end
    return hashified
end

function Util.GetAngleDiff(x, y, max)
	if x > y then
        local long = (x - y) > (max / 2)
        if long then
            return max - (x - y)
        else
            return (x - y)
        end
	else
        local long = (y - x) > (max / 2)
        if long then
            return max - (y - x)
        else
            return (y - x)
        end
	end
end

function Util.IsAlphaNumeric(string, additional)
    local escape = "%[%]%(%)%{%}"
    if string.match(string, "^[%w" .. additional .. escape .. "]+$") then
        return true
    else
        return false    
    end
end