// 連上以 --remote-debugging-port=9222 啟動的 Chrome
// 前置：
//   mklink /J %TEMP%\cud "%LOCALAPPDATA%\Google\Chrome\User Data"
//   chrome.exe --user-data-dir="%TEMP%\cud" --profile-directory="<Profile>" \
//              --remote-debugging-port=9222 --remote-allow-origins=*
// 安裝：npm i playwright-core
const { chromium } = require('playwright-core');

async function connect(port = 9222) {
  const browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
  const ctx = browser.contexts()[0];
  return { browser, ctx };
}

module.exports = { connect };
