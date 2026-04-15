# Frontend Workspace

Live Trading Pulse frontend 採用 React + TypeScript + Vite，並以領域導向的垂直切片結構作為預設組織方式。

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
