/**
This script is run whenever the devtools are open.
In here, we can create our panel.
*/

function handleShown(e) {
  e.refresh();
}

function handleHidden(e) {
}

/**
Create a panel, and add listeners for panel show/hide events.
*/
browser.devtools.panels.create(
  "Form Info",
  "/icons/form48.png",
  "/devtools/panel/panel.html"
).then((newPanel) => {
  newPanel.onShown.addListener(handleShown);
  newPanel.onHidden.addListener(handleHidden);
});
