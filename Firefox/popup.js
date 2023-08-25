  // Fetch the stored refresh interval value from storage
  browser.storage.local.get("refreshInterval", function (result) {
    const refreshInterval = result.refreshInterval || 10; // Default value of 10 seconds
    document.getElementById("refreshIntervalInput").value = refreshInterval;
  });
  
  // Handle form submission
  document.getElementById("optionsForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const refreshInterval = document.getElementById("refreshIntervalInput").value;
    browser.storage.local.set({ refreshInterval: refreshInterval }); // Store the new interval value
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      browser.tabs.sendMessage(tabs[0].id, { action: "setRefreshInterval", interval: refreshInterval });
      window.close();
    });
  });
  