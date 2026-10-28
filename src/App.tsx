import { useEffect, type CSSProperties } from 'react';
import {
  SITE, gameAddress, gameCover, gameHref, gameTitle, indieCover, indieHost, indieHref, isHangout,
  useChallenge, useCountdown, useGames, useIndie, useTournament, type Game,
} from './api';
import { Cover, DanfoRoad, Pip, PressPlay, Sparkle, Squiggle } from './components/Art';

const categories = [
  { slug: 'endless-runners', name: 'Endless runners', count: 38 },
  { slug: 'nigerian-themed', name: 'Nigerian themed', count: 43 },
  { slug: 'brainy-games', name: 'Brainy games', count: 25 },
  { slug: 'space-and-sci-fi', name: 'Space and sci-fi', count: 9 },
  { slug: 'racing-and-driving', name: 'Racing and driving', count: 14 },
  { slug: 'catch-and-dodge', name: 'Catch and dodge', count: 29 },
  { slug: 'ancient-ruins-and-treasure', name: 'Ancient ruins and treasure', count: 8 },
  { slug: 'with-friends', name: 'With friends', count: 8 },
];

const faqs = [
  ['What is start.ng?', 'A home for free browser games made by the HNG community. Each game has its own address, like yourgame.start.ng, and you play it right in your browser.'],
  ['Is it free?', 'Yes. Every game on start.ng is free to play in your browser, with nothing to download.'],
  ['Are there Nigerian or African web games?', 'Yes. Many games here are Naija-themed, from danfo rush hour to jollof and Lagos markets, and we welcome games from across Africa.'],
  ['Do I need an account to play?', 'No. Sign in to get your start.ng character, keep your scores on the leaderboards and join the daily tournament.'],
  ['What is the daily tournament?', 'Every day a few start.ng games are picked for 24 hours, and the best player wins. Points count towards the overall leaderboard.'],
  ['How do I put my game on start.ng?', 'Push your browser game to a public GitHub repo, publish it with one API call and approve it once. It goes live at yourgame.start.ng. The docs have every step.'],
];

const byPlays = (games: Game[]) => [...games].sort((a, b) => (b.plays ?? 0) - (a.plays ?? 0));

// Fades sections in as they scroll into view. Without IntersectionObserver
// (or with reduced motion) everything is simply visible.
function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function NavBar() {
  return (
    <header className="nav-wrap">
      <div className="container nav">
        <a className="logo" href={SITE} aria-label="start.ng home">
          <Pip mood="happy" className="logo-pip" />
          <b>start<span>.ng</span></b>
        </a>
        <nav aria-label="Pages">
          <a href={`${SITE}/games`}>Games</a>
          <a href={`${SITE}/tournament`}>Tournament</a>
          <a href={`${SITE}/creators`}>Creators</a>
          <a href={`${SITE}/docs`}>Docs</a>
        </nav>
        <a className="btn btn--small" href={SITE}>Sign in</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-doodles" aria-hidden="true">
        <PressPlay />
        <div className="orbit"><span className="orbit-moon" /></div>
        <Sparkle className="hero-spark hero-spark--a" />
        <Sparkle className="hero-spark hero-spark--b" />
      </div>
      <p className="kicker">Big imagination. Played everywhere.</p>
      <h1 aria-label="Good vibes. Good games.">
        <span aria-hidden="true">
          Good vib<span className="e-pop e-pop--a">e</span>s.<br />
          <span className="swash">Good gam<span className="e-pop e-pop--b">e</span>s.
            <svg className="swash-line" viewBox="0 0 420 34" preserveAspectRatio="none"><path d="M6 22 C90 8 180 30 260 16 S380 10 414 18" fill="none" stroke="#d8fd71" strokeWidth="16" strokeLinecap="round" /></svg>
          </span>
        </span>
      </h1>
      <p className="lead">
        Games made by builders in the community.{' '}<br />
        Each one lives at its own address, like <a className="url-chip" href="https://lagos-legends-street-quest.start.ng">lagos-legends-street-quest.start.ng</a>.{' '}<br />
        Pick one and play right in your browser.
      </p>
      <div className="actions">
        <a className="btn" href="#games">Play now</a>
        <a className="btn btn--paper" href={SITE}>Create free account</a>
      </div>
      <p className="handnote hero-note">psst… every game is free <span aria-hidden="true">↺</span></p>
      <DanfoRoad />
    </section>
  );
}

function TournamentBanner() {
  const tournament = useTournament();
  const left = useCountdown(tournament.ends_at, 17);
  const next = new Date(Date.parse(tournament.ends_at) > Date.now() ? tournament.ends_at : Date.now());
  const when = next.toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  return (
    <a id="tournament" className="banner banner--tournament" href={`${SITE}/tournament`} data-reveal>
      <div className="banner-copy">
        <p className="kicker kicker--left"><span className="live-dot" /> Today's tournament · {left} left</p>
        <h2>5 games. 24 hours.<br /><span className="hl">One winner.</span></h2>
        <p>Share to enter, then play.</p>
        <p className="banner-small">Next tournament starts in <b>{left}</b> · {when} your time. New games, revealed when it starts.</p>
        <span className="btn">See the tournament <span aria-hidden="true">→</span></span>
      </div>
      <div className="fan" aria-hidden="true">
        {tournament.games.slice(0, 5).map((g, i) => (
          <div key={g.name} className="fan-card" style={{ '--i': i - 2 } as CSSProperties}><Cover name={g.name} src={g.cover_url} /></div>
        ))}
        <span className="sticker sticker--trophy">🏆 win it</span>
      </div>
    </a>
  );
}

function ChallengeBanner() {
  const challenge = useChallenge();
  const left = useCountdown(challenge?.ends_at, 23);
  if (!challenge) return null;
  return (
    <a className="banner banner--challenge" href={gameHref(challenge.game)} data-reveal>
      <div className="banner-copy">
        <p className="kicker kicker--left">Daily challenge · {left} left</p>
        <h2>Reach <span className="goal-num">{challenge.goal_shown}</span> in {challenge.game_title}</h2>
        <p>One goal a day, set from how people really play.</p>
        <span className="btn">Take the challenge <span aria-hidden="true">→</span></span>
      </div>
      <div className="challenge-art" aria-hidden="true">
        <Cover name={challenge.game} src={challenge.cover_url} />
        <span className="target"><b>{challenge.goal_shown}</b><small>goal</small></span>
      </div>
    </a>
  );
}

function Categories() {
  return (
    <section className="categories" aria-labelledby="cat-title">
      <div className="row-head" data-reveal>
        <h2 id="cat-title">Pick a category</h2>
        <a className="link-arrow" href={`${SITE}/categories`}>All categories <span aria-hidden="true">→</span></a>
      </div>
      <div className="cat-grid" data-reveal>
        {categories.map((c) => (
          <a key={c.slug} className="cat-tile" href={`${SITE}/categories/${c.slug}`}
            style={{ '--art': `url(${SITE}/category-art/${c.slug}.webp)` } as CSSProperties}>
            <span className="cat-name">{c.name}</span>
            <span className="cat-count">{c.count} games</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function NewThisWeek({ games }: { games: Game[] }) {
  return (
    <section className="new-week" aria-labelledby="new-title">
      <div className="row-head" data-reveal>
        <h2 id="new-title">New this week <small>Every new game shows here first</small></h2>
      </div>
      <ul className="new-grid" data-reveal>
        {games.filter((g) => !isHangout(g.name)).slice(0, 5).map((g) => (
          <li key={g.name}>
            <a className="mini-card" href={gameHref(g.name)}>
              <div className="mini-cover"><Cover name={g.name} src={gameCover(g)} /><span className="new-burst">NEW</span></div>
              <h3>{gameTitle(g.name)}</h3>
              <p>by {g.by}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommunityGames({ games }: { games: Game[] }) {
  const top = byPlays(games).slice(0, 8);
  const az = games.filter((g) => !isHangout(g.name)).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section id="games" className="community">
      <div className="section-title" data-reveal>
        <h2>Games from the community</h2>
        <p><span className="chip">Most played</span> What everyone's playing this week <span className="handnote handnote--inline">crowd favourites ↓</span></p>
      </div>
      <div className="games-grid" data-reveal>
        {top.map((g, i) => (
          <a key={g.name} className={`game-card ${isHangout(g.name) ? 'game-card--featured' : ''}`} href={gameHref(g.name)}>
            <div className="game-cover">
              <Cover name={g.name} src={gameCover(g)} alt="" />
              {i < 3 && <span className={`rank rank--${i + 1}`}>#{i + 1}</span>}
              <span className="play-pop">Play ↗</span>
            </div>
            <div className="game-info">
              <h3>{gameTitle(g.name)}</h3>
              <p className="mono">{gameAddress(g.name)}</p>
              <p>by {g.by}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="see-all" data-reveal>
        <a className="btn btn--paper" href={`${SITE}/games`}>See all {games.length} games <span aria-hidden="true">→</span></a>
      </div>
      <details className="az" data-reveal>
        <summary><span>Every game on start.ng, A to Z ({az.length})</span><i aria-hidden="true">+</i></summary>
        <ul>
          {az.map((g) => <li key={g.name}><a href={gameHref(g.name)}>{gameTitle(g.name)}</a> <span>by {g.by}</span></li>)}
        </ul>
      </details>
    </section>
  );
}

function IndieCreators() {
  const popular = useIndie('popular', 3);
  const fresh = useIndie('newest', 4);
  return (
    <section id="creators" className="creators">
      <div className="creators-intro" data-reveal>
        <div>
          <p className="kicker kicker--left">Independent creators</p>
          <h2>Explore games from <span className="hl">independent creators</span></h2>
          <p className="creators-lead">Games made and hosted by creators everywhere, from itch.io to their own sites. Find something new, or show the community what you've made.</p>
          <div className="actions actions--left">
            <a className="btn" href={`${SITE}/creators`}>Explore games</a>
            <a className="btn btn--paper" href={`${SITE}/creators`}>Submit your game</a>
          </div>
          <p className="handnote">made anywhere, loved here ♡</p>
        </div>
        <div className="scrapbook">
          {popular.map((g, i) => (
            <a key={g.id} className={`polaroid polaroid--${i + 1}`} href={indieHref(g)} aria-label={g.name}>
              <span className="tape" aria-hidden="true" />
              <Cover name={g.name} src={indieCover(g)} />
              {i === 0 && <span className="sticker sticker--clicked">Most clicked</span>}
            </a>
          ))}
        </div>
      </div>
      <div className="row-head" data-reveal>
        <h3>New from independent creators</h3>
        <a className="link-arrow" href={`${SITE}/creators`}>See all <span aria-hidden="true">→</span></a>
      </div>
      <div className="indie-grid" data-reveal>
        {fresh.map((g) => (
          <a key={g.id} className="game-card" href={indieHref(g)}>
            <div className="game-cover"><Cover name={g.name} src={indieCover(g)} /><span className="play-pop">View ↗</span></div>
            <div className="game-info">
              <h3>{g.name}</h3>
              <p className="mono">{indieHost(g)}</p>
              <p>by {g.by}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="how" data-reveal>
      <Pip mood="wink" className="how-pip" />
      <h2>Got a game?<br /><span>Put it on start.ng</span></h2>
      <p className="handnote handnote--light">four little steps ↘</p>
      <ol className="steps">
        <li><b>Build it</b><span>Any static browser game: HTML, JavaScript, three.js, Phaser. Players bring their start.ng character, scores and friends.</span></li>
        <li><b>Push it to GitHub</b><span>A public repo with a ready-to-play <code>index.html</code> at the top or in <code>dist/</code>, plus a <code>cover.png</code> for its card.</span></li>
        <li><b>Publish it</b><span>One API call with your repo link, no key needed. Or hand your AI start.ng/docs and let it do the lot.</span></li>
        <li><b>Approve it once</b><span>Open the link you get back and it's live at <code>yourgame.start.ng</code>, with its own leaderboard if you want one. After that, every push updates it.</span></li>
      </ol>
      <div className="actions actions--left">
        <a className="btn btn--lime" href={`${SITE}/docs`}>Read the docs</a>
        <a className="btn btn--ghost" href={`${SITE}/docs.md`}>Docs for your AI (.md)</a>
      </div>
    </section>
  );
}

const naijaStickers = ['🚌 danfo rush hour', '🍛 jollof catching', '🛍️ Lagos markets', '🌍 games from across Africa'];

function About() {
  return (
    <section id="about" className="about">
      <div className="about-copy" data-reveal>
        <div className="notebook">
          <span className="tape tape--notebook" aria-hidden="true" />
          <h2>About start.ng<span className="dot">.</span></h2>
          <p>start.ng is Nigeria's home for browser games, built by the HNG community. Every game is free to play in your browser with no download, and many are made in Naija: danfo rush hour, jollof catching, Lagos markets and more.</p>
          <p>We're also building a home for web games from across Africa. If you make games anywhere on the continent, you can put yours on start.ng for free.</p>
          <p><a className="link-arrow" href={`${SITE}/about`}>More about start.ng <span aria-hidden="true">→</span></a></p>
        </div>
        <ul className="naija-stickers" aria-hidden="true">
          {naijaStickers.map((label) => <li key={label}>{label}</li>)}
        </ul>
      </div>
      <div className="faq" data-reveal>
        <div className="faq-head">
          <h3>Questions <Pip mood="wow" className="faq-pip" /></h3>
          <p className="handnote">ask away ↓</p>
        </div>
        {faqs.map(([q, a]) => (
          <details key={q}><summary>{q}<i aria-hidden="true">+</i></summary><p>{a}</p></details>
        ))}
      </div>
    </section>
  );
}

const marquee = ['Good vibes', 'Good games', 'Free to play', 'Made in Naija', 'No downloads', 'Built by the community'];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top" aria-hidden="true">
        <Pip mood="happy" className="footer-peek" />
        <svg className="footer-wave" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0 48V22C120 2 240 2 360 20S600 44 720 26 960 0 1080 16 1320 42 1440 20V48Z" />
        </svg>
      </div>
      <div className="footer-body">
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <span key={copy}>{marquee.map((m) => <span key={m}>{m}<Sparkle className="marquee-star" /></span>)}</span>
            ))}
          </div>
        </div>
        <Sparkle className="footer-spark footer-spark--a" />
        <Sparkle className="footer-spark footer-spark--b" />
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="logo logo--light" href={SITE}><Pip mood="happy" className="logo-pip" /><b>start<span>.ng</span></b></a>
            <p>Nigeria's home for browser games, made by the community and by creators across Africa.</p>
          </div>
          <nav aria-label="Play">
            <h2>Play</h2>
            <ul>
              <li><a href={`${SITE}/games`}>All games</a></li>
              <li><a href={`${SITE}/tournament`}>Daily tournament</a></li>
              <li><a href={`${SITE}/leaderboard`}>Leaderboard</a></li>
              <li><a href={`${SITE}/categories`}>Categories</a></li>
              <li><a href={`${SITE}/hangout`}>The Hangout</a></li>
            </ul>
          </nav>
          <nav aria-label="Make games">
            <h2>Make games</h2>
            <ul>
              <li><a href={`${SITE}/creators`}>Independent creators</a></li>
              <li><a href={`${SITE}/docs`}>Build a game</a></li>
              <li><a href={`${SITE}/docs.md`}>Docs for your AI (.md)</a></li>
            </ul>
          </nav>
          <nav aria-label="About">
            <h2>About</h2>
            <ul><li><a href={`${SITE}/about`}>About start.ng</a></li></ul>
          </nav>
        </div>
        <div className="container footer-base">
          <p>© 2026 start.ng · Games from Nigeria and across Africa.</p>
          <p className="handnote handnote--light footer-bye">come back soon! <span aria-hidden="true">👋</span></p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const games = useGames();
  useReveal();
  return (
    <>
      <NavBar />
      <main>
        <div className="container">
          <Hero />
          <TournamentBanner />
          <ChallengeBanner />
          <Categories />
          <NewThisWeek games={games} />
          <Squiggle />
          <CommunityGames games={games} />
          <Squiggle />
          <IndieCreators />
          <HowItWorks />
          <About />
        </div>
      </main>
      <Footer />
    </>
  );
}
