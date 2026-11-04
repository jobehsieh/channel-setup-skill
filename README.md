# channel-setup — 跨平台頻道開台設定技能

一個給 AI Agent（Claude Code / OpenCode 等支援 Skill 的環境）使用的技能，把「從零開一個 YouTube＋Instagram＋TikTok 頻道」變成人人可重複執行的流程。

內容不是理論，是一次實際開台（含 2026 年各平台現況）踩完坑後整理出來的：

- 帳號與信箱策略（**不要用 `+` 標籤信箱**，TikTok 會直接擋）
- 品牌視覺素材規格（Banner／頭像／浮水印／縮圖）
- 三平台逐項設定清單與可複製文案
- 跨平台一致性檢查表（名稱／handle／頭像／簡介／連結）
- 瀏覽器自動化（Chrome DevTools Protocol）處理檔案上傳、自訂下拉、React 輸入框
- 10 個實際踩過的坑：TikTok web 註冊被導去 App、使用者名稱 30 天冷卻、暱稱 7 天冷卻、商業帳號要驗證、YouTube 多頻道切換、IG 隱藏 file input……

## 檔案結構

```
channel-setup/
├── SKILL.md                          # 主流程（技能進入點）
├── references/
│   └── platform-checklists.md        # 各平台逐項清單與文案範本
└── scripts/
    ├── cdp.js                        # 連上除錯埠 Chrome 的 helper
    └── verify-profile.js             # 用觀眾視角驗證公開頁面
```

## 安裝

把整個資料夾放到你的 Agent 技能目錄，資料夾名稱建議用 `channel-setup`：

```bash
# OpenCode（全域）
cp -r channel-setup ~/.config/opencode/skills/

# Claude Code（專案內）
cp -r channel-setup .claude/skills/
```

Windows PowerShell：

```powershell
Copy-Item .\channel-setup "$env:USERPROFILE\.config\opencode\skills\" -Recurse
```

安裝後對 Agent 說「幫我開一個新頻道」「IG／TikTok 帳號怎麼設」「三個平台對一下資料」，技能就會被觸發。

## 使用腳本（選用）

```bash
npm i playwright-core
node scripts/verify-profile.js https://www.tiktok.com/@yourhandle
```

需要先以除錯埠啟動 Chrome（詳見 `SKILL.md` 第六節）：

```powershell
mklink /J $env:TEMP\cud "$env:LOCALAPPDATA\Google\Chrome\User Data"
chrome.exe --user-data-dir="$env:TEMP\cud" --profile-directory="Default" --remote-debugging-port=9222
```

## 注意

- 技能內的原則適用於任何品牌；範例文案取自「時空擂台」專案，使用時請替換成你的品牌資訊
- 平台規則會變（冷卻天數、驗證要求），遇到不一致時以平台當下畫面為準，並回頭更新本技能

## 授權

MIT
