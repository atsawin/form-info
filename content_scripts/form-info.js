var ret = [];
document.querySelectorAll('form').forEach(function(form) {
  var formInfo = {
    name: form.name,
    action: form.action,
    method: form.method,
    input: []
  };
  form.querySelectorAll('input, select, textarea').forEach(function(item) {
    if (item.name) {
      var label = '';
      if (item.id) {
        var labeldom = form.querySelector('label[for="' + item.id + '"]');
        if (labeldom) {
          label = labeldom.innerText;
        } else {
          labeldom = closest(item, function(el) {
            return el.nodeName == 'LABEL';
          });
          if (labeldom) {
            label = labeldom.innerText;
          }
        }
      }
      formInfo.input.push({
        name: item.name,
        label: label,
        type: item.type,
        checked: item.checked,
        disabled: item.disabled,
        value: item.value
      });
    }
  });
  ret.push(formInfo);
});
ret;

function closest (el, predicate) {
  do {
    if (predicate(el)) {
      return el;
    }
  } while (el = el && el.parentNode);
}