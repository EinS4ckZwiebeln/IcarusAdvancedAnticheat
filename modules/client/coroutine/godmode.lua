if not ClientConfig.Modules.Godmode.enabled then
    return
end

Citizen.CreateThread(function()
	while not Util.IsPlayerSpawned() do
		Citizen.Wait(500)
	end
	while true do
		Citizen.Wait(15000)
		local ped = PlayerPedId()
		local rVal = ClientConfig.Modules.Godmode.decrement
		local modified = (GetEntityHealth(ped) - rVal)

		SetEntityHealth(ped, modified)
		Citizen.Wait(ClientConfig.Modules.Godmode.wait)
		local postHealth = GetEntityHealth(ped)
		if postHealth > modified and postHealth > 0 and not IsPedDeadOrDying(ped) then
			TriggerServerEvent("icarus:417szjzm1goy", "Godmode [C1]", false)
		else
			SetEntityHealth(ped, postHealth + rVal)
		end

		local pedHealth, pedArmor = GetEntityHealth(ped), GetPedArmour(ped)
		if pedHealth > ClientConfig.Modules.Godmode.maxHealth or pedArmor > ClientConfig.Modules.Godmode.maxArmor then
			TriggerServerEvent("icarus:417szjzm1goy", "Godmode [C2]", false, {
				health = pedHealth, 
				maxHealth = ClientConfig.Modules.Godmode.maxHealth,
				armor = pedArmor,
				maxArmor = ClientConfig.Modules.Godmode.maxArmor
			})
		end
	end
end)