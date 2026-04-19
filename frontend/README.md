# Frontend Workspace

Live Trading Pulse frontend 採用 React + TypeScript + Vite，並以領域導向的垂直切片結構作為預設組織方式。

## Environment Setup

先以 frontend/.env.example 建立本機設定檔：

```bash
copy .env.example .env.local
```

目前前端保留以下環境變數契約：

- VITE_API_BASE_URL: BFF REST API base URL，占位值為 http://localhost:3000/api。
- VITE_WS_BASE_URL: BFF WebSocket relay base URL，占位值為 ws://localhost:3000/ws。
- VITE_DEFAULT_SYMBOL: 預設主要交易對，占位值為 BTCUSDT。
- VITE_DEFAULT_INTERVAL: 預設 K 線時間維度，占位值為 1m。

## Scripts

- `npm run dev`: 啟動開發伺服器。
- `npm run build`: 先 lint，再做 TypeScript build 與 Vite build。
- `npm run test`: 執行 Vitest。
- `npm run test:coverage`: 產生測試覆蓋率報告。

## Architecture Conventions

- `src/app/` 只負責 application shell、providers、routing 與跨領域組裝，不承載市場、圖表、自選清單或連線健康等領域細節。
- `src/domains/` 是主要開發重心。每個 domain 維護自己的 components、hooks、store、types、utils 與基礎服務。
- `src/shared/` 只放跨領域重用、且不帶業務語意的 UI、基礎函式與共用型別。
- 不以 `src/components`、`src/hooks`、`src/utils` 這類全域資料夾作為預設收納點。若程式碼帶有明確業務語意，應留在對應 domain。
- dashboard domain 是頁面組裝層，不應回頭吸收 market、watchlist、charting、connection-health 的內部資料處理邏輯。

## Public API Rule

每個 domain 必須透過自己的 `index.ts` 對外暴露功能。其他 layer 只能匯入 domain root，不應深層引用內部實作。

```ts
import { DashboardWorkspace } from '@domains/dashboard';
import { MarketDomainCard } from '@domains/market';
```

以下做法視為違規，並由 ESLint 規則阻擋：

```ts
import { DashboardWorkspace } from '@domains/dashboard/components/DashboardWorkspace';
```

## Domain Layout

目前各 domain 預設骨架如下：

- `dashboard/`: components、hooks、store、types、utils。
- `market/`: api、streams、models、mappers、types。
- `watchlist/`: components、hooks、store、storage、types、utils。
- `charting/`: components、adapters、indicators、hooks、types、utils。
- `connection-health/`: components、store、services、types、utils。

dashboard 是頁面組裝 domain，負責串接 market、watchlist、charting、connection-health。app layer 只透過 dashboard 的 public API 完成最上層組裝。

更完整的 workspace 與前端結構規範可參考 docs/README.md 與 docs/frontend-domain-conventions.md。
