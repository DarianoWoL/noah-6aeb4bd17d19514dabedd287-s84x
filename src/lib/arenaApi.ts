/** Public, read-only War of Lords game server endpoint (CORS enabled, no key). */
export const ARENA_API_URL = 'https://dogeos.waroflords.pl/api/public/arena';

/** Invite link used by every "Join and play" / "Play" button. */
export const JOIN_URL = 'https://dogeos.waroflords.pl/?invite=5deeaa99831f69dfca8e66465de555ab8d3e';

export interface ArenaRoom {
  name: string;
  maxPlayers: number;
  roundMinutes: number;
  ticketDoge: number;
  prizesDoge: { first: number; second: number; third: number };
}

export interface RankingEntry {
  rank: number;
  nick: string;
  skillPoints: number;
  gamesPlayed: number;
  wins: number;
}

export interface ArenaData {
  updatedAt: string | null;
  network: string | null;
  rooms: ArenaRoom[];
  /** Top 10, sorted by rank. */
  ranking: RankingEntry[];
}

type Raw = Record<string, unknown>;

const num = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
const str = (v: unknown, fallback = ''): string => (typeof v === 'string' && v.trim() ? v : fallback);
const list = (v: unknown): Raw[] => (Array.isArray(v) ? v.filter((x): x is Raw => !!x && typeof x === 'object') : []);

function parseRoom(r: Raw, i: number): ArenaRoom {
  const p = (r.prizesDoge && typeof r.prizesDoge === 'object' ? r.prizesDoge : {}) as Raw;
  return {
    name: str(r.name, `Room ${i + 1}`),
    maxPlayers: num(r.maxPlayers),
    roundMinutes: num(r.roundMinutes),
    ticketDoge: num(r.ticketDoge),
    prizesDoge: { first: num(p.first), second: num(p.second), third: num(p.third) },
  };
}

function parseEntry(e: Raw, i: number): RankingEntry {
  return {
    rank: num(e.rank) || i + 1,
    nick: str(e.nick, 'Unknown lord'),
    skillPoints: num(e.skillPoints),
    gamesPlayed: num(e.gamesPlayed),
    wins: num(e.wins),
  };
}

/** GET the arena snapshot. Malformed fields fall back to safe defaults. */
export async function fetchArena(signal?: AbortSignal): Promise<ArenaData> {
  const res = await fetch(ARENA_API_URL, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Game server responded with ${res.status}`);
  const json = (await res.json()) as Raw;

  return {
    updatedAt: str(json.updatedAt) || null,
    network: str(json.network) || null,
    rooms: list(json.rooms).map(parseRoom),
    ranking: list(json.ranking)
      .map(parseEntry)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10),
  };
}

export const formatAmount = (n: number): string => n.toLocaleString('en-US', { maximumFractionDigits: 2 });
