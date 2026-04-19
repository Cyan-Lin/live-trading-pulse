# Frontend Domain Conventions

本文件補充前端以領域導向垂直切片組織檔案的規則，目的在於避免功能成長後退化成全域 components、hooks、utils 的無邊界結構。

## Directory Responsibilities

- src/app/: application shell、providers、routing、最上層跨領域組裝。
- src/domains/dashboard/: dashboard 頁面組裝與 domain card 呈現。
- src/domains/market/: REST / stream 接入、市場模型、mapping 與 selector。
- src/domains/watchlist/: 新增、移除、搜尋、持久化與 watchlist state。
- src/domains/charting/: chart adapter、indicator 計算、timeframe 與圖表互動。
- src/domains/connection-health/: 連線狀態、延遲採樣、reconnect 呈現與相關協調。
- src/shared/: 無特定業務語意、可被多個 domain 重用的 UI、基礎函式與型別。

## Public API Rule

每個 domain 對外必須透過自己的 index.ts 暴露能力。其他 domain 與 app layer 只能依賴這個 public API，不應跨過根入口深層引用內部檔案。

允許：

```ts
import { DashboardWorkspace } from '@domains/dashboard'
import { MarketDomainCard } from '@domains/market'
```

避免：

```ts
import { DashboardWorkspace } from '@domains/dashboard/components/DashboardWorkspace'
import { MarketDomainCard } from '@domains/market/components/MarketDomainCard'
```

## Placement Rules

- 帶有明確交易語意的 schema、types、hooks、store、service、utils，放在對應 domain 下。
- 只有跨 domain 共享且不帶業務語意的程式碼，才放入 shared。
- 如果某個 shared 模組逐漸長出市場或圖表等語意，應將它移回對應 domain。
- dashboard 是組裝 domain，不應回頭吸收 market、watchlist、charting、connection-health 的內部邏輯。

## Recommended Workflow

1. 先判斷需求屬於哪個 domain。
2. 在該 domain 內新增 types、store、components 或 infrastructure adapter。
3. 需要跨 domain 暴露時，只從 index.ts 匯出最小必要 API。
4. 只有確認多個 domain 真的會重用且不帶業務語意時，才提升到 shared。