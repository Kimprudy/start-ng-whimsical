import { StrictMode, useState, useEffect } from 'react';
import './styles.css';
import { createRoot } from 'react-dom/client';

type Section = 'games' | 'how' | 'about';

interface Game {
  name: string;
  url: string;
  by: string;
  cover_url?: string | null;
}

const originalGames: Game[] = [
  { name: '3d Coin Collector', url: 'https://start.ng/games/3d-coin-collector', by: 'Pleasure' },
  { name: 'Agege Rush', url: 'https://start.ng/games/agege-rush', by: 'Mustapha' },
  { name: 'Agent Protocol', url: 'https://start.ng/games/agent-protocol', by: 'Fabbenco' },
  { name: 'Alley Velocity', url: 'https://start.ng/games/alley-velocity', by: 'Monarch' },
  { name: 'Along', url: 'https://start.ng/games/along', by: 'Yolanda' },
  { name: 'Arcade Hub', url: 'https://start.ng/games/arcade-hub', by: 'HB' },
  { name: 'Archery Master', url: 'https://start.ng/games/archery-master', by: 'Irfat' },
  { name: 'Arrow Escape', url: 'https://start.ng/games/arrow-escape', by: 'Irfat' },
  { name: 'Ayo', url: 'https://start.ng/games/ayo', by: 'Hamzat' },
  { name: 'Ayo Arena', url: 'https://start.ng/games/ayo-arena', by: 'mar' },
  { name: 'Boju Boju', url: 'https://start.ng/games/boju-boju', by: '99PlusOne' },
  { name: 'The Hangout', url: 'https://start.ng/hangout', by: 'start.ng' },
];

function useStartNgGames() {
  const [games, setGames] = useState<Game[]>(originalGames);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/start-ng-games', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Live catalogue unavailable');
        return response.json();
      })
      .then((data: unknown) => {
        if (!Array.isArray(data)) return;
        const liveGames = data as Game[];
        if (liveGames.length) setGames(liveGames);
      })
      .catch(() => {
        // Keep the known Start.ng catalogue visible if the live API is unavailable.
      });
    return () => controller.abort();
  }, []);

  return games;
}

function GameCoverArt({ name }: { name: string }) {
  const n = name.toLowerCase();
  const palette = n.includes('coin') || n.includes('ayo') ? ['#d8fd71','#f5c451','#283023']
    : n.includes('rush') || n.includes('velocity') ? ['#ffb66e','#f06b47','#283023']
    : n.includes('agent') || n.includes('protocol') ? ['#c6d8b4','#8ba66d','#283023']
    : n.includes('archery') || n.includes('arrow') ? ['#e7c8ff','#a18ad6','#283023']
    : n.includes('boju') || n.includes('hangout') ? ['#f7c8b5','#ed8e72','#283023']
    : ['#f3e8c7','#d6b76a','#283023'];
  const [paper, accent, ink] = palette;
  const kind = n.includes('coin') ? 'coin' : n.includes('rush') || n.includes('velocity') ? 'drive'
    : n.includes('agent') ? 'agent' : n.includes('archery') || n.includes('arrow') ? 'arrow'
    : n.includes('ayo') ? 'board' : n.includes('hangout') || n.includes('boju') ? 'hangout'
    : n.includes('arcade') ? 'arcade' : 'play';
  return (
    <svg className={`cover-art cover-art--${kind}`} viewBox="0 0 320 200" role="img" aria-label={`${name} illustrated cover`} xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" rx="18" fill={paper}/>
      <path d="M0 150 Q74 120 142 157 T320 142 V200 H0Z" fill={accent} opacity=".24"/>
      <path d="M18 24h42M18 32h25M270 27h30" stroke={ink} strokeWidth="2" strokeLinecap="round" opacity=".22"/>
      {kind === 'coin' && <g transform="translate(160 95) rotate(-9)">
        <ellipse cx="0" cy="39" rx="56" ry="15" fill={ink} opacity=".13"/>
        {[0,1,2,3].map(i=><g key={i} transform={`translate(0 ${18-i*10})`}><ellipse rx="38" ry="12" fill={accent} stroke={ink} strokeWidth="2"/><path d="M-38 0v9c0 7 17 12 38 12s38-5 38-12V0" fill={accent} stroke={ink} strokeWidth="2"/><ellipse rx="38" ry="12" fill={paper} stroke={ink} strokeWidth="2"/><circle r="6" fill={accent} stroke={ink} strokeWidth="1.5"/></g>)}
      </g>}
      {kind === 'drive' && <g transform="translate(48 66)">
        <path d="M0 15h55M-10 27h32M190 0h35M205 13h20" stroke={ink} strokeWidth="3" strokeLinecap="round" opacity=".35"/>
        <path d="M17 55l16-25h89l30 25 14 7v29H7V66Z" fill={accent} stroke={ink} strokeWidth="3" strokeLinejoin="round"/>
        <path d="M43 34h39v21H29ZM89 34h29l24 21H89Z" fill={paper} stroke={ink} strokeWidth="2"/>
        <circle cx="38" cy="91" r="13" fill={ink}/><circle cx="133" cy="91" r="13" fill={ink}/><circle cx="38" cy="91" r="5" fill={paper}/><circle cx="133" cy="91" r="5" fill={paper}/>
        <path d="M12 74h25M144 74h12" stroke={paper} strokeWidth="4" strokeLinecap="round"/>
      </g>}
      {kind === 'agent' && <g transform="translate(160 100)">
        <path d="M0-56 48-28 48 28 0 56-48 28-48-28Z" fill={accent} stroke={ink} strokeWidth="2.5"/>
        <path d="M0-34 29-17 29 17 0 34-29 17-29-17Z" fill={paper} stroke={ink} strokeWidth="2"/>
        <circle r="10" fill={ink}/><circle cx="-3" cy="-3" r="3" fill={paper}/>
        <path d="M-80-20h22M58 22h23M-65 48h14M68-42h13" stroke={ink} strokeWidth="3" strokeLinecap="round" opacity=".6"/>
      </g>}
      {kind === 'arrow' && <g transform="translate(160 100) rotate(-20)">
        <path d="M-72 0H65" stroke={ink} strokeWidth="4" strokeLinecap="round"/>
        <path d="M35-24 68 0 35 24 42 6H-52V-6H42Z" fill={accent} stroke={ink} strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M-65-25l20 25-20 25M-90-25l20 25-20 25" fill="none" stroke={ink} strokeWidth="2" opacity=".45"/>
      </g>}
      {kind === 'board' && <g transform="translate(160 100) rotate(-7)">
        <rect x="-65" y="-53" width="130" height="106" rx="15" fill={accent} stroke={ink} strokeWidth="2.5"/>
        {[-1,0,1].map(x=>[-1,0,1].map(y=><g key={`${x}-${y}`}><circle cx={x*35} cy={y*28} r="11" fill={paper} stroke={ink} strokeWidth="2"/><circle cx={x*35} cy={y*28} r="3" fill={ink}/></g>))}
      </g>}
      {kind === 'hangout' && <g transform="translate(160 108)">
        <path d="M-70 7v-21a12 12 0 0 1 24 0v10h92v-10a12 12 0 0 1 24 0V7h8v27H-78V7Z" fill={accent} stroke={ink} strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M-55 34v13M55 34v13" stroke={ink} strokeWidth="4" strokeLinecap="round"/>
        <path d="M-5-34v-23M-5-48l-12-10M-5-42l13-12" stroke={ink} strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="-5" cy="-26" rx="17" ry="10" fill="#7c9b56" stroke={ink} strokeWidth="2"/>
      </g>}
      {kind === 'arcade' && <g transform="translate(160 102) rotate(7)">
        <path d="M-48-58H48L60 58H-60Z" fill={accent} stroke={ink} strokeWidth="2.5" strokeLinejoin="round"/>
        <rect x="-34" y="-38" width="68" height="43" rx="6" fill={paper} stroke={ink} strokeWidth="2"/>
        <path d="M-22-17h15m-7-7v15M12-24l12 14m0-14L12-10" stroke={ink} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="-20" cy="27" r="6" fill={ink}/><circle cx="17" cy="25" r="5" fill={paper} stroke={ink} strokeWidth="2"/>
      </g>}
      {kind === 'play' && <g transform="translate(160 100) rotate(-8)">
        <rect x="-53" y="-42" width="106" height="84" rx="20" fill={accent} stroke={ink} strokeWidth="2.5"/>
        <path d="M-27-7h24m-12-12v24" stroke={ink} strokeWidth="5" strokeLinecap="round"/>
        <circle cx="20" cy="-7" r="6" fill={paper} stroke={ink} strokeWidth="2"/><circle cx="32" cy="8" r="6" fill={paper} stroke={ink} strokeWidth="2"/>
        <path d="M-90 40q18-18 36 0t36 0M65-44q12-12 24 0t24 0" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" opacity=".55"/>
      </g>}
      <path d="M25 166l5-10 5 10 10 5-10 5-5 10-5-10-10-5Z" fill={paper} stroke={ink} strokeWidth="1.5"/>
      <circle cx="283" cy="159" r="4" fill={ink}/><circle cx="295" cy="170" r="2.5" fill={accent} stroke={ink} strokeWidth="1"/>
      <path d="M270 49q8-8 16 0t16 0" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" opacity=".45"/>
    </svg>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> The internet is a playground</p>
        <h1>A little<br />play goes <mark>a long way.</mark></h1>
        <p className="lead">Tiny worlds. Big ideas. Meet the browser games made by the Start.ng community — and jump straight into the fun.</p>
        <div className="actions">
          <a className="btn" href="#games">Find your next game <span aria-hidden="true">↗</span></a>
          <span className="hero-note">Free to play · No downloads</span>
        </div>
      </div>
      <div className="hero-stage" aria-hidden="true">
        <div className="stage-label stage-label--top">MADE TO BE PLAYED</div>
        <div className="stage-card stage-card--back"><GameCoverArt name="Agent Protocol" /></div>
        <div className="stage-card stage-card--front"><GameCoverArt name="Agege Rush" /></div>
        <div className="stage-sticker">PRESS<br />PLAY <span>↘</span></div>
        <div className="stage-scribble">good things<br />happen here</div>
      </div>
    </section>
  );
}

function GamesSection() {
  const games = useStartNgGames();

  return (
    <section id="games" className="games">
      <span id="tournament" className="anchor-target" aria-hidden="true" />
      <div className="section-head">
        <div><h2>Games from the community</h2></div>
      </div>
      <div className="see-all">
        <a className="btn" href="https://start.ng/games">Explore games ↗</a>
      </div>
      <div className="games-grid">
        {games.slice(0, 20).map((game) => (
          <a
            key={game.name}
            className="game-card"
            href={game.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Play ${game.name} on Start.ng`}
          >
            <div className={`game-card-image ${game.cover_url ? '' : 'game-card-image--no-cover'}`}>
              <GameCoverArt name={game.name} />
              {game.cover_url && (
                <img
                  className="game-cover"
                  src={game.cover_url}
                  alt={`${game.name} game preview`}
                  loading="lazy"
                  onLoad={(event) => event.currentTarget.parentElement?.classList.add('game-card-image--has-cover')}
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                    event.currentTarget.parentElement?.classList.remove('game-card-image--has-cover');
                  }}
                />
              )}
              <span className="game-cover-open">Play game ↗</span>
            </div>
            <div className="game-card-info">
              <h3 className="game-card-title">{game.name}</h3>
              <p className="game-card-dev">by {game.by || 'Start.ng community'}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function HowSection() {
  return (
    <section id="how" className="how">
      <div className="creator-heading">
        <span className="eyebrow"><span className="creator-eyebrow-dot" /> For creators</span>
        <span className="creator-side-note">SIDE QUEST 01 <span aria-hidden="true">↗</span></span>
      </div>
      <div className="creator-intro">
        <div>
          <h2>Got a game?<br /><span>Give it a little world.</span></h2>
          <p className="creator-lead">From a tiny weekend experiment to your next big idea — there’s room for it here.</p>
        </div>
        <div className="creator-doodle" aria-hidden="true">
          <div className="doodle-orbit doodle-orbit--one"></div>
          <div className="doodle-orbit doodle-orbit--two"></div>
          <div className="doodle-planet"></div>
          <span className="doodle-spark doodle-spark--a">✳</span>
          <span className="doodle-spark doodle-spark--b">✦</span>
          <span className="doodle-caption">made by you</span>
        </div>
      </div>
      <ol>
        <li><b>Build it</b><span>Any static browser game: HTML, JavaScript, three.js, Phaser. Players bring their start.ng character, scores and friends.</span></li>
        <li><b>Push it to GitHub</b><span>A public repo with a ready-to-play index.html at the top or in dist/, plus a cover.png for its card.</span></li>
        <li><b>Publish it</b><span>One API call with your repo link, no key needed. Or hand your AI start.ng/docs and let it do the lot.</span></li>
        <li><b>Approve it once</b><span>Open the link you get back and it's live at yourgame.start.ng, with its own leaderboard if you want one. After that, every push updates it.</span></li>
      </ol>
      <div className="creator-bottom">
        <div className="creator-bottom-note"><span className="creator-note-icon">↳</span><span><b>Your idea belongs on the internet.</b><small>Build it. Share it. Let people play.</small></span></div>
        <div className="how-actions">
          <a className="btn" href="https://start.ng/docs">Start building <span aria-hidden="true">↗</span></a>
          <a className="btn ghost" href="#about">How it works</a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="about-heading">
        <span className="section-kicker">A little corner of the internet</span>
        <span className="about-heading-doodle" aria-hidden="true">⌁ ✳</span>
      </div>
      <h2>About start.ng<span className="about-title-dot">.</span></h2>
      <p>start.ng is Nigeria's home for browser games, built by the HNG community. Every game is free to play in your browser with no download, and many are made in Naija: danfo rush hour, jollof catching, Lagos markets and more.</p>
      <p>We're also building a home for web games from across Africa. If you make games anywhere on the continent, you can put yours on start.ng for free.</p>
      <a className="about-more-link" href="https://start.ng">Wander over to start.ng <span aria-hidden="true">↗</span></a>
      <div className="faq-heading">
        <div><span className="section-kicker">Curious minds welcome</span><h3>Questions, answered<span>?</span></h3></div>
        <span className="faq-handnote">the little things <span aria-hidden="true">↙</span></span>
      </div>
      <div className="faq">
        <details><summary>What is start.ng?</summary><p>A home for free browser games made by the HNG community. Each game has its own address, like yourgame.start.ng, and you play it right in your browser.</p></details>
        <details><summary>Is it free?</summary><p>Yes. Every game on start.ng is free to play in your browser, with nothing to download.</p></details>
        <details><summary>Are there Nigerian or African web games?</summary><p>Yes. Many games here are Naija-themed, from danfo rush hour to jollof and Lagos markets, and we welcome games from across Africa.</p></details>
        <details><summary>Do I need an account to play?</summary><p>No. Sign in to get your start.ng character, keep your scores on the leaderboards and join the daily tournament.</p></details>
        <details><summary>What is the daily tournament?</summary><p>Every day a few start.ng games are picked for 24 hours, and the best player wins. Points count towards the overall leaderboard.</p></details>
        <details><summary>How do I put my game on start.ng?</summary><p>Push your browser game to a public GitHub repo, publish it with one API call and approve it once. It goes live at yourgame.start.ng. The docs have every step.</p></details>
      </div>
    </section>
  );
}

function NavBar() {
  return (
    <header className="container nav">
      <a className="logo" href="/"><b>start<span>.ng</span></b></a>
      <nav aria-label="Pages">
        <a href="#games">Games</a>
        <a href="#tournament">Tournament</a>
        <a href="#how">Creators</a>
        <a href="#how">Docs</a>
      </nav>
    </header>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main>
        <Container>
          <HeroSection />
          <GamesSection />
          <HowSection />
          <AboutSection />
        </Container>
      </main>
      <footer className="container site-footer">
        <div className="footer-playful-top">
          <div className="footer-top-copy"><span className="footer-mini-label">BEFORE YOU GO</span><h2>Stay a little.<br /><em>Play a little.</em></h2><p>There’s always another world to wander into.</p></div>
          <a className="footer-play-button" href="#games">Find a game <span aria-hidden="true">↗</span></a>
          <div className="footer-squiggle" aria-hidden="true"><svg viewBox="0 0 140 70"><path d="M5 54 C18 8 42 12 52 40 S79 65 86 32 S116 8 135 23" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="86" cy="32" r="5" fill="#d8fd71" stroke="currentColor" strokeWidth="2"/><path d="M113 47l4-8 4 8 8 4-8 4-4 8-4-8-8-4Z" fill="#d8fd71" stroke="currentColor" strokeWidth="1.5"/></svg></div>
        </div>
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <a className="logo" href="/"><b>start<span>.ng</span></b></a>
            <p>Nigeria's home for browser games, made by the community and by creators across Africa.</p>
            <span className="footer-brand-stamp"><span>✳</span> BUILT FOR PLAY <span>✳</span></span>
          </div>
          <nav aria-label="Play">
            <h2>Play</h2>
            <ul>
              <li><a href="#games">All games</a></li>
              <li><a href="#tournament">Daily tournament</a></li>
              <li><a href="#games">Leaderboard</a></li>
              <li><a href="#games">Categories</a></li>
              <li><a href="#about">The Hangout</a></li>
            </ul>
          </nav>
          <nav aria-label="Make games">
            <h2>Make games</h2>
            <ul>
              <li><a href="#how">Independent creators</a></li>
              <li><a href="#how">Build a game</a></li>
              <li><a href="#how">Creator guide</a></li>
            </ul>
          </nav>
          <nav aria-label="About">
            <h2>About</h2>
            <ul><li><a href="#about">About start.ng</a></li></ul>
          </nav>
        </div>
        <p className="site-footer-base"><span>© 2026 start.ng <i aria-hidden="true">✳</i></span><span>Made with a little imagination <i aria-hidden="true">♡</i></span><a href="#games">Back to play ↑</a></p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
);