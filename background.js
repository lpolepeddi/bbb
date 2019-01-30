chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
    let url = tabs[0].url;
    if (url.indexOf('www.espn.com') !== -1) {
      chrome.tabs.executeScript({ file: 'jquery-3.2.1.min.js' });
      chrome.tabs.executeScript({ file: 'espn.js' });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.url.indexOf('www.espn.com') !== -1 ||
    tab.url.indexOf('www.sbnation.com') !== -1 ||
    tab.url.indexOf('www.foxsports.com') !== -1 ||
    tab.url.indexOf('www.theringer.com') !== -1) {
    chrome.browserAction.setIcon({ path: 'icon-16.png', tabId: tabId });
  } else {
    chrome.browserAction.setIcon({ path: 'icon-16-disabled.png', tabId: tabId });
  }
});