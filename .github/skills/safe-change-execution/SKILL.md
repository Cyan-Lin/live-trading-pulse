---
name: safe-change-execution
description: 以最小影響面與明確防護來執行程式或設定變更。當 agent 即將修改檔案、重構既有邏輯、在 dirty git worktree 中工作、修改設定、或進行必須維持既有風格與行為的多檔案變更時使用。適用於「直接改」、「幫我修這個 bug」、「refactor this」、「patch this safely」、「make the minimal change」等需求。
metadata:
  author: live-trading-pulse
  version: "0.1.0"
---

# 安全變更執行

這個技能用來約束編輯行為。多數程式碼庫被破壞，不是因為需求本身太難，而是因為改動太大、範圍不清、順手碰了不該碰的地方。

## 核心流程

1. 重新閱讀即將修改的精確檔案。
2. 確認當地的風格、慣例與 public API 限制。
3. 只改能解決根因的必要部分。
4. 保留與任務無關的使用者變更、產生檔與既有慣例。
5. 編輯後立刻驗證受影響範圍。

## 變更規則

- 優先最小 diff，不要做大面積重寫。
- 除非任務需要，否則不要順手做清理型修改。
- 不要默默改 public contract、資料格式或指令行為。
- 如果既有本地變更讓情況變得模糊，就停下來明講衝突，不要猜。

## 輸出內容

回報進度時，至少要說清楚：

- 正在修改哪些面向
- 為什麼這些檔案是正確目標
- 預期會改變哪些行為

## 參考檔案

- 風險或範圍不小時，編輯前讀取 `references/change-checklist.md`。
