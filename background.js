(() => {
  "use strict";
  async function freeFreezeDom() {
    chrome.tabs.query(
      {
        active: !0,
        currentWindow: !0,
      },
      (tabs) => {
        const tabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: {
            tabId: tabId,
          },
          function: () => {
            setTimeout(() => {
              debugger;
            });
          },
          world: "MAIN"
        });
      },
    );
  }
  chrome.commands.onCommand.addListener((commandName) => {
    "free-freeze-dom" === commandName && freeFreezeDom();
  });
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "freeFreezeDOM",
      title: "Free Freeze DOM",
      contexts: ["all"],
    });
  });
  chrome.contextMenus.onClicked.addListener((clickEvent) => {
    "freeFreezeDOM" === clickEvent.menuItemId && freeFreezeDom();
  });
})();
