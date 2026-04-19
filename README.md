# Live Trading Pulse

Live Trading Pulse 是一個即時金融交易數據監控平台的 workspace，目前包含 React + Vite 前端與 Fastify + TypeScript BFF 骨架。M1 目前的重點是把專案骨架、環境變數約定、文件入口與前端領域導向結構先固定下來，讓後續市場串流、watchlist、圖表與連線健康功能有清楚邊界可依附。

## Workspace Apps

- frontend/: React 19 + TypeScript + Vite，負責 dashboard shell 與前端領域切片。
- backend/: Fastify + TypeScript，負責 health route 與後續 BFF / WebSocket relay 基礎。
- docs/: workspace 慣例、前端領域導向結構與開發補充說明。

## Prerequisites

- Node.js 20.19+ 或 22 LTS。
- npm 10+。

## Quick Start

1. 安裝前端依賴。

```bash
cd frontend
npm install
copy .env.example .env.local
```

2. 安裝後端依賴。

```bash
cd backend
npm install
copy .env.example .env
```

3. 啟動 backend。

```bash
cd backend
npm run dev
```

4. 啟動 frontend。

```bash
cd frontend
npm run dev
```

5. 驗證基礎腳本。

```bash
cd frontend
npm run build
npm run test
```

```bash
cd backend
npm run build
npm run test
```

## Environment Variables

Frontend 透過 .env.local 讀取下列設定，範本位於 frontend/.env.example：

- VITE_API_BASE_URL: 前端呼叫 BFF REST API 的 base URL，占位值為 http://localhost:3000/api。
- VITE_WS_BASE_URL: 前端連接 BFF WebSocket relay 的 base URL，占位值為 ws://localhost:3000/ws。
- VITE_DEFAULT_SYMBOL: 預設主要交易對，占位值為 BTCUSDT。
- VITE_DEFAULT_INTERVAL: 預設 K 線時間維度，占位值為 1m。

Backend 透過 .env 讀取下列設定，範本位於 backend/.env.example：

- HOST、PORT: 本機啟動位址與埠號。
- EXCHANGE_REST_BASE_URL: 上游公開 REST 市場資料來源，占位值為 https://api.binance.com。
- EXCHANGE_WS_BASE_URL: 上游公開 WebSocket 市場資料來源，占位值為 wss://stream.binance.com:9443/ws。
- DEFAULT_SYMBOL、DEFAULT_INTERVAL: BFF 預設示範用交易對與時間維度。

請勿提交實際 .env、.env.local 或其他含敏感設定的檔案。

## Data Source Assumptions

- 第一階段以公開市場資料來源為主，預設假設為 Binance 公開 API。
- watchlist 第一階段以前端本地持久化為優先，後續若需要多端同步，再向 backend 擴充 API 與儲存層。
- 前端目前預設透過 BFF 邊界存取 API 與 WebSocket，不直接耦合交易所 payload。

## Frontend Domain-Oriented Rules

- app/ 只負責 application shell、providers、routing 與跨領域組裝。
- domains/ 是主要開發位置；帶有市場、圖表、watchlist、connection-health 等業務語意的程式碼應留在各自 domain。
- shared/ 只放跨領域共用、且不承載特定業務語意的 UI、lib 與 types。
- 其他 layer 應透過各 domain 的 index.ts public API 匯入，不直接深層引用內部檔案。

更完整的規範請見 docs/README.md 與 docs/frontend-domain-conventions.md。

## Source Documents

- requirements.md: 功能、非功能與驗收標準來源。
- design.md: 架構、模組邊界與技術選型來源。
- task.md: 里程碑、PBI 與任務勾選狀態。
