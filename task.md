# Live Trading Pulse Task List

## 1. 任務目標

將需求文件與設計文件拆解為可執行的開發任務，涵蓋前端、BFF、測試、部署與文件化，並保留明確的驗收依據。

## 2. 執行原則

- 以可部署、可驗收、可展示為優先。
- 先建立骨架與資料流，再完成圖表與指標。
- 核心邏輯需可測試，避免將財務計算與 UI 緊耦合。
- 每個階段完成後皆需保留可驗證成果。

## 3. 里程碑與任務清單

### M1. 專案初始化與基礎骨架

- [ ] 建立 frontend 專案，採用 React 18、TypeScript、Vite。
- [ ] 建立 backend 或 BFF 專案，採用 Node.js + TypeScript。
- [ ] 建立建議目錄結構：frontend、backend、docs。
- [ ] 安裝並設定基礎依賴：RxJS、狀態管理、圖表庫、表單驗證、測試工具。
- [ ] 建立環境變數範本檔，至少包含 API 與 WebSocket base URL、預設 symbol、預設 interval。
- [ ] 建立 lint、format、test 指令與基本開發腳本。
- [ ] 補齊 README 或開發說明，描述啟動方式與資料來源假設。

完成標準:

- [ ] 前後端皆可在本機啟動。
- [ ] 目錄結構與技術選型符合設計文件。
- [ ] 環境變數不硬編碼於原始碼。

### M2. 市場資料接入與 BFF 正規化

- [ ] 實作 BFF REST API：GET /api/pairs。
- [ ] 實作 BFF REST API：GET /api/klines。
- [ ] 實作 BFF WebSocket relay，代理交易所 ticker 與 kline stream。
- [ ] 建立交易所資料 parser，將外部資料轉為內部 domain model。
- [ ] 定義事件模型：PriceTickEvent、KlineUpdateEvent、ConnectionStatusEvent、LatencySampleEvent。
- [ ] 建立 symbol mapping 與資料正規化流程，避免前端直接依賴交易所格式。
- [ ] 建立初始歷史 K 線 bootstrap 流程，供圖表首次載入使用。

完成標準:

- [ ] 前端可取得交易對清單與歷史 K 線資料。
- [ ] WebSocket relay 可穩定推送價格與 K 線更新。
- [ ] 前後端間資料格式固定且有型別定義。

### M3. 前端資料流與狀態管理

- [ ] 建立 market stream 模組，集中管理 WebSocket 生命週期。
- [ ] 使用 RxJS 實作資料 parser、retry、shareReplay、bufferTime、sampleTime。
- [ ] 建立 reconnect 指數退避策略，至少涵蓋 1s、2s、5s、10s，並設定上限。
- [ ] 將價格資料與圖表資料分流處理，避免高頻更新造成整體重繪。
- [ ] 建立 store 結構，分離 market、watchlist、chart、connection health 狀態。
- [ ] 建立 selectors 或等效機制，降低不必要 re-render。

完成標準:

- [ ] 高頻行情下 UI 維持可操作。
- [ ] 斷線後可自動重連並恢復狀態。
- [ ] stream orchestration 與 UI 元件職責分離。

### M4. 即時報價面板與多交易對監控

- [ ] 建立多交易對 watchlist 畫面。
- [ ] 顯示各交易對最新價格、24h 變化與方向狀態。
- [ ] 當價格變動時加入短暫閃爍或狀態轉換效果。
- [ ] 支援多交易對同時訂閱與畫面同步更新。
- [ ] 建立主交易對切換流程，讓圖表區可隨 watchlist 選擇更新。

完成標準:

- [ ] 價格更新時 UI 可即時反應。
- [ ] 可同時監控多個交易對。
- [ ] 主視圖切換交易對時不需重新整理頁面。

### M5. Watchlist 管理與持久化

- [ ] 實作新增交易對功能。
- [ ] 實作移除交易對功能。
- [ ] 實作搜尋與過濾交易對功能。
- [ ] 加入輸入驗證、trim、長度限制與格式檢查。
- [ ] 實作 LocalStorage adapter 與 schema versioning。
- [ ] 讓 watchlist 在重新整理後可還原。
- [ ] 視需要補上排序能力。

完成標準:

- [ ] 使用者可新增、移除、搜尋交易對。
- [ ] 重新整理後 watchlist 仍保留。
- [ ] 非法 symbol 或輸入格式會被阻擋。

### M6. K 線圖、MA 與 KD 指標

- [ ] 整合 candlestick chart 元件。
- [ ] 實作 timeframe 切換，至少支援 1m、5m、1h。
- [ ] 載入歷史 K 線後接上即時 K 線更新。
- [ ] 實作 MA5、MA10、MA20 純函式計算。
- [ ] 實作 KD 純函式計算，採 rolling window 方式更新。
- [ ] 將 MA 疊加於主圖，KD 顯示於副圖。
- [ ] 讓主圖與 KD 區塊共享 time scale，支援縮放與平移同步。
- [ ] 確保資料不足時回傳 null 或等效空值，避免錯誤繪圖。

完成標準:

- [ ] 圖表可正確顯示即時與歷史資料。
- [ ] MA、KD 會隨資料更新動態重算。
- [ ] 圖表支援縮放、平移、timeframe 切換。

### M7. 連線健康監測與錯誤處理

- [ ] 建立 connection health 模組，顯示 connected、disconnected、reconnecting。
- [ ] 顯示 latency、reconnect 次數、last message 時間。
- [ ] 若有 heartbeat，實作 ping/pong round trip 量測；若無，使用訊息間隔估算健康狀態。
- [ ] 實作全域 Error Boundary。
- [ ] 統一 API 與 WebSocket error model。
- [ ] 實作 toast 或等效 user-friendly 訊息提示。
- [ ] 為長時間斷線或異常延遲設計明顯視覺警示。

完成標準:

- [ ] 使用者可清楚辨識目前連線狀態。
- [ ] 暫時性錯誤可恢復，不可恢復錯誤有 fallback UI。
- [ ] 失敗訊息對使用者友善，技術細節保留於 console 或 telemetry。

### M8. 測試與品質保證

- [ ] 為 MA 與 KD 計算函式撰寫 unit tests。
- [ ] 為 WebSocket event parser 撰寫 unit tests。
- [ ] 為 RxJS reconnect、buffer、throttle 或 sample 流程撰寫 unit tests。
- [ ] 為 watchlist storage adapter 撰寫 unit tests。
- [ ] 撰寫元件測試：價格卡片漲跌樣式、timeframe 切換、connection badge。
- [ ] 撰寫整合測試：歷史資料接即時更新、斷線重連、watchlist 還原。
- [ ] 驗證核心邏輯 coverage 是否達到 80% 以上。
- [ ] 檢查關鍵邏輯是否具有必要註解與清楚命名。

完成標準:

- [ ] indicators、streams、parsers 等核心模組 coverage 達 80% 以上。
- [ ] 主要使用情境具備自動化測試。
- [ ] 核心邏輯可獨立測試，不依賴 UI 渲染。

### M9. 效能優化、部署與交付

- [ ] 針對高頻 stream 實作批次更新與降頻策略。
- [ ] 驗證 state access 是否採 selector-based 或等效局部訂閱方式。
- [ ] 確認圖表更新採 append 或 incremental update，而非全量重建。
- [ ] 搜尋輸入加入 debounce。
- [ ] 建立 production build 與部署流程。
- [ ] 部署 frontend 至 Vercel 或 Netlify。
- [ ] 部署 backend 或 BFF 至 Railway、Render 或 Fly.io。
- [ ] 提供 production URL。
- [ ] 使用 Lighthouse 與瀏覽器效能工具驗證效能，目標 Performance 90 分以上。
- [ ] 整理最終文件：架構、API、環境變數、測試證據、驗收對照與畫面截圖。

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
