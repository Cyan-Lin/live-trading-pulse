# Live Trading Pulse Design Document

## 1. 文件目的

本文件定義 Live Trading Pulse 的系統設計、技術選型、模組邊界、資料流、測試與部署方案，作為後續實作與驗收的依據。

## 2. 設計目標

- 穩定處理高頻率即時行情更新。
- 讓圖表與指標計算具備足夠效能與可維護性。
- 將資料流、畫面狀態與領域邏輯清楚分層。
- 提供可測試、可部署、可擴充的專案架構。

## 3. 建議技術選型

### 3.1 Frontend

- React 18 + TypeScript
- Vite 作為建置工具
- RxJS 作為優先建議方案，處理 WebSocket stream、緩衝、共享訂閱與重連流程；若採替代方案，仍需滿足相同能力與可測試性
- Zustand 或 Redux Toolkit 作為 UI 與 domain state 管理
- TradingView Lightweight Charts 作為 K 線圖主體
- React Hook Form + Zod 作為輸入驗證
- React Error Boundary 實作全域錯誤邊界
- Sonner 或 React Hot Toast 顯示 user-friendly 訊息
- Vitest + Testing Library 作為前端測試框架

### 3.2 Backend / BFF

- Node.js + TypeScript
- Fastify 或 Express 建立輕量 API 與 WebSocket relay service
- 原生 WebSocket 或 ws 套件處理交易所串流代理

### 3.3 為什麼建議加入 BFF

- 避免前端直接耦合交易所 API 格式。
- 集中處理 reconnect、symbol mapping、資料正規化與節流策略。
- 後續若加入 watchlist 雲端同步、快取、觀測性與風控規則時可延伸。
- 可將環境變數與未來敏感設定留在 server 端管理。

## 4. 系統架構

### 4.1 高層架構

1. 前端應用載入 watchlist 與預設 timeframes。
2. 前端向 BFF 請求初始 K 線資料與支援交易對清單。
3. BFF 連接交易所 REST API 取得 bootstrap 資料。
4. BFF 連接交易所 WebSocket stream，接收 ticker 與 kline 更新。
5. BFF 將資料正規化後推送至前端 WebSocket。
6. 前端以 RxJS 或等效 event-stream abstraction 進行 buffering、throttling、shared subscription 與 reconnect state 管理。
7. Store 更新後，watchlist、價格區塊、圖表與連線狀態元件同步刷新。

### 4.2 邏輯分層

- Presentation Layer: 頁面、元件、互動狀態。
- Application Layer: use cases、actions、stream orchestration。
- Domain Layer: kline model、indicator 計算、連線狀態模型。
- Infrastructure Layer: exchange API client、WebSocket client、storage adapter。

### 4.3 前端檔案組織原則

- 前端以領域導向的垂直切片方式組織檔案，不以全域 components、hooks、utils 資料夾作為預設主結構。
- 與某個業務領域強耦合的元件、hooks、型別、schema、store、service、utils，應放在該領域資料夾下。
- 只有跨領域重用且不承載特定業務語意的模組，才放入 shared。
- app 僅負責 application shell、router、providers 與跨頁組裝，不承載領域細節。
- 領域之間應透過明確的 public API 或 index barrel 暴露能力，避免任意深層互相引用。

## 5. 目錄結構建議

```text
live-trading-pulse/
  frontend/
    src/
      app/
      shared/
        ui/
        lib/
        types/
      domains/
        dashboard/
          components/
          hooks/
          store/
          utils/
          types/
        market/
          api/
          streams/
          models/
          mappers/
          types/
        watchlist/
          components/
          hooks/
          store/
          storage/
          utils/
          types/
        charting/
          components/
          adapters/
          indicators/
          hooks/
          utils/
          types/
        connection-health/
          components/
          store/
          services/
          utils/
          types/
      test/
  backend/
    src/
      modules/
        exchange/
        market-stream/
        health/
      lib/
      types/
  docs/
    requirements.md
    design.md
```

補充原則:

- dashboard 為頁面組裝領域，負責串接 market、watchlist、charting、connection-health。
- market、watchlist、charting、connection-health 各自維護自己的元件與邏輯，不把檔案拆散到全域資料夾。
- shared 僅放無明確業務語意的通用 UI、基礎函式與共用型別。
- 若某模組開始承載明確業務語意，應從 shared 移回對應 domain。

## 6. 核心模組設計

### 6.1 Market Stream 模組

責任:

- 管理 WebSocket 連線生命週期。
- 訂閱多個交易對的 ticker 與 kline stream。
- 將原始事件轉換成統一的 domain event。
- 執行 bufferTime、auditTime 或 sampleTime 避免過度 re-render。

關鍵設計:

- 以 symbol 為 key 維護最新市場快照。
- 對價格卡片類 UI 使用較高頻率更新。
- 對圖表類 UI 使用較低頻率批次更新，避免拖慢主執行緒。
- stream 模組對 React 元件僅暴露簡單訂閱或 store update 介面，避免元件直接耦合 operator 細節。
- 連線健康應優先依賴 BFF heartbeat；若改採訊息間隔推估，需避免把低活躍市場誤判為斷線。

建議事件模型:

- PriceTickEvent
- KlineUpdateEvent
- ConnectionStatusEvent
- LatencySampleEvent

### 6.2 Charts 模組

責任:

- 顯示 candlestick chart。
- 顯示 MA 線。
- 顯示 KD 指標於副圖區塊。
- 支援 timeframe 切換、縮放與平移。

關鍵設計:

- 初次載入先抓取歷史 klines，再銜接即時 kline 更新。
- 歷史與即時資料以 symbol + interval + candle open time 合併；同 open time 的未收盤資料覆寫最後一根，跨 open time 才 append。
- MA 使用純函式計算，輸出序列供圖表覆寫。
- KD 使用 rolling window 計算 RSV、K、D 值。
- 圖表主圖與 KD 副圖以相同 time scale 同步捲動。
- 圖表更新需透過 chart adapter 使用 series update 或 append imperative API，不以 React state 全量重建 series。
- 指標計算應在 domain 或 stream 層完成，不在 React render 期間執行完整序列重算。

### 6.3 Watchlist 模組

責任:

- 新增、移除、排序交易對。
- 搜尋與過濾交易對。
- 持久化本地 watchlist。

關鍵設計:

- 第一階段使用 LocalStorage adapter。
- storage schema versioning 預留升級能力。
- 所有新增 symbol 需先經過白名單或格式驗證。

### 6.4 Connection Health 模組

責任:

- 顯示 connected、disconnected、reconnecting 狀態。
- 顯示當前延遲與最近 reconnect 次數。
- 對長時間異常提供醒目提示。

延遲量測方式:

- 若 server 提供 heartbeat，則採 ping/pong round trip。
- 若無 heartbeat，則以最後一筆訊息接收時間與預期心跳間隔推估健康狀態。

## 7. 資料模型設計

### 7.1 Trading Pair

```ts
type TradingPair = {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  displayName: string;
};
```

### 7.2 Price Tick

```ts
type PriceTick = {
  symbol: string;
  price: number;
  change24h?: number;
  direction: "up" | "down" | "flat";
  eventTime: number;
};
```

### 7.3 Candle

```ts
type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isClosed: boolean;
};
```

### 7.4 Connection Health

```ts
type ConnectionHealth = {
  status: "connected" | "disconnected" | "reconnecting";
  latencyMs: number | null;
  reconnectAttempts: number;
  lastMessageAt: number | null;
};
```

### 7.5 K 線時間與更新慣例

- Candle.time 一律使用 UTC epoch milliseconds。
- chart adapter 依圖表庫需求負責時間格式轉換。
- REST 與 WebSocket 重疊資料以 symbol + interval + time 去重。
- isClosed = false 表示暫時 K 線，應覆寫最後一根並觸發局部指標重算。
- isClosed = true 表示該根可視為 finalized，下一個新 open time 才建立新 candle。

## 8. 指標計算設計

### 8.1 MA

- 支援至少 MA5、MA10、MA20。
- 以收盤價序列計算簡單移動平均。
- 當資料不足時回傳 null，避免圖表誤畫。
- 當資料量變大時，可採 rolling sum 避免每次全量重算。

公式:

$$
MA_n = \frac{\sum_{i=1}^{n} Close_i}{n}
$$

### 8.2 KD

- 先計算 RSV，再根據平滑公式產生 K 與 D。
- 預設週期可採 9。

公式:

$$
RSV = \frac{Close - LowestLow_n}{HighestHigh_n - LowestLow_n} \times 100
$$

$$
K_t = \frac{2}{3} K_{t-1} + \frac{1}{3} RSV_t
$$

$$
D_t = \frac{2}{3} D_{t-1} + \frac{1}{3} K_t
$$

設計原則:

- 指標函式保持純函式化，便於單元測試。
- 指標計算與圖表渲染解耦，避免 UI 元件承擔財務邏輯。
- 第一版可接受以最後一段 window 進行局部重算；若後續監控交易對與指標數量擴大，再評估 Web Worker。

## 9. RxJS Stream 設計

以下以 RxJS 為預設設計；若採較輕量替代方案，仍需提供等效的 backoff、shared subscription、batch update、teardown 與測試能力。

### 9.1 前端資料流

1. WebSocket source stream 接收市場事件。
2. parser 將資料轉換為內部型別。
3. stream operators 進行 retry、buffer、sample、shareReplay。
4. store updater 將資料分派到各 feature store。
5. selectors 驅動畫面更新。

### 9.2 建議 operator 策略

- reconnect: retry 或 retryWhen + exponential backoff。
- UI 降頻: bufferTime(100~250ms) 後批次更新。
- 圖表更新: sampleTime(250~500ms) 視資料頻率調整。
- 共用訂閱: shareReplay(1) 避免重複建立 stream。

### 9.3 重連策略

- 初次斷線後立即顯示 reconnecting。
- 採指數退避，例如 1s、2s、5s、10s，上限 30s。
- 重連成功後重置退避計數與健康狀態。

## 10. API 與介面設計

### 10.1 REST API

- GET /api/pairs
  - 回傳支援交易對清單。
- GET /api/klines?symbol=BTCUSDT&interval=1m&limit=500
  - 回傳歷史 K 線資料。

### 10.2 WebSocket Events

- market.price
- market.kline
- system.health
- system.error

### 10.3 錯誤回應原則

- 回傳可機器處理的 code 與可顯示給使用者的 message。
- 前端 toast 僅顯示摘要，詳細內容寫入 console 或 telemetry。

## 11. UI/UX 設計原則

- 版面分為 watchlist、主圖表區、連線健康資訊列。
- 價格上漲使用暖色系，價格下跌使用冷色或綠色，需維持一致性。
- 閃爍效果應短暫且不干擾閱讀。
- 行動版需將 watchlist 折疊，主圖優先顯示。
- 對於連線異常與資料延遲需有清楚視覺提示。

## 12. 錯誤處理與安全設計

### 12.1 錯誤處理

- 全域 Error Boundary 捕捉渲染錯誤。
- API 與 WebSocket 錯誤統一轉換為 application error model。
- 對暫時性失敗採可恢復策略，對不可恢復錯誤顯示 fallback UI。

### 12.2 安全性

- .env 管理 API base URL、WS base URL 與 feature flags。
- .env.example 僅提供占位值。
- 所有搜尋輸入與使用者輸入先 trim、限制長度、驗證格式。
- 不在前端硬編碼任何未來可能敏感的 endpoint 或 token。

## 13. 測試策略

### 13.1 Unit Tests

- MA 與 KD 計算函式。
- WebSocket event parser。
- RxJS reconnect、buffer、throttle 邏輯。
- watchlist storage adapter。

### 13.2 Component Tests

- 價格變動卡片的漲跌樣式切換。
- timeframe 切換後圖表查詢與渲染。
- connection health badge 顯示狀態。

### 13.3 Integration Tests

- 初始載入歷史 K 線後接上即時更新。
- 斷線後自動重連並恢復資料流。
- watchlist 在重新整理後仍正確還原。

### 13.4 Coverage 目標

- indicators、streams、parsers 等核心邏輯 80% 以上。

## 14. 效能策略

- 對高頻 stream 使用批次更新，避免每筆 tick 都觸發 re-render。
- 使用 selector-based state access，避免整棵樹重繪。
- 圖表資料以 append / update 方式增量更新，而非每次重建完整 series。
- 搜尋與過濾採防抖處理。
- 部署前以 Lighthouse 與瀏覽器 Performance trace 驗證瓶頸。

## 15. 部署方案

- Frontend: Vercel 或 Netlify。
- Backend/BFF: Railway、Render 或 Fly.io。
- 若第一版為純前端展示，可先以公開 API 直接串接，但正式版仍建議保留 BFF。

環境變數範例:

- VITE_API_BASE_URL
- VITE_WS_BASE_URL
- VITE_DEFAULT_SYMBOL
- VITE_DEFAULT_INTERVAL

## 16. Git 與交付規範

- 採 Conventional Commits，例如 feat、fix、refactor、test、docs。
- 每個功能需求以獨立 branch 開發，例如 feature/market-stream。
- Pull Request 需附上驗收對照、測試證據與必要畫面截圖。

## 17. 實作里程碑建議

1. 初始化前後端專案與部署骨架。
2. 完成 market stream 與 connection health。
3. 完成 watchlist 與 local persistence。
4. 完成 chart、MA、KD 與 timeframe 切換。
5. 補齊錯誤邊界、toast、測試與文件。
6. 驗證 Lighthouse、部署 production 環境並產出 URL。
