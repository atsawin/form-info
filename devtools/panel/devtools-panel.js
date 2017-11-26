/**
When the user clicks the 'message' button,
send a message to the background script.
*/
function refresh() {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId
  }).then((response) => {
    var ret = '<table class="form-info"><thead><tr><th>Label</th><th>Name</th><th>Type</th><th>Checked</th><th>Value</th></tr></thead><tbody>';
    response.forEach(function(form) {
      ret += '<tr class="form"><td colspan="5">' + form.method + ': ' + form.action + '</td></tr>';
      form.input.forEach(function(item) {
        ret += '<tr><td>' + item.label + '</td><td>' + item.name + '</td><td>' + item.type + '</td><td>' + (item.checked ? 'Yes' : '') + '</td><td>' + item.value + '</td></tr>';
      });
    });
    ret += '</tbody></table>';
    document.getElementById("result").innerHTML = ret;
  });
}

document.getElementById("button_message").addEventListener("click", refresh);
browser.devtools.network.onNavigated.addListener(refresh);
