# 驗證矩陣

依據變更類型選擇驗證方式。

| Change Type | Minimum Validation | Expanded Validation |
| --- | --- | --- |
| Docs only | 閱讀並確認一致性 | 交叉比對需求引用 |
| Small bug fix | 目標測試或可重現檢查 | 對受影響範圍做 typecheck / lint |
| Multi-file feature | Typecheck + 目標測試 | Integration 或手動路徑驗證 |
| Refactor | 既有測試 + 行為比較 | 補充回歸測試 |
| Build / config change | Build 指令 + 啟動檢查 | 針對相關環境做 smoke test |
| Performance-sensitive path | 功能驗證 | 對受影響路徑做 profile 或 benchmark |

## Review 順序

做 review 時：

1. 先看正確性與回歸風險。
2. 再看可靠性、安全性與可維護性。
3. 最後補上測試缺口與開放假設。

## 驗證結束前自問

- 我是否有直接證據證明目前宣稱的完成狀態？
- 我驗證的是實際改變的行為，還是只確認 happy-path compile 有過？
- 是否還有重要但未驗證的面向需要讓使用者知道？
