import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

type Section = 'games' | 'how' | 'about';

interface Game {
  id: number;
  name: string;
  developer: string;
  category: string;
}

const gamesData: Game[] = [
  { id: 1, name: '3d Coin Collector', developer: 'Pleasure', category: 'arcade' },
  { id: 2, name: 'Agege Rush', developer: 'Mustapha', category: 'runner' },
  { id: 3, name: 'Agent Protocol', developer: 'Fabbenco', category: 'strategy' },
  { id: 4, name: 'Alley Velocity', developer: 'Monarch', category: 'arcade' },
  { id: 5, name: 'Along', developer: 'Yolanda', category: 'puzzle' },
  { id: 6, name: 'Arcade Hub', developer: 'HB', category: 'collection' },
  { id: 7, name: 'Archery Master', developer: 'David', category: 'archery' },
  { id: 8, name: 'Arrow Escape', developer: 'Irfat', category: 'escape' },
  { id: 9, name: 'Ayo', developer: 'Hamzat', category: 'board' },
  { id: 10, name: 'Ayo Arena', developer: 'mar', category: 'multiplayer' },
];

interface BubbleProps {
  x: number;
  y: number;
  size: 'xsmall' | 'small' | 'medium' | 'large';
  color: string;
  type: 'bubble' | 'sparkle';
}

function FloatingBubble({ className, style, ...props }: { className?: string; style?: React.CSSProperties; } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bubble ${className || ''}`}
      style={style}
      {...props}
    />
  );
}

function useFloatingBubbles() {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const createBubble = () => {
      const types: ('bubble' | 'sparkle')[] = ['bubble', 'bubble', 'bubble', 'sparkle'];
      const type = types[Math.floor(Math.random() * types.length)];

      const sizeOptions = ['xsmall', 'small', 'medium', 'large'];
      const size: 'xsmall' | 'small' | 'medium' | 'large' = sizeOptions[Math.floor(Math.random() * sizeOptions.length)] as 'xsmall' | 'small' | 'medium' | 'large';

      const colors = ['var(--blue-pale)', 'var(--accent-orange-light)', 'var(--accent-teal-light)', '#e8d4fc', '#fbcfe8'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const x = Math.random() * 100;
      const y = Math.random() * -100 - 50;

      const duration = type === 'bubble' ? 6 + Math.random() * 5 : 5 + Math.random() * 4;
      const delay = Math.random() * 3;

      const bubble: BubbleProps = {
        x,
        y,
        size,
        color,
        type,
      };

      setBubbles(prev => [...prev, bubble]);
    };

    // Create initial bubbles
    for (let i = 0; i < 20; i++) {
      createBubble();
    }

    // Create new bubbles periodically
    const interval = setInterval(createBubble, 400);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return bubbles;
}

function Bubble({ x, y, size, color, type }: BubbleProps) {
  const sizeMap: Record<string, { width: number; height: number; animation: string }> = {
    xsmall: { width: 10, height: 10, animation: 'float 10s ease-in-out infinite' },
    small: { width: 20, height: 20, animation: 'float 8s ease-in-out infinite' },
    medium: { width: 35, height: 35, animation: 'float 7s ease-in-out infinite' },
    large: { width: 50, height: 50, animation: 'float 5s ease-in-out infinite' },
  };

  const styles = sizeMap[size] || sizeMap.medium;

  if (type === 'sparkle') {
    return (
      <FloatingBubble
        className="sparkle"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          animationDuration: styles.animation,
          background: 'white',
        }}
      />
    );
  }

  return (
    <FloatingBubble
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: styles.width,
        height: styles.height,
        backgroundColor: color,
        animationDuration: styles.animation,
      }}
    />
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <p className="eyebrow">Big imagination. Played everywhere.</p>
      <h1>Good vibes.<br /><mark>Good games.</mark></h1>
      <p className="lead">Games made by builders in the community. Each one lives at its own start.ng address. Pick one and play right in your browser.</p>
      <div className="actions">
        <a className="btn" href="#games">Play now</a>
      </div>
    </section>
  );
}

function GamesSection() {
  return (
    <section id="games" className="games">
      <div className="section-head">
        <div>
          <h2>Games from the community</h2>
        </div>
      </div>
      <div className="see-all">
        <a className="btn" href="#all-games">See all 188 games →</a>
      </div>
      <div className="games-grid">
        {gamesData.map((game) => (
          <div
            key={game.id}
            className="game-card"
            style={{ transition: 'transform 0.2s ease' }}
          >
            <div
              className="game-card-image"
              style={{
                background: 'var(--blue-pale)',
                borderRadius: '8px',
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ink)',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              {game.name.substring(0, 10)}
            </div>
            <div className="game-card-info">
              <h3 className="game-card-title">{game.name}</h3>
              <p className="game-card-dev">{game.developer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowSection() {
  return (
    <section id="how" className="how">
      <h2>Got a game? Put it on start.ng</h2>
      <ol>
        <li>
          <b>Build it</b>
          <span>Any static browser game: HTML, JavaScript, three.js, Phaser. Players bring their start.ng character, scores and friends.</span>
        </li>
        <li>
          <b>Push it to GitHub</b>
          <span>A public repo with a ready-to-play index.html at the top or in dist/, plus a cover.png for its card.</span>
        </li>
        <li>
          <b>Publish it</b>
          <span>One API call with your repo link, no key needed. Or hand your AI start.ng/docs and let it do the lot.</span>
        </li>
        <li>
          <b>Approve it once</b>
          <span>Open the link you get back and it's live at yourgame.start.ng, with its own leaderboard if you want one. After that, every push updates it.</span>
        </li>
      </ol>
      <div className="how-actions">
        <a className="btn" href="/docs">Read the docs</a>
        <a className="btn ghost" href="/docs.md">Docs for your AI (.md)</a>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about">
      <h2>About start.ng</h2>
      <p>
        start.ng is Nigeria's home for browser games, built by the HNG community. Every game is free to play in your browser with no download, and many are made in Naija: danfo rush hour, jollof catching, Lagos markets and more.
      </p>
      <p>
        We're also building a home for web games from across Africa. If you make games anywhere on the continent, you can put yours on start.ng for free.
      </p>
      <a href="/about">More about start.ng →</a>
      <h3>Questions</h3>
      <div className="faq">
        <details>
          <summary>What is start.ng?</summary>
          <p>
            A home for free browser games made by the HNG community. Each game has its own address, like yourgame.start.ng, and you play it right in your browser.
          </p>
        </details>
        <details>
          <summary>Is it free?</summary>
          <p>Yes. Every game on start.ng is free to play in your browser, with nothing to download.</p>
        </details>
        <details>
          <summary>Are there Nigerian or African web games?</summary>
          <p>
            Yes. Many games here are Naija-themed, from danfo rush hour to jollof and Lagos markets, and we welcome games from across Africa.
          </p>
        </details>
        <details>
          <summary>Do I need an account to play?</summary>
          <p>No. Sign in to get your start.ng character, keep your scores on the leaderboards and join the daily tournament.</p>
        </details>
        <details>
          <summary>What is the daily tournament?</summary>
          <p>
            Every day a few start.ng games are picked for 24 hours, and the best player wins. Points count towards the overall leaderboard.
          </p>
        </details>
        <details>
          <summary>How do I put my game on start.ng?</summary>
          <p>
            Push your browser game to a public GitHub repo, publish it with one API call and approve it once. It goes live at yourgame.start.ng. The docs have every step.
          </p>
        </details>
      </div>
    </section>
  );
}

function NavBar() {
  return (
    <header className="container nav">
      <a className="logo" href="/">
        <b>start<span>.ng</span></b>
      </a>
      <nav aria-label="Pages">
        <a href="/games">Games</a>
        <a href="/tournament">Tournament</a>
        <a href="/creators">Creators</a>
        <a href="/docs">Docs</a>
      </nav>
    </header>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const bubbles = useFloatingBubbles();

  return (
    <div>
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
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <a className="logo" href="/"><b>start<span>.ng</span></b></a>
            <p>
              Nigeria's home for browser games, made by the community and by creators across Africa.
            </p>
          </div>
          <nav aria-label="Play">
            <h2>Play</h2>
            <ul>
              <li><a href="/games">All games</a></li>
              <li><a href="/tournament">Daily tournament</a></li>
              <li><a href="/leaderboard">Leaderboard</a></li>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/hangout">The Hangout</a></li>
            </ul>
          </nav>
          <nav aria-label="Make games">
            <h2>Make games</h2>
            <ul>
              <li><a href="/creators">Independent creators</a></li>
              <li><a href="/docs">Build a game</a></li>
              <li><a href="/docs.md">Docs for your AI (.md)</a></li>
            </ul>
          </nav>
          <nav aria-label="About">
            <h2>About</h2>
            <ul>
              <li><a href="/about">About start.ng</a></li>
            </ul>
          </nav>
        </div>
        <p className="site-footer-base">
          <span>© 2026 start.ng</span>
          <span>Games from Nigeria and across Africa.</span>
        </p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);