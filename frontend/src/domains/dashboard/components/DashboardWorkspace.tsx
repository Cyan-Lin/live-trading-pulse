import { ChartingDomainCard } from '@domains/charting';
import { ConnectionHealthDomainCard } from '@domains/connection-health';
import { MarketDomainCard } from '@domains/market';
import { WatchlistDomainCard } from '@domains/watchlist';

const architectureRules = [
  'app 只做 shell 與跨領域組裝，不直接承載 market、charting、watchlist、connection-health 細節。',
  'shared 只放跨領域共用、且不帶明確業務語意的模組。',
  'domain 之間只能透過各自 index.ts public API 溝通。',
  '禁止把全域 components 或 hooks 當成預設收納點。',
];

export function DashboardWorkspace() {
  return (
    <section
      className="dashboard-workspace"
      aria-label="Frontend architecture conventions"
    >
      <header className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <p className="dashboard-eyebrow">M1-3 architecture baseline</p>
          <h1>Live Trading Pulse</h1>
          <p>
            app layer 現在只透過 dashboard domain 組裝頁面，其餘市場、圖表、自選
            與連線健康邏輯各自留在對應 vertical slice 中。
          </p>
        </div>

        <div>
          <h2>Domain layout</h2>
          <ul className="dashboard-rules">
            {architectureRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className="dashboard-grid">
        <MarketDomainCard />
        <WatchlistDomainCard />
        <ChartingDomainCard />
        <ConnectionHealthDomainCard />
      </div>
    </section>
  );
}
