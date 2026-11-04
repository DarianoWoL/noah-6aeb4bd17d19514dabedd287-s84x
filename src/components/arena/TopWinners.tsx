import { formatDoge } from '@/lib/contract';
import type { Winner } from '@/lib/events';
import { addressUrl, shortAddress } from '@/lib/format';

const TopWinners = ({ winners }: { winners: Winner[] }) => (
  <div className="glass-card overflow-hidden rounded-lg">
    <h3 className="border-b border-primary/15 px-5 py-4 text-sm font-bold tracking-[0.18em] text-primary">
      TOP WINNERS
    </h3>
    {winners.length === 0 ? (
      <p className="px-5 py-8 text-center italic text-muted-foreground">No prizes credited yet.</p>
    ) : (
      <table className="w-full text-left">
        <thead>
          <tr className="font-display text-[11px] tracking-[0.15em] text-muted-foreground">
            <th className="px-5 py-3 font-normal">#</th>
            <th className="py-3 font-normal">LORD</th>
            <th className="py-3 text-right font-normal">DOGE</th>
            <th className="px-5 py-3 text-right font-normal">WINS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/10">
          {winners.map((w, i) => (
            <tr key={w.address} className="theme-row transition-colors hover:bg-primary/5">
              <td className={`px-5 py-3 font-display ${i < 3 ? 'text-primary' : 'text-muted-foreground'}`}>{i + 1}</td>
              <td className="py-3 font-mono text-sm">
                <a href={addressUrl(w.address)} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  {shortAddress(w.address)}
                </a>
              </td>
              <td className="py-3 text-right font-display font-bold text-foreground">{formatDoge(w.total)}</td>
              <td className="px-5 py-3 text-right text-muted-foreground">{w.prizes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default TopWinners;
