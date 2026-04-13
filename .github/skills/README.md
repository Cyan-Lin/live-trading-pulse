# 基礎 Agent Skills

這個 repository 把共用技能放在 `.github/skills/`，讓 VS Code 與 GitHub Copilot 可以直接發現並使用。

這套技能刻意設計成抽象、可重用的工程工作流，而不是綁定某個技術棧或單一產品領域：

1. 先理解專案與 source of truth。
2. 把需求對到設計、任務與驗收。
3. 先規劃，再進行有邊界的實作。
4. 以安全、可審查的方式執行變更。
5. 改完立刻做局部驗證。
6. 在交付前執行更完整的品質關卡。
7. 提交前確認使用者真的理解 AI 產生的改動。
8. 把有價值的流程與知識反向沉澱成技能。
9. 最後用清楚的 handoff 收尾。

這些技能遵循常見的 Agent Skills / skills.sh 慣例：

- 每個技能都放在自己的資料夾，並以 `SKILL.md` 作為 manifest。
- `name` 必須和資料夾名稱完全一致。
- description 會刻意寫得具體，讓 agent 更容易正確觸發。
- 主要工作流寫在 `SKILL.md`，較深的模板與補充資料放在 `references/`。

## 目前包含的技能

- `repo-context-discovery`：在改程式前先建立專案上下文地圖。
- `requirements-traceability`：把需求、設計、任務、程式與驗收串起來。
- `implementation-planning`：把需求整理成可執行、可驗證的實作計畫。
- `safe-change-execution`：以最小 blast radius 安全修改程式或設定。
- `immediate-validation-loop`：改完就立刻驗、失敗就修、修完再跑。
- `verification-quality-gates`：決定交付前需要哪些品質關卡與驗證深度。
- `ai-change-understanding-gate`：在 commit 前由 agent 出題，要求使用者作答證明理解改動。
- `capture-skill`：把本次對話中的流程、陷阱與知識整理成可重用技能。
- `delivery-handoff`：用工程 handoff 方式做最後收尾。

## 建議使用順序

如果是全新工作或不熟悉的專案：

1. `repo-context-discovery`
2. `requirements-traceability`
3. `implementation-planning`
4. `safe-change-execution`
5. `immediate-validation-loop`
6. `verification-quality-gates`
7. `ai-change-understanding-gate`
8. `delivery-handoff`

當一次對話中長出了可重複使用的流程、模板或最佳實務時，再另外使用 `capture-skill` 把它沉澱下來。

## 補充說明

- 這套技能預設是 stack-agnostic，應先適應現有 repo 慣例，再決定是否引入新模式。
- `immediate-validation-loop` 是改完立刻做的小迴圈；`verification-quality-gates` 是更大範圍的交付驗證框架。
- `ai-change-understanding-gate` 是刻意設計的摩擦，用來防止 AI 產生的改動在沒被理解前就直接被送出。
