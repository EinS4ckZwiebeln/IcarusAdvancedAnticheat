if not ServerConfig.Modules.Events.enabled then
    return
end

local honeypots = ServerConfig.Modules.Events.honeyPots
for i=1, #honeypots do
    AddEventHandler(honeypots[i], function(source, ...)
        source = tonumber(source)
        TriggerEvent("icarus:my602oxd71pv", source, "Illegal Event [C1]", false, {eventName = honeypots[i]})
    end)
end