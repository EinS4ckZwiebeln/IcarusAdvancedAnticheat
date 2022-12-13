ChatFilter = {}

if not ServerConfig.Modules.ChatFilter.enabled then
    return
end

function ChatFilter.ProcessEventData(source, author, text)
    if not Util.IsAlphaNumeric(text, ".,?!+-*:/~#$&^() ") then
        CancelEvent()
    end
end