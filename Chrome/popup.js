  // Fetch the stored refresh interval value from storage
  chrome.storage.local.get("refreshInterval", function (result) {
    const refreshInterval = result.refreshInterval || 10; // Default value of 10 seconds
    document.getElementById("refreshIntervalInput").value = refreshInterval;
  });
  
  // Handle form submission
  document.getElementById("optionsForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const refreshInterval = document.getElementById("refreshIntervalInput").value;
    chrome.storage.local.set({ refreshInterval: refreshInterval }); // Store the new interval value
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "setRefreshInterval", interval: refreshInterval });
      window.close();
    });
  });
  