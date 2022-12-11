if not ServerConfig.Modules.ClearTasks.enabled then
    return
end

AddEventHandler("clearPedTasksEvent", function(sender, data)
	TriggerEvent("icarus:0tlj76j3duew", sender, "ClearPedTask [C1]", false)
	CancelEvent()
end)