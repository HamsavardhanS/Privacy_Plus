document.addEventListener('DOMContentLoaded', () => {
  const analyzeBtn = document.getElementById('analyzeSite');
  const resultDiv = document.getElementById('result');
  const clearCookiesBtn = document.getElementById('clearCookies');
  const ghostModeBtn = document.getElementById('ghostMode');

  // Analyze current tab for privacy
  analyzeBtn.addEventListener('click', async () => {
    resultDiv.textContent = 'Analyzing...';
    
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const url = tabs[0].url;

      try {
        const response = await fetch(`http://localhost:8080/api/analyzer/analyze?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const { score, suggestions } = data;

        resultDiv.innerHTML = `
          <p><strong>Privacy Score:</strong> ${score}</p>
          <p><strong>Suggestions:</strong></p>
          <ul>${suggestions.map(s => `<li>${s}</li>`).join('')}</ul>`;
      } catch (error) {
        console.error('Error analyzing:', error);
        resultDiv.textContent = 'Error analyzing site. Make sure backend is running.';
      }
    });
  });

  // 🧹 Clear cookies, cache, and localStorage
  clearCookiesBtn.addEventListener("click", () => {
    chrome.browsingData.remove({
      since: 0
    }, {
      cookies: true,
      cache: true,
      localStorage: true
    }, () => {
      alert("Cookies and cache cleared!");
    });
  });

  // 👻 Ghost Mode (inject script)
  ghostModeBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["scripts/ghostmode.js"]
      });
    });
  });
});
