---
name: repo-context-discovery
description: 在變更前先為不熟悉的 repository 建立可操作的上下文地圖。當使用者要求理解程式碼庫、查看專案結構、找出應該修改的位置、盤點相依關係、閱讀以文件為主的專案，或說出「先看專案」、「先理解結構」、「幫我找該改哪裡」、「understand this repo」、「explore the codebase」、「where should this feature live」時使用。在上下文不足、但即將規劃或動手改程式前，也應主動使用。
metadata:
  author: live-trading-pulse
  version: "0.1.0"
---

# 專案上下文探索

使用這個技能的目的，是避免在資訊不足時盲改。目標是把陌生的 workspace 轉成一份精簡但足夠可靠的工作模型，供後續規劃、修改與驗證使用。

## 核心流程

1. 盤點 workspace 的整體結構。
2. 找出真正的 source of truth，例如 requirements、design、task list、README 與設定檔。
3. 找出實際的啟動入口、build 指令、test 指令與整合邊界。
4. 標示主要模組、責任邊界與可能的修改面。
5. 在寫程式前先指出缺少的上下文、文件衝突與高風險假設。

## 輸出內容

輸出一份簡短的 context brief，至少回答：

- 專案目前想達成什麼
- 現在已經有什麼、還缺什麼
- 這次需求真正相關的檔案或資料夾是哪些
- 哪些假設可以成立、哪些還需要確認

## 執行原則

- 優先閱讀最少但最有訊號的檔案，再視需要擴張範圍。
- 明確區分事實與推論。
- 不要只看檔名就推斷架構，必須有證據。
- 如果專案目前以文件為主、程式尚未成形，暫時把需求與設計文件視為主要依據。

## 參考檔案

- 需要一致的探索輸出格式時，讀取 `references/context-brief-template.md`。
