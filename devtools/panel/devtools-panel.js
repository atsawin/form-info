/**
When the user clicks the 'message' button,
send a message to the background script.
*/
function refresh() {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId
  }).then((response) => {
    var tableElm = document.createElement('table');
    tableElm.className = 'form-info';
    var tableHeadElm = document.createElement('thead');
    var tableBodyElm = document.createElement('tbody');
    var tableRowElm = document.createElement('tr');
    var tableCell = document.createElement('th');
    tableCell.textContent = 'Label';
    tableRowElm.appendChild(tableCell);
    tableCell = document.createElement('th');
    tableCell.textContent = 'Name';
    tableRowElm.appendChild(tableCell);
    tableCell = document.createElement('th');
    tableCell.textContent = 'Type';
    tableRowElm.appendChild(tableCell);
    tableCell = document.createElement('th');
    tableCell.textContent = 'Checked';
    tableRowElm.appendChild(tableCell);
    tableCell = document.createElement('th');
    tableCell.textContent = 'Value';
    tableRowElm.appendChild(tableCell);
    tableHeadElm.appendChild(tableRowElm);
    tableElm.appendChild(tableHeadElm);
    response.forEach(function(form) {
      tableRowElm = document.createElement('tr');
      tableRowElm.className = 'form';
      tableCell = document.createElement('td');
      tableCell.setAttribute('colspan', '5');
      tableCell.textContent = 'Name: ' + form.name + ', Method: ' + form.method + ', URL: ' + form.action;
      tableRowElm.appendChild(tableCell);
      tableBodyElm.appendChild(tableRowElm);
      form.input.forEach(function(item) {
        tableRowElm = document.createElement('tr');
        tableCell = document.createElement('td');
        tableCell.textContent = item.label;
        tableRowElm.appendChild(tableCell);
        tableCell = document.createElement('td');
        tableCell.textContent = item.name;
        tableRowElm.appendChild(tableCell);
        tableCell = document.createElement('td');
        tableCell.textContent = item.type;
        tableRowElm.appendChild(tableCell);
        tableCell = document.createElement('td');
        tableCell.textContent = item.checked ? 'Yes' : '';
        tableRowElm.appendChild(tableCell);
        tableCell = document.createElement('td');
        tableCell.textContent = item.value;
        tableRowElm.appendChild(tableCell);
        tableBodyElm.appendChild(tableRowElm);
      });
    });
    tableElm.appendChild(tableBodyElm);
    var resultElm = document.getElementById('result');
    while (resultElm.firstChild) {
      resultElm.removeChild(resultElm.firstChild);
    }
    resultElm.appendChild(tableElm);
  });
}

document.getElementById('button_message').addEventListener('click', refresh);
browser.devtools.network.onNavigated.addListener(refresh);
