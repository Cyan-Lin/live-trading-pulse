import { SectionCard } from '@shared/ui';

export function MarketDomainCard() {
  return (
    <SectionCard
      eyebrow="domain / market"
      title="Market"
      summary="串流接入、資料模型與 mapping 都集中在 market domain，避免把 exchange 細節散落到 UI。"
      items={[
        'api/: REST client 與 schema 驗證。',
        'streams/: WebSocket source 與 orchestration。',
        'models/、mappers/、types/: 正規化的市場模型。',
      ]}
      tone="market"
    />
  );
}