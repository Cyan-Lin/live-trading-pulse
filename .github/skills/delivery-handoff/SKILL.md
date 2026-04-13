---
name: delivery-handoff
description: 用精簡但完整的工程 handoff 收尾，說明改了什麼、驗證了什麼、還有哪些風險，以及下一步最合理的動作。當完成實作、總結 review、準備 checkpoint、要把工作交給另一個 agent 或工程師，或回應「總結一下」、「交付說明」、「what changed」、「handoff this」、「what should we do next」時使用。
metadata:
  author: live-trading-pulse
  version: "0.1.0"
---

# 交付與交接說明

這個技能用來把工作收乾淨。好的 handoff 應該讓下一個人不必重新倒推整段過程，也能直接接手。

## 核心流程

1. 摘要最終結果，不要重述整段對話。
2. 把結果對回原始需求或任務目標。
3. 說清楚已完成的驗證與尚存缺口。
4. 明確指出 blocker 與後續工作。
5. 只有在真的有幫助時才建議下一步。

## 交接原則

- 先講最重要的結果。
- 實作細節應服從使用者影響，不要本末倒置。
- 要明講風險與未驗證區域。
- 如果關鍵檢查沒做，不要假裝已完成。

## 輸出內容

輸出時至少包含：

- 改了什麼
- 為什麼要改
- 做了哪些驗證
- 剩下哪些風險或缺口
- 可選的下一步

## 參考檔案

- 需要固定格式時，讀取 `references/handoff-template.md`。
