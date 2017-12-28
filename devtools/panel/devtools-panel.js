var resizeTimeout;

function refresh() {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId
  }).then((response) => {
    var formRow = document.querySelector('#form-row').content;
    var inputRow = document.querySelector('#input-row').content;
    var tbody = document.querySelector('#table-body tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    response.forEach(function(form) {
      var td = formRow.querySelectorAll('td');
      td[0].textContent = 'Name: ' + form.name + ', Method: ' + form.method + ', URL: ' + form.action;
      tbody.appendChild(document.importNode(formRow, true));
      form.input.forEach(function(item) {
        var td = inputRow.querySelectorAll('td');
        td[0].textContent = item.label;
        td[1].textContent = item.name;
        td[2].textContent = item.type;
        td[3].textContent = item.checked ? 'Yes' : ' ';
        td[4].textContent = item.value;
        tbody.appendChild(document.importNode(inputRow, true));
      });
    });
  });
  firstAdjustHeadWidth();
}

function firstAdjustHeadWidth() {
  setTimeout(function() {
    if (!adjustHeadWidth()) {
      firstAdjustHeadWidth();
    }
  }, 10);
}

function adjustHeadWidth() {
  var headTr = document.querySelector('#table-head');
  var bodyTr = document.querySelector('.input');
  if (bodyTr) {
    for (cnt2 = 0; cnt2 < bodyTr.childNodes.length; cnt2++) {
      headTr.childNodes[cnt2].style.width = (bodyTr.childNodes[cnt2].clientWidth - 9) + 'px';
    }
    return true;
  }
  return false;
}

function resizeThrottler() {
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(function() {
      resizeTimeout = null;
      adjustHeadWidth();
    }, 66);
  }
}

document.getElementById('button_message').addEventListener('click', refresh);
browser.devtools.network.onNavigated.addListener(refresh);
window.addEventListener("resize", resizeThrottler, false);
