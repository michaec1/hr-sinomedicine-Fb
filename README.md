# HR Helper

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

這是一個以 Vite + React + TypeScript 建立的專案。

## 🚀 執行與開發

**系統需求:** Node.js 18+

1. 安裝對應套件：
   ```bash
   npm install
   ```
2. 設定環境變數：
   將 `.env.example` 複製為 `.env.local` 並填入 `GEMINI_API_KEY` 等敏感資訊：
   ```bash
   cp .env.example .env.local
   ```
3. 啟動確定是否可以運行：
   ```bash
   npm run dev
   ```

## 📦 部署到 GitHub Pages

專案已經設定好 GitHub Action，當推送程式碼到 `main` 分支時，會自動編譯並部署到 GitHub Pages 讓你能直接上線。

**前置作業:**
請到 GitHub 倉庫的 `Settings` -> `Pages` 中，將 `Source` 設定為 `GitHub Actions`。

## 🛡 版本控制

`.gitignore` 已經配置好避免上傳不必要的資料夾與隱私檔：
- `node_modules/` 工具套件
- `dist/` 建置出來的檔案
- `.env*` 環境變數（保護隱私資訊）
- `.DS_Store`, `.vscode/` 等系統與編輯器暫存檔
