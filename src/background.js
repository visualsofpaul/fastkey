chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.sendMessage(tab.id, { toggleVisible: true });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "setThemeToStorage": {
      chrome.storage.local.set({ fastKeyTheme: request.theme }, () => {
        console.log(`Theme ${request.theme} gesetzt.`);

        sendResponse(`Theme saved as ${request.theme}`);
      });
      return true;
    }
    case "getThemeFromStorage": {
      chrome.storage.local.get(["fastKeyTheme"], (data) => {
        console.log(`Gesetztes Theme: ${data.fastKeyTheme}`);

        sendResponse(data.fastKeyTheme);
      });
      return true;
    }
  }
});
