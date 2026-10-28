import { useEffect, useState } from 'react';
import snapshot from './snapshot.json';

// Same-origin proxy to https://api.start.ng (vercel.json rewrite in production,
// Vite proxy in dev/preview). The API does not send CORS headers for this domain.
const API = '/api/startng';
export const SITE = 'https://start.ng';

export interface Game {
  name: string;
  by: string;
  cover_url: string | null;
  plays: number;
  url: string;
}

export interface Tournament {
  ends_at: string;
  games: { name: string; cover_url: string | null }[];
}

export interface Challenge {
  game: string;
  game_title: string;
  cover_url: string | null;
  goal_shown: string;
  ends_at: string;
}

export interface IndieGame {
  id: number;
  name: string;
  url: string;
  by: string;
  cover_path: string;
}

function useLive<T>(path: string, fallback: T, pick: (data: unknown) => T | null = (d) => d as T) {
  const [value, setValue] = useState<T>(fallback);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}${path}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((data: unknown) => {
        const picked = pick(data);
        if (picked) setValue(picked);
      })
      .catch(() => {
        // Keep the bundled snapshot when the live API is unreachable.
      });
    return () => controller.abort();
  }, [path]);
  return value;
}

const nonEmptyList = <T,>(data: unknown) => (Array.isArray(data) && data.length ? (data as T[]) : null);

export const useGames = () =>
  useLive<Game[]>('/games', snapshot.games, (d) => nonEmptyList<Game & { hidden?: boolean }>(d)?.filter((g) => !g.hidden) ?? null);
export const useTournament = () =>
  useLive<Tournament>('/tournaments/current', snapshot.tournament, (d) => ((d as Tournament)?.games?.length ? (d as Tournament) : null));
export const useChallenge = () =>
  useLive<Challenge | null>('/spotlight', snapshot.challenge, (d) => (d as { challenge?: Challenge })?.challenge ?? null);
export const useIndie = (sort: 'newest' | 'popular', limit: number) =>
  useLive<IndieGame[]>(`/indie?limit=${limit}&sort=${sort}`, sort === 'newest' ? snapshot.indieNew : snapshot.indiePopular, nonEmptyList<IndieGame>);

export const isHangout = (name: string) => name === 'hangout';

export function gameTitle(name: string) {
  if (isHangout(name)) return 'The Hangout';
  return name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export const gameHref = (name: string) => (isHangout(name) ? `${SITE}/hangout` : `${SITE}/games/${name}`);
export const gameCover = (game: { name: string; cover_url: string | null }) =>
  isHangout(game.name) ? `${SITE}/hangout-cover.jpg` : game.cover_url;
export const gameAddress = (name: string) => (isHangout(name) ? 'start.ng/hangout' : `${name}.start.ng`);

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
export const indieHref = (g: IndieGame) => `${SITE}/creators/${g.id}-${slugify(g.name)}`;
export const indieCover = (g: IndieGame) => `https://api.start.ng${g.cover_path}`;
export const indieHost = (g: IndieGame) => {
  try { return new URL(g.url).host.replace(/^www\./, ''); } catch { return g.url; }
};

// Counts down to `iso`; once that has passed (e.g. a stale snapshot), to the next
// daily rollover at `utcHour`, which is when start.ng starts its next round.
export function useCountdown(iso: string | undefined, utcHour: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  let target = iso ? Date.parse(iso) : NaN;
  if (!(target > now)) {
    const next = new Date(now);
    next.setUTCHours(utcHour, 0, 0, 0);
    if (next.getTime() <= now) next.setUTCDate(next.getUTCDate() + 1);
    target = next.getTime();
  }
  const mins = Math.max(0, Math.floor((target - now) / 60_000));
  return `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`;
}
