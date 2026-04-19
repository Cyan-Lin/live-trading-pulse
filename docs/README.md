# Workspace Conventions

docs/ 目錄用來放補充性的 workspace 約定與開發說明，不取代 root 的 requirements.md、design.md 與 task.md。

## Documentation Source Of Truth

- requirements.md: 定義功能範圍、非功能需求與驗收標準。
- design.md: 定義系統分層、技術選型、資料模型與檔案組織原則。
- task.md: 追蹤里程碑、PBI 與完成狀態。

若 docs/ 與上述 root 文件有衝突，以 root 文件為準；docs/ 的角色是補充實作慣例與 onboarding 說明。

## Environment Conventions

- frontend/.env.example 為前端設定範本；本機請複製為 frontend/.env.local。
- backend/.env.example 為後端設定範本；本機請複製為 backend/.env。
- 實際環境值不可提交；example 檔只保留非敏感的占位值。
- API base URL、WebSocket base URL、預設 symbol 與預設 interval 應優先從環境變數注入，而不是散落在不同檔案中重複定義。

## Workspace Startup Order

1. 安裝 frontend 與 backend 依賴。
2. 建立各自的本機 env 檔案。
3. 先啟動 backend，再啟動 frontend。
4. 修改 docs 或 env 契約時，README 與 task.md 需同步更新。

## Additional Docs

- frontend-domain-conventions.md: 前端領域導向目錄與 public API 規則。
