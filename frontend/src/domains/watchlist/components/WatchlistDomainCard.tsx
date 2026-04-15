import { SectionCard } from '@shared/ui';

export function WatchlistDomainCard() {
  return (
    <SectionCard
      eyebrow="domain / watchlist"
      title="Watchlist"
      summary="自選清單的輸入驗證、持久化與互動狀態，都維持在 watchlist domain 內部閉環。"
      items={[
        'components/: 列表、搜尋與新增表單。',
        'store/: 自選狀態與 actions。',
        'storage/: LocalStorage 或未來 backend adapter。',
      ]}
      tone="watchlist"
    />
  );
}