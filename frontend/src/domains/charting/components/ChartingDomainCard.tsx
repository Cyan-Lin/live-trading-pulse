import { SectionCard } from '@shared/ui';

export function ChartingDomainCard() {
  return (
    <SectionCard
      eyebrow="domain / charting"
      title="Charting"
      summary="圖表 adapter、技術指標與互動 hook 不再散落在畫面層，未來可獨立演進與測試。"
      items={[
        'adapters/: 對接 Lightweight Charts imperative API。',
        'indicators/: MA、KD 等純函式計算。',
        'components/、hooks/: 圖表與時間維度 UI。',
      ]}
      tone="charting"
    />
  );
}