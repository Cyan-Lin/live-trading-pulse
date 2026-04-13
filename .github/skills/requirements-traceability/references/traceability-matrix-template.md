# 需求追蹤矩陣模板

在把需求連到實作時，使用這個矩陣。

| Requirement | Type | Design Source | Planned Work | Code Surface | Verification | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Functional | design.md §X | task.md Mx | path/to/file | test / manual check | planned | blockers |

## 狀態說明

- `unmapped`：需求存在，但還沒有定義實作路徑
- `planned`：已有任務與實作路徑，但尚未完成
- `implemented`：已有程式碼，但驗證仍不完整或缺失
- `verified`：已有實作，且有明確驗證證據
- `deferred`：刻意延後，且有理由

## 缺口檢查表

- 每個需求是否至少有一個對應的工作項目？
- 每個工作項目是否能對回真實需求？
- 每個需求是否都有可執行的驗收方式？
- 非功能需求是否也有被表示出來，而不只是使用者可見功能？
