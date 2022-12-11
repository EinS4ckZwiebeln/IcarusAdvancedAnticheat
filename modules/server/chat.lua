if not ServerConfig.Modules.ChatFilter.enabled then
    return
end

AddEventHandler("chatMessage", function(source, author, text)
    source = tonumber(source)
    if not Util.IsAlphaNumeric(text, " .,?!+-*:/~#_<>$&|^()[]{}") then
        CancelEvent()
    end
end)