if not ServerConfig.Modules.Events.enabled then
    return
end

local honeypots = ServerConfig.Modules.Events.honeyPots

for i=1, #honeypots do
    AddEventHandler(honeypots[i].event, function(...)
        source = tonumber(source)
        if honeypots[i].condition() then
            TriggerEvent("icarus:my602oxd71pv", source, "Illegal Event [C1]", false, {
                eventName = honeypots[i],
                condition = honeypots[i].condition()
            })
        end
    end)
end