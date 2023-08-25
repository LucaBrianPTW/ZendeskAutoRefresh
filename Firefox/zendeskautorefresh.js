// This is the function that clicks the refresh button on the zendesk page, it uses the "data-test-id" and checks if the value is "views_views-list_header-refresh" to
// make sure the button clicked is the refresh button.
// If the add-on breaks in the future this is most likely the part of the code to fix to make it work again.
function clickRefreshButton() {
    console.log("click refresh button");
    const refreshButton = document.querySelector('[data-test-id="views_views-list_header-refresh"]');
    if (refreshButton) {
      refreshButton.click();
    }
  }

// This listener sets the refresh interval to the value set in the pop-up from the user
browser.runtime.onMessage.addListener(function (message) {
  if (message.action === "setRefreshInterval") {
    const interval = parseInt(message.interval) * 1000; // Convert to milliseconds
    if(refreshIntervalId !== null){
      clearInterval(refreshIntervalId);
    }
    refreshIntervalId = setInterval(clickRefreshButton, interval);
  }
});


let refreshIntervalId= null;

// Fetch the stored refresh interval value from storage
browser.storage.local.get("refreshInterval", function (result) {
  const refreshInterval = result.refreshInterval || 10; // Default value of 10 seconds
  refreshIntervalId = setInterval(clickRefreshButton, refreshInterval * 1000);
});
