import { SectionCard } from '@shared/ui';

export function ConnectionHealthDomainCard() {
  return (
    <SectionCard
      eyebrow="domain / connection-health"
      title="Connection Health"
      summary="連線狀態、延遲採樣與重連策略準備集中在同一個 domain，避免 UI 自行推斷健康度。"
      items={[
        'services/: heartbeat、latency 與 reconnect 協調。',
        'store/: status、lastMessageAt、reconnectAttempts。',
        'components/: 連線標籤與異常提示。',
      ]}
      tone="connection-health"
    />
  );
}
