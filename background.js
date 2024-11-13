chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTabUrl") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let currentUrl = tabs[0]?.url || "No active tab";
            sendResponse({ url: currentUrl });
        });
        return true;
    }
});
