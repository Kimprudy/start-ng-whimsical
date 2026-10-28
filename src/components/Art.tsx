import { useState } from 'react';

// Illustrated fallback art, shown when a game has no cover (or it fails to load).
export function GameCoverArt({ name }: { name: string }) {
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
        <path className="art-lines" d="M0 15h55M-10 27h32M190 0h35M205 13h20" stroke={ink} strokeWidth="3" strokeLinecap="round" opacity=".35"/>
        <g className="art-car">
          <path d="M17 55l16-25h89l30 25 14 7v29H7V66Z" fill={accent} stroke={ink} strokeWidth="3" strokeLinejoin="round"/>
          <path d="M43 34h39v21H29ZM89 34h29l24 21H89Z" fill={paper} stroke={ink} strokeWidth="2"/>
          <circle cx="38" cy="91" r="13" fill={ink}/><circle cx="133" cy="91" r="13" fill={ink}/><circle cx="38" cy="91" r="5" fill={paper}/><circle cx="133" cy="91" r="5" fill={paper}/>
          <path d="M12 74h25M144 74h12" stroke={paper} strokeWidth="4" strokeLinecap="round"/>
        </g>
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

// A real cover when there is one, faded in over the illustration (which stays
// as the placeholder while it loads, and as the fallback if it never does).
export function Cover({ name, src, alt = '' }: { name: string; src: string | null; alt?: string }) {
  const [state, setState] = useState<'loading' | 'loaded' | 'failed'>('loading');
  return (
    <span className={`cover cover--${src ? state : 'failed'}`}>
      <GameCoverArt name={name} />
      {src && state !== 'failed' && (
        <img src={src} alt={alt} loading="lazy" decoding="async" onLoad={() => setState('loaded')} onError={() => setState('failed')} />
      )}
    </span>
  );
}

// Pip: the start.ng play-button mark, with a face.
export function Pip({ mood = 'happy', className = '' }: { mood?: 'happy' | 'wink' | 'wow'; className?: string }) {
  return (
    <svg className={`pip pip--${mood} ${className}`} viewBox="0 0 64 64" aria-hidden="true">
      <g className="pip-body">
        <rect x="3" y="3" width="58" height="58" rx="15" fill="#d8fd71" stroke="#292a23" strokeWidth="3" />
        <path d="M27 18.5v27c0 1.6 1.7 2.5 3 1.7l20-13.5c1.2-.8 1.2-2.6 0-3.4l-20-13.5c-1.3-.8-3 .1-3 1.7z" fill="#292a23" opacity=".12" />
        <g className="pip-eyes">
          {mood === 'wink'
            ? <><path d="M17 27q4-4 8 0" fill="none" stroke="#292a23" strokeWidth="3" strokeLinecap="round" /><ellipse cx="41" cy="27" rx="3.6" ry="4.6" fill="#292a23" /></>
            : <><ellipse cx="21" cy="27" rx="3.6" ry="4.6" fill="#292a23" /><ellipse cx="41" cy="27" rx="3.6" ry="4.6" fill="#292a23" /></>}
        </g>
        {mood === 'wow'
          ? <ellipse cx="31" cy="42" rx="5" ry="6" fill="#292a23" />
          : <path d="M22 39q9 9 18 0" fill="none" stroke="#292a23" strokeWidth="3" strokeLinecap="round" />}
        <circle cx="13" cy="36" r="3.5" fill="#f28b65" opacity=".55" />
        <circle cx="49" cy="36" r="3.5" fill="#f28b65" opacity=".55" />
      </g>
    </svg>
  );
}

// Hand-drawn wave used between sections.
export function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg className={`squiggle ${className}`} viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 22 C60 4 120 38 180 20 S300 4 360 22 480 38 540 20 660 4 720 22 840 38 900 20 1020 4 1080 22 1170 34 1200 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 9" />
    </svg>
  );
}

export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg className={`sparkle ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5Z" fill="currentColor" stroke="#292a23" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

// Spinning "press play" badge around the start.ng play mark. The ring of text
// is its own element so it can spin on the GPU without repainting the SVG.
export function PressPlay() {
  return (
    <span className="press-play">
      <svg className="press-play-base" viewBox="0 0 124 124">
        <circle cx="64" cy="64" r="57" fill="#292a23" />
        <circle cx="60" cy="60" r="57" fill="#fffefa" stroke="#292a23" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="27" fill="#d8fd71" stroke="#292a23" strokeWidth="2.5" />
        <path d="M53 47v26c0 1.6 1.7 2.5 3 1.7l19-13c1.2-.8 1.2-2.6 0-3.4l-19-13c-1.3-.8-3 .1-3 1.7z" fill="#292a23" />
      </svg>
      <svg className="press-play-text" viewBox="0 0 124 124">
        <defs><path id="press-play-ring" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
        <text fontFamily="DM Mono, monospace" fontSize="12.5" letterSpacing="3.4" fill="#292a23">
          <textPath href="#press-play-ring">PRESS PLAY ✦ PRESS PLAY ✦ PRESS PLAY ✦</textPath>
        </text>
      </svg>
    </span>
  );
}

// A Whot card (the Naija card game), face up. Hover turns it over to a
// start.ng card back.
export function WhotCard() {
  const star = 'M50.0 37.0L56.8 54.7L75.7 55.7L60.9 67.6L65.9 85.8L50.0 75.5L34.1 85.8L39.1 67.6L24.3 55.7L43.2 54.7Z';
  const pip = 'M17.0 33.0L18.8 37.6L23.7 37.8L19.9 40.9L21.1 45.7L17.0 43.0L12.9 45.7L14.1 40.9L10.3 37.8L15.2 37.6Z';
  return (
    <span className="whot">
      <span className="whot-inner">
        <svg className="whot-face" viewBox="0 0 100 140">
          <rect x="2" y="2" width="96" height="136" rx="10" fill="#fffefa" stroke="#292a23" strokeWidth="3" />
          <text x="17" y="26" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="17" fill="#292a23">20</text>
          <path d={pip} fill="#f28b65" stroke="#292a23" strokeWidth="1.5" strokeLinejoin="round" />
          <g transform="rotate(180 50 70)">
            <text x="17" y="26" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="17" fill="#292a23">20</text>
            <path d={pip} fill="#f28b65" stroke="#292a23" strokeWidth="1.5" strokeLinejoin="round" />
          </g>
          <path d={star} fill="#f28b65" stroke="#292a23" strokeWidth="3" strokeLinejoin="round" />
          <text x="50" y="106" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="12" letterSpacing="1" fill="#292a23">WHOT</text>
        </svg>
        <svg className="whot-back" viewBox="0 0 100 140">
          <defs>
            <pattern id="whot-dots" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="1.6" fill="#292a23" opacity=".35" />
            </pattern>
          </defs>
          <rect x="2" y="2" width="96" height="136" rx="10" fill="#d8fd71" stroke="#292a23" strokeWidth="3" />
          <rect x="9" y="9" width="82" height="122" rx="6" fill="url(#whot-dots)" stroke="#292a23" strokeWidth="1.5" strokeDasharray="4 4" />
          <rect x="31" y="51" width="38" height="38" rx="9" fill="#292a23" />
          <path d="M45 60v20c0 1.2 1.3 1.9 2.3 1.3l14-10c.9-.6.9-2 0-2.6l-14-10c-1-.6-2.3.1-2.3 1.3z" fill="#d8fd71" />
        </svg>
      </span>
    </span>
  );
}
