var count = 0;

function filter() {
  let tokens = [
    'LaVar',
    'Lonzo',
    'LaMelo',
    'LiAngelo',
    'Ball brothers',
    'Big Baller',
    'Ball Bros',
    'Ball bros',
  ];

  let selectors = [
    '#news-feed .contentCollection',
    '#news-feed .contentItem',
    'section.col-three .headlineStack__list li',
    'section.col-three article',
  ];

  for (let i = 0; i < selectors.length; i += 1) {
    let selector = selectors[i];
    let articles = $(selector);

    for (let j = 0; j < articles.length; j += 1) {
      let article = $(articles[j]);
      let articleText = article.text();

      for (let k = 0; k < tokens.length; k += 1) {
        let token = tokens[k];
        if (articleText.indexOf(token) !== -1) {
          article.hide();

          if (selector !== '#news-feed .contentCollection') {
            article.addClass('big-baller-blocker');
          }
        }
      }
    }
  }

  count = $('.big-baller-blocker').length;
}

$(document).ready(filter);

// filter async-received content
$('#news-feed').bind('DOMSubtreeModified', () => {
  filter();
});

// send count to popup.html
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.task === 'getNumArticles') {
    sendResponse({ numArticles: count });
  }
});