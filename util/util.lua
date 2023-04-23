Util = {}

if IsDuplicityVersion() then
    math.randomseed(os.time())
    math.random();
    math.random();
    math.random()
else
    math.randomseed(GetGameTimer())
    math.random();
    math.random();
    math.random()
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

function Util.GetDistance(x1, y1, x2, y2)
    local dx = x1 - x2
    local dy = y1 - y2
    return math.sqrt(dx * dx + dy * dy)
end

function Util.HashifyList(list)
    local hashified = {}
    for i = 1, #list do
        local hashVal = GetHashKey(list[i])
        table.insert(hashified, hashVal)
    end
    return hashified
end

function Util.TableContains(list, value)
    for i = 1, #list do if list[i] == value then return true end end
    return false
end

function Util.RemoveFromTable(list, value)
    for index, v in pairs(list) do if v == value then table.remove(list, index) end end
end

