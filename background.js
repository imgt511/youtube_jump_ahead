// Remove any existing context menus to ensure a clean slate
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "jumpAhead",
      title: "Jump Ahead",
      contexts: ["page"],
      // This pattern now includes both desktop and mobile YouTube watch pages
      documentUrlPatterns: [
        "https://www.youtube.com/watch*",
        "https://m.youtube.com/watch*"
      ]
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "jumpAhead") {
    // Execute the v5 content script
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  }
});