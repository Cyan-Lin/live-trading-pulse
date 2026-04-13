---
name: verification-quality-gates
description: 在分析或程式改動後，選擇並執行正確的驗證關卡。當使用者要求驗證、review、測試、稽核、確認驗收條件、檢查回歸、評估效能、或在交付前確認品質時使用。適用於「幫我驗證」、「review this」、「run tests」、「is this safe」、「check regressions」、「does this satisfy the requirement」等需求。非 trivial 的修改完成後也應自動使用。
metadata:
  author: live-trading-pulse
  version: "0.1.0"
---

# 驗證與品質關卡

使用這個技能是為了避免虛假的完成感。「我改了程式」不是任務完成的證據，驗證結果才是。

## 核心流程

1. 判斷哪些檢查相關：type、lint、unit、integration、manual、performance、security、或需求追蹤驗證。
2. 先跑成本最低但最有訊號的檢查。
3. 只在風險足夠高時擴大驗證範圍。
4. 做 review 時，先報 findings，再做摘要。
5. 明確指出哪些東西沒有被驗證到。

## 驗證原則

- 驗證深度要與改動風險相符。
- 優先採信直接證據，不要用樂觀推理代替驗證。
- 區分本次改動造成的失敗，與既有的無關問題。
- 做 review 時，findings 才是主要輸出，摘要是次要。

## 輸出內容

輸出時至少要說清楚：

- 檢查了哪些項目
- 哪些通過
- 哪些失敗
- 哪些無法檢查
- 剩餘風險是什麼

## 參考檔案

- 需要決定驗證深度時，讀取 `references/verification-matrix.md`。
