var ret = [];
document.querySelectorAll('form').forEach(function(form, formidx) {
  var formInfo = {
    formidx: formidx,
    name: form.name,
    action: form.action,
    method: form.method,
    input: []
  };
  form.querySelectorAll('input, select, textarea').forEach(function(item, itemidx) {
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
        itemidx: itemidx,
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
