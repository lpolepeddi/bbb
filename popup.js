function updateCount(response) {
  $('#num').html(response.numArticles);
}

function getCount() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const tab = tabs[0];
    const url = tabs[0].url;
    if (url.indexOf('www.espn.com') !== -1) {
      chrome.tabs.sendMessage(tab.id, {task: 'getNumArticles'}, (response) => {
        $('#message').html(response.numArticles + ' articles blocked.');
      });
    } else {
      $('#message').html('This extension blocks articles on <a href="http://www.espn.com/nba" target="_blank">ESPN</a>.');
    }
  });
}

$(document).ready(() => {
  getCount();
});
