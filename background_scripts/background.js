/**
When we receive the message, execute the given script in the given
tab.
*/
function handleMessage(request, sender, sendResponse) {

  if (sender.url != browser.runtime.getURL("/devtools/panel/panel.html")) {
    return;
  }
  browser.tabs.executeScript(
    request.tabId,
    {
      file: "/content_scripts/form-info.js"
    })
    .then((results) => {
      sendResponse(results[0]);
    });
  return true;
}

/**
Listen for messages from our devtools panel.
*/
browser.runtime.onMessage.addListener(handleMessage);
