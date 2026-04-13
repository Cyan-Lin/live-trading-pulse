# Live Trading Pulse Requirements Document

## 1. 文件資訊

- 專案名稱: Live Trading Pulse
- 文件版本: 1.0
- 文件日期: 2026-04-10
- 文件目的: 定義即時金融交易數據監控平台的功能範圍、品質要求、驗收標準與交付基準。

## 2. 專案概述

本專案為一個即時金融交易數據監控平台，目標是模擬大規模交易系統的前端操作環境。

除了展示 UI 與互動刻畫能力，核心重點在於以下幾項能力：

- 高頻率 WebSocket 數據流處理
- 前端狀態管理與效能優化
- 具備金融領域知識的技術指標呈現
- 可觀測的連線健康狀態與錯誤處理機制

## 3. 產品目標

- 提供可即時更新的多交易對市場監控介面。
- 在高頻更新情境下維持穩定、流暢的使用體驗。
- 以技術指標與互動圖表支援快速判讀市場走勢。
- 建立可維護、可測試、可部署的前端專案基礎。

## 4. 範圍定義

### 4.1 In Scope

- 串接交易所即時行情資料流。
- 多交易對監控與自選清單管理。
- K 線圖與技術指標計算與繪製。
- WebSocket 連線狀態監控與自動重連。
- 前端錯誤處理、測試、部署與文件化。

### 4.2 Out of Scope

- 真實下單功能。
- 使用者登入、權限控管與帳戶資產管理。
- 私有交易所 API Key 操作。
- 後台管理系統。

## 5. 功能需求

### F1. 即時報價流 (Real-time Market Stream)

- 系統需透過 WebSocket 連接交易所 API，如 Binance，獲取即時價格。
- 系統需支援多個交易對同時監控。

驗收標準:

- [ ] 當價格更新時，UI 需即時反應，如價格閃爍、漲紅跌綠。
- [ ] 需具備斷線偵測與自動重連機制。
- [ ] 實作 RxJS 數據緩衝機制，在高頻更新下頁面不卡頓。

### F2. 技術指標圖表 (Advanced Technical Charts)

- 展示特定交易對的 K 線圖 (Candlestick Chart)。
- 動態計算並顯示技術指標：移動平均線 (MA) 與隨機指標 (KD)。

驗收標準:

- [ ] 使用者可切換不同的時間維度，如 1m、5m、1h。
- [ ] 技術指標 MA、KD 需根據即時數據動態重新計算並準確繪製。
- [ ] 圖表需支援縮放與平移。

### F3. 自選清單管理 (Watchlist Management)

- 使用者可管理感興趣的交易標的。

驗收標準:

- [ ] 使用者可新增與移除交易對。
- [ ] 清單狀態需持久化，重新整理後資料不消失，可透過 LocalStorage 或 Backend API。
- [ ] 支援關鍵字搜尋過濾交易對。

### F4. 連線狀態監測 (Connection Health Monitor)

- 系統需視覺化顯示當前 WebSocket 的連線品質。

驗收標準:

- [ ] 顯示當前延遲或連線狀態標籤，如 Connected、Disconnected、Reconnecting。

## 6. 非功能需求

### N1. 程式碼品質與維護性 (Maintainability)

驗收標準:

- [ ] 重點邏輯 function 必須包含技術註解。
- [ ] 程式碼架構需遵循 Clean Code 原則，元件職責明確。
- [ ] 具備完善文件，如 API 介面定義、元件使用說明。

### N2. 錯誤處理 (Error Handling)

驗收標準:

- [ ] 實作全域錯誤邊界，捕捉渲染錯誤。
- [ ] API 請求失敗時需提供 user-friendly 提示，如 Toast 訊息。

### N3. 測試覆蓋 (Test Coverage)

驗收標準:

- [ ] 針對數據處理邏輯，如技術指標計算與 RxJS streams，撰寫 unit tests。
- [ ] 核心邏輯測試覆蓋率需達到 80% 以上。

### N4. 安全性與環境規範 (Security & Environment)

驗收標準:

- [ ] 敏感資料如 API endpoints、keys 必須透過環境變數管理，不得進入 Git。
- [ ] 所有使用者輸入欄位需實作基本防護，如 XSS 過濾與 input validation。

### N5. 部署與效能 (Deployment & Performance)

驗收標準:

- [ ] 專案需部署至雲端平台，如 Vercel、Netlify 或 Railway。
- [ ] 提供可直接訪問且功能完整的 production URL。
- [ ] Lighthouse Performance 分數需達到 90 分以上。

## 7. Git 規範 (Git Strategy)

驗收標準:

- [ ] Commit message 需符合 Conventional Commits。
- [ ] 嚴格執行任務導向的分支開發，Git history 需維持線性或具清晰 merge 記錄。

## 8. 相依條件與假設

- 預設採用公開市場資料來源，如 Binance 公開行情 API。
- 第一階段可先以公開資料與前端持久化完成核心功能。
- 若後續需要多端同步 watchlist，將擴充 backend API 與資料庫。
- 專案需支援現代瀏覽器桌面版，並具備基本行動裝置可用性。

## 9. 成功標準

- 使用者可穩定監控多個交易對的即時行情。
- 高頻行情更新下，介面仍能維持順暢互動。
- 圖表與技術指標可正確反映當前資料狀態。
- 具備可驗證的測試、文件與部署成果，可作為展示型作品或工程面試作品。
