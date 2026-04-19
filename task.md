# Live Trading Pulse Task List

## 1. 任務目標

將需求文件與設計文件拆解為可執行的開發任務，涵蓋前端、BFF、測試、部署與文件化，並保留明確的驗收依據。

## 2. 執行原則

- 以可部署、可驗收、可展示為優先。
- 先建立骨架與資料流，再完成圖表與指標。
- 核心邏輯需可測試，避免將財務計算與 UI 緊耦合。
- 每個階段完成後皆需保留可驗證成果。
- PBI 為可展示、可驗收的工作單位；每個 task 僅處理一個明確動作。

## 3. 里程碑、PBI 與任務清單

### M1. 專案初始化與基礎骨架

#### PBI M1-1 Frontend workspace bootstrap

- [x] 初始化 Vite React TypeScript 專案。
- [x] 建立 frontend/src/app 入口結構。
- [x] 建立 frontend/src/shared 目錄。
- [x] 建立 frontend/src/domains 目錄。
- [x] 建立 frontend/src/domains/dashboard 目錄。
- [x] 建立 frontend/src/domains/market 目錄。
- [x] 建立 frontend/src/domains/watchlist 目錄。
- [x] 建立 frontend/src/domains/charting 目錄。
- [x] 建立 frontend/src/domains/connection-health 目錄。
- [x] 建立 frontend/src/test 目錄。
- [x] 設定 TypeScript path alias。

#### PBI M1-2 Frontend tooling

- [x] 安裝狀態管理依賴。
- [x] 安裝 RxJS。
- [x] 安裝圖表庫。
- [x] 安裝 React Hook Form。
- [x] 安裝 Zod。
- [x] 安裝 Vitest 與 Testing Library。
- [x] 設定 ESLint。
- [x] 設定 formatter。
- [x] 建立 frontend 的 dev script。
- [x] 建立 frontend 的 build script。
- [x] 建立 frontend 的 test script。

#### PBI M1-3 Frontend architecture conventions

- [x] 定義 shared 與 domains 的邊界規則。
- [x] 定義 app 層責任範圍。
- [x] 為 dashboard domain 建立內部子目錄。
- [x] 為 market domain 建立內部子目錄。
- [x] 為 watchlist domain 建立內部子目錄。
- [x] 為 charting domain 建立內部子目錄。
- [x] 為 connection-health domain 建立內部子目錄。
- [x] 定義 domain public API 匯出方式。
- [x] 禁止以全域 components 或 hooks 作為預設收納點。

#### PBI M1-4 Backend 或 BFF workspace bootstrap

- [x] 初始化 Node.js TypeScript 專案。
- [x] 安裝 Fastify 或 Express。
- [x] 建立 backend/src 目錄。
- [x] 建立 backend/src/modules 目錄。
- [x] 建立 backend 的 dev script。
- [x] 建立 backend 的 build script。
- [x] 建立 backend 的 test script。
- [x] 建立基本 health check route。

#### PBI M1-5 Workspace conventions 與文件

- [x] 建立 frontend 環境變數範本檔。
- [x] 建立 backend 環境變數範本檔。
- [x] 補上 API base URL 變數占位值。
- [x] 補上 WebSocket base URL 變數占位值。
- [x] 補上預設 symbol 變數占位值。
- [x] 補上預設 interval 變數占位值。
- [x] 建立 docs 目錄。
- [x] 補齊 README 啟動步驟。
- [x] 補齊 README 資料來源假設。
- [x] 補齊前端領域導向目錄規範說明。

完成標準:

- [x] 前後端皆可在本機啟動。
- [x] 目錄結構與技術選型符合設計文件。
- [x] 前端目錄結構符合領域導向分類原則。
- [x] 環境變數不硬編碼於原始碼。

### M2. 市場資料接入與 BFF 正規化

#### PBI M2-1 Exchange REST client

- [x] 建立交易所 REST client。
- [x] 實作 pairs API 呼叫。
- [x] 實作 klines API 呼叫。
- [x] 定義 REST response schema。
- [x] 對 pairs response 做 schema 驗證。
- [x] 對 klines response 做 schema 驗證。
- [x] 將 exchange REST error 正規化為內部錯誤型別。

#### PBI M2-2 Domain model 與 mapping

- [ ] 定義 TradingPair 型別。
- [ ] 定義 Candle 型別。
- [ ] 定義 PriceTickEvent 型別。
- [ ] 定義 KlineUpdateEvent 型別。
- [ ] 定義 ConnectionStatusEvent 型別。
- [ ] 定義 LatencySampleEvent 型別。
- [ ] 實作 symbol normalizer。
- [ ] 實作交易所 symbol 到內部 symbol mapping。
- [ ] 實作 ticker payload 到 PriceTickEvent mapping。
- [ ] 實作 kline payload 到 KlineUpdateEvent mapping。
- [ ] 定義 24h change 的計算基準。
- [ ] 統一時間戳為 UTC epoch milliseconds。

#### PBI M2-3 BFF REST API

- [ ] 建立 GET /api/pairs route。
- [ ] 將 route 接上 pairs client。
- [ ] 為 /api/pairs 定義 query、limit 與回傳格式。
- [ ] 建立 GET /api/klines route。
- [ ] 將 route 接上 klines client。
- [ ] 定義 API error response 格式。
- [ ] 為 REST route 補上輸入驗證。

#### PBI M2-4 WebSocket relay

- [ ] 建立交易所上游 WebSocket client。
- [ ] 建立前端使用的 WebSocket relay endpoint。
- [ ] 定義 relay subscribe payload。
- [ ] 定義 relay unsubscribe payload。
- [ ] 轉送 ticker stream。
- [ ] 轉送 kline stream。
- [ ] 處理上游 reconnect 後自動 resubscribe。
- [ ] 維護目前啟用中的 symbol 訂閱集合。
- [ ] 對多個 frontend client 做 relay fan-out。
- [ ] 加入 relay reconnect 機制。
- [ ] 加入 relay 錯誤事件輸出。
- [ ] 加入 relay health 狀態輸出。

#### PBI M2-5 K 線 bootstrap 與正規化

- [ ] 定義歷史資料 bootstrap 流程。
- [ ] 定義 K 線 merge key。
- [ ] 實作 REST 與 WebSocket 重疊資料去重。
- [ ] 實作未收盤 K 線覆寫規則。
- [ ] 實作新 open time append 規則。
- [ ] 實作 late kline 或 updated kline 覆寫規則。

完成標準:

- [ ] 前端可取得交易對清單與歷史 K 線資料。
- [ ] WebSocket relay 可穩定推送價格與 K 線更新。
- [ ] 前後端間資料格式固定且有型別定義。
- [ ] exchange 特有 payload 已隔離在 adapter 或 mapping 層。
- [ ] symbol 與 timestamp 規則已被文件化並固定。

### M3. 前端資料流與狀態管理

#### PBI M3-1 Market stream foundation

- [ ] 建立 market stream 模組。
- [ ] 建立前端 WebSocket source wrapper。
- [ ] 實作事件 parser。
- [ ] 將原始 payload 轉為內部事件型別。
- [ ] 建立 shared subscription 機制。

#### PBI M3-2 RxJS orchestration

- [ ] 加入 shareReplay 流程。
- [ ] 加入 bufferTime 流程。
- [ ] 加入 sampleTime 流程。
- [ ] 加入 retry 或 retryWhen 流程。
- [ ] 定義 stream teardown 規則。

#### PBI M3-3 Reconnect 與 connection state

- [ ] 定義 backoff 常數：1s。
- [ ] 定義 backoff 常數：2s。
- [ ] 定義 backoff 常數：5s。
- [ ] 定義 backoff 常數：10s。
- [ ] 設定 backoff 上限。
- [ ] 實作重連成功後重置計數。
- [ ] 實作 reconnecting 狀態切換。
- [ ] 實作 disconnected 狀態切換。

#### PBI M3-4 Store 切分

- [ ] 建立 market store。
- [ ] 建立 watchlist store。
- [ ] 建立 chart store。
- [ ] 建立 connection health store。
- [ ] 定義 store state 型別。
- [ ] 定義 store actions。

#### PBI M3-5 Selector 與更新頻率分流

- [ ] 建立 market selectors。
- [ ] 建立 chart selectors。
- [ ] 建立 connection selectors。
- [ ] 對價格卡片資料套用較高頻率更新。
- [ ] 對圖表資料套用較低頻率批次更新。
- [ ] 確認高頻資料不觸發整體畫面重繪。

完成標準:

- [ ] 高頻行情下 UI 維持可操作。
- [ ] 斷線後可自動重連並恢復狀態。
- [ ] stream orchestration 與 UI 元件職責分離。

### M4. 即時報價面板與多交易對監控

#### PBI M4-1 Watchlist 畫面骨架

- [ ] 建立 watchlist 版面容器。
- [ ] 建立交易對列表元件。
- [ ] 建立單一價格卡片元件。
- [ ] 顯示 symbol 名稱。
- [ ] 顯示最新價格。
- [ ] 顯示 24h 變化值。

#### PBI M4-2 價格狀態視覺

- [ ] 定義 up 狀態樣式。
- [ ] 定義 down 狀態樣式。
- [ ] 定義 flat 狀態樣式。
- [ ] 加入短暫閃爍效果。
- [ ] 將價格方向狀態綁定到卡片樣式。

#### PBI M4-3 多交易對監控流程

- [ ] 實作多交易對訂閱清單。
- [ ] 讓列表與 stream 訂閱同步。
- [ ] 讓價格卡片同步更新。
- [ ] 限制重複訂閱同一交易對。

#### PBI M4-4 主交易對切換

- [ ] 建立主交易對選取 action。
- [ ] 將主交易對寫入 chart store。
- [ ] 切換主交易對時刷新圖表資料來源。
- [ ] 切換主交易對時不重新整理整頁。

完成標準:

- [ ] 價格更新時 UI 可即時反應。
- [ ] 可同時監控多個交易對。
- [ ] 主視圖切換交易對時不需重新整理頁面。

### M5. Watchlist 管理與持久化

#### PBI M5-1 新增交易對流程

- [ ] 建立新增交易對表單。
- [ ] 對輸入值做 trim。
- [ ] 將 symbol 正規化為統一格式。
- [ ] 加入字數上限。
- [ ] 加入格式驗證。
- [ ] 阻擋重複 symbol。
- [ ] 完成新增 action。

#### PBI M5-2 移除與排序

- [ ] 在列表中加入移除操作。
- [ ] 完成移除 action。
- [ ] 視需要加入排序欄位。
- [ ] 視需要加入排序 action。

#### PBI M5-3 搜尋與過濾

- [ ] 建立搜尋輸入元件。
- [ ] 將搜尋條件寫入 store。
- [ ] 實作關鍵字過濾。
- [ ] 為搜尋輸入加入 debounce。

#### PBI M5-4 LocalStorage 持久化

- [ ] 建立 watchlist storage key。
- [ ] 定義 storage schema version。
- [ ] 實作 save adapter。
- [ ] 實作 load adapter。
- [ ] 實作 invalid payload fallback。
- [ ] 實作 schema migration fallback。
- [ ] 在 app 啟動時 rehydrate watchlist。

完成標準:

- [ ] 使用者可新增、移除、搜尋交易對。
- [ ] 重新整理後 watchlist 仍保留。
- [ ] 非法 symbol 或輸入格式會被阻擋。

### M6. K 線圖、MA 與 KD 指標

#### PBI M6-1 Chart foundation

- [ ] 建立 chart 容器元件。
- [ ] 建立 chart adapter。
- [ ] 建立 candlestick series。
- [ ] 建立主圖初始化流程。
- [ ] 建立圖表銷毀清理流程。

#### PBI M6-2 Timeframe 與資料載入

- [ ] 建立 1m timeframe 選項。
- [ ] 建立 5m timeframe 選項。
- [ ] 建立 1h timeframe 選項。
- [ ] 切換 timeframe 時呼叫歷史 K 線查詢。
- [ ] 切換 timeframe 時重設對應訂閱。

#### PBI M6-3 K 線合併規則

- [ ] 明確定義 Candle.time 的時間基準。
- [ ] 以 symbol + interval + time 作為去重鍵。
- [ ] 未收盤 K 線更新時覆寫最後一根。
- [ ] 新 open time 到來時 append 新 K 線。
- [ ] REST bootstrap 與即時更新重疊時去重。

#### PBI M6-4 MA 指標

- [ ] 實作 MA5 純函式。
- [ ] 實作 MA10 純函式。
- [ ] 實作 MA20 純函式。
- [ ] 資料不足時回傳 null。
- [ ] 將 MA 疊加到主圖。

#### PBI M6-5 KD 指標

- [ ] 實作 RSV 計算。
- [ ] 實作 K 值更新。
- [ ] 實作 D 值更新。
- [ ] 資料不足時回傳 null。
- [ ] 將 KD 顯示於副圖。

#### PBI M6-6 多圖同步與增量更新

- [ ] 讓主圖與 KD 區塊共享 time scale。
- [ ] 支援縮放同步。
- [ ] 支援平移同步。
- [ ] 圖表更新採 update 或 append。
- [ ] 避免每次全量重建 series。

完成標準:

- [ ] 圖表可正確顯示即時與歷史資料。
- [ ] MA、KD 會隨資料更新動態重算。
- [ ] 圖表支援縮放、平移、timeframe 切換。

### M7. 連線健康監測與錯誤處理

#### PBI M7-1 Connection health model

- [ ] 定義 connected 狀態。
- [ ] 定義 disconnected 狀態。
- [ ] 定義 reconnecting 狀態。
- [ ] 記錄 reconnectAttempts。
- [ ] 記錄 lastMessageAt。
- [ ] 記錄 latencyMs。

#### PBI M7-2 健康量測策略

- [ ] 定義 heartbeat 可用時的量測流程。
- [ ] 實作 ping 或 pong round trip 量測。
- [ ] 定義無 heartbeat 時的訊息間隔估算規則。
- [ ] 避免將低活躍市場誤判為斷線。
- [ ] 定義長時間異常延遲門檻。

#### PBI M7-3 統一 error model

- [ ] 定義 API error model。
- [ ] 定義 WebSocket error model。
- [ ] 將外部錯誤轉為內部錯誤型別。
- [ ] 建立使用者顯示訊息 mapping。
- [ ] 保留技術細節於 console 或 telemetry。

#### PBI M7-4 錯誤與健康 UI

- [ ] 建立 connection badge 元件。
- [ ] 顯示 latency 資訊。
- [ ] 顯示 reconnect 次數。
- [ ] 顯示 last message 時間。
- [ ] 實作全域 Error Boundary。
- [ ] 實作 toast 提示。
- [ ] 實作不可恢復錯誤 fallback UI。
- [ ] 為長時間斷線加入醒目警示。

完成標準:

- [ ] 使用者可清楚辨識目前連線狀態。
- [ ] 暫時性錯誤可恢復，不可恢復錯誤有 fallback UI。
- [ ] 失敗訊息對使用者友善，技術細節保留於 console 或 telemetry。

### M8. 測試與品質保證

#### PBI M8-1 指標單元測試

- [ ] 為 MA5 撰寫 unit test。
- [ ] 為 MA10 撰寫 unit test。
- [ ] 為 MA20 撰寫 unit test。
- [ ] 為 KD 撰寫 unit test。
- [ ] 為資料不足情境撰寫 unit test。

#### PBI M8-2 Stream 與 parser 單元測試

- [ ] 為 WebSocket event parser 撰寫 unit test。
- [ ] 為 reconnect backoff 撰寫 unit test。
- [ ] 為 bufferTime 流程撰寫 unit test。
- [ ] 為 sampleTime 流程撰寫 unit test。
- [ ] 為 K 線去重規則撰寫 unit test。
- [ ] 為未收盤覆寫規則撰寫 unit test。

#### PBI M8-3 Storage 單元測試

- [ ] 為 watchlist save adapter 撰寫 unit test。
- [ ] 為 watchlist load adapter 撰寫 unit test。
- [ ] 為 invalid payload fallback 撰寫 unit test。
- [ ] 為 schema migration fallback 撰寫 unit test。

#### PBI M8-4 元件測試

- [ ] 測試價格卡片漲跌樣式。
- [ ] 測試 timeframe 切換互動。
- [ ] 測試 connection badge 顯示。
- [ ] 測試 watchlist 搜尋與過濾。

#### PBI M8-5 整合測試

- [ ] 測試歷史資料接即時更新。
- [ ] 測試斷線後自動重連。
- [ ] 測試 reconnect 後狀態恢復。
- [ ] 測試 watchlist rehydrate。

#### PBI M8-6 Coverage 與可維護性檢查

- [ ] 設定 coverage threshold。
- [ ] 產出 coverage report。
- [ ] 驗證核心邏輯 coverage 達 80% 以上。
- [ ] 檢查關鍵模組命名是否清楚。
- [ ] 檢查複雜規則是否有必要說明。

完成標準:

- [ ] indicators、streams、parsers 等核心模組 coverage 達 80% 以上。
- [ ] 主要使用情境具備自動化測試。
- [ ] 核心邏輯可獨立測試，不依賴 UI 渲染。

### M9. 效能優化、部署與交付

#### PBI M9-1 高頻更新效能調校

- [ ] 為高頻 stream 套用批次更新。
- [ ] 為高頻 stream 套用降頻策略。
- [ ] 驗證 selector-based 局部訂閱。
- [ ] 驗證價格卡片更新不拖慢圖表。
- [ ] 驗證圖表更新採 append 或 incremental update。

#### PBI M9-2 搜尋與渲染調校

- [ ] 搜尋輸入加入 debounce。
- [ ] 檢查高頻元件是否有不必要重繪。
- [ ] 修正主要重繪熱點。

#### PBI M9-3 Frontend 部署

- [ ] 建立 frontend production build 指令。
- [ ] 準備 frontend production 環境變數。
- [ ] 部署 frontend 至 Vercel 或 Netlify。

#### PBI M9-4 Backend 或 BFF 部署

- [ ] 建立 backend production build 指令。
- [ ] 準備 backend production 環境變數。
- [ ] 設定 CORS 與 WebSocket origin。
- [ ] 部署 backend 或 BFF 至 Railway、Render 或 Fly.io。

#### PBI M9-5 驗證與交付文件

- [ ] 取得 production URL。
- [ ] 執行 Lighthouse 驗證。
- [ ] 執行瀏覽器效能 trace。
- [ ] 整理架構文件。
- [ ] 整理 API 文件。
- [ ] 整理環境變數文件。
- [ ] 整理測試證據。
- [ ] 整理驗收對照。
- [ ] 整理畫面截圖。

完成標準:

- [ ] 專案已有可公開訪問的 production URL。
- [ ] Lighthouse Performance 達 90 分以上或有明確改善紀錄。
- [ ] 交付文件可支援展示、驗收與後續維護。

## 4. 優先順序建議

1. M1 專案初始化與基礎骨架
2. M2 市場資料接入與 BFF 正規化
3. M3 前端資料流與狀態管理
4. M4 即時報價面板與多交易對監控
5. M5 Watchlist 管理與持久化
6. M6 K 線圖、MA 與 KD 指標
7. M7 連線健康監測與錯誤處理
8. M8 測試與品質保證
9. M9 效能優化、部署與交付

## 5. 驗收對照摘要

- F1 即時報價流: 對應 M2、M3、M4、M7。
- F2 技術指標圖表: 對應 M2、M6、M8。
- F3 自選清單管理: 對應 M4、M5、M8。
- F4 連線狀態監測: 對應 M3、M7。
- N1 維護性: 對應 M1、M3、M8、M9。
- N2 錯誤處理: 對應 M7。
- N3 測試覆蓋: 對應 M8。
- N4 安全性與環境規範: 對應 M1、M5、M7。
- N5 部署與效能: 對應 M3、M6、M9。

## 6. 建議開發分支

- [ ] feature/project-bootstrap
- [ ] feature/bff-market-stream
- [ ] feature/frontend-stream-store
- [ ] feature/watchlist-management
- [ ] feature/chart-indicators
- [ ] feature/connection-health-error-handling
- [ ] test/core-logic-and-integration
- [ ] chore/deploy-and-docs
