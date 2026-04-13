---
name: implementation-planning
description: 在動手修改前，把功能需求、bug 修復、遷移或重構整理成有邊界的執行計畫。當任務跨多個檔案、有明顯順序風險、會碰到架構、引入新依賴，或使用者要求計畫、任務拆解、里程碑、落地順序、實作策略時使用。也適用於「先規劃」、「拆步驟」、「how should we implement this」、「make a plan」、「what order should we do this in」等需求。
metadata:
  author: live-trading-pulse
  version: "0.1.0"
---

# 實作規劃

當直接開始編輯的風險很高時，就使用這個技能。好的計畫必須夠具體，能直接執行；同時也要保留彈性，讓 agent 在取得新資訊後可以調整。

## 核心流程

1. 定義目標行為與明確的非目標。
2. 找出最小可行的變更順序。
3. 區分前置鋪墊工作與使用者可見功能。
4. 決定每個階段完成後要如何驗證。
5. 在執行前先標記不可逆或高風險動作。

## 規劃原則

- 優先規劃可驗證的薄切片，不要先鋪一大片未完成骨架。
- 讓前面的步驟先降低後續不確定性。
- 除非真的是根因，否則盡量維持介面穩定。
- 驗證要寫進計畫本身，不要等最後才補。

## 輸出內容

輸出一份包含以下欄位的計畫：

- Goal
- Assumptions
- Ordered steps
- 每個主要步驟的驗證方式
- 主要風險與 fallback 選項

## 參考檔案

- 需要固定格式時，讀取 `references/plan-template.md`。
