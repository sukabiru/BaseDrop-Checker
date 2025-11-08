// /api/card.tsx
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// helpers
function shortAddr(addr: string) {
  return addr && addr.startsWith('0x') ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : '';
}
function themeForTier(tier: string) {
  const t = tier?.toLowerCase?.() || 'low';
  if (t === 'high') return { name: 'High', primary: '#1bffbd', secondary: '#00a3ff', glow: 'rgba(27,255,189,0.25)' };
  if (t === 'medium') return { name: 'Medium', primary: '#ffd166', secondary: '#06d6a0', glow: 'rgba(255,209,102,0.25)' };
  return { name: 'Low', primary: '#ff6b6b', secondary: '#b089ff', glow: 'rgba(255,107,107,0.25)' };
}

export default async function handler(req: Request) {
  // ✅ load fonts from public/ based on current request origin
  const interUrl     = new URL('/Inter-Regular.ttf', req.url);
  const interBoldUrl = new URL('/Inter-ExtraBold.ttf', req.url);
  const orbitronUrl  = new URL('/Orbitron-SemiBold.ttf', req.url);

  const [inter, interBold, orbitron] = await Promise.all([
    fetch(interUrl).then(r => r.arrayBuffer()),
    fetch(interBoldUrl).then(r => r.arrayBuffer()),
    fetch(orbitronUrl).then(r => r.arrayBuffer()),
  ]);

  const { searchParams } = new URL(req.url);
  const score = Math.max(0, Math.min(100, Number(searchParams.get('score') || 0)));
  const tier = (searchParams.get('tier') || 'Low').toString();
  const address = (searchParams.get('address') || '').toString();
  const measuredAt = (searchParams.get('measuredAt') || '').toString();
  const percentileRaw = searchParams.get('percentile');
  const percentile = percentileRaw ? Math.max(0, Math.min(100, Number(percentileRaw))) : null;

  const theme = themeForTier(tier);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          background: `radial-gradient(1200px 800px at 10% 0%, ${theme.glow} 0%, transparent 60%), radial-gradient(1000px 700px at 100% 100%, ${theme.glow} 0%, transparent 60%), linear-gradient(135deg, #0b1020 0%, #0a0a0f 60%)`,
          color: 'white',
          fontFamily: 'Inter',
        }}
      >
        {/* subtle grid */}
        <div style={{position:'absolute', inset:0, opacity:0.08, backgroundImage:'linear-gradient(to right, rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize:'40px 40px'}} />

        {/* header */}
        <div style={{ position: 'absolute', top: 36, left: 48, display:'flex', alignItems:'center', gap: 18 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, boxShadow: `0 0 30px ${theme.glow}` }} />
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 0.5 }}>BaseDrop Checker</div>
        </div>

        {/* glass panel */}
        <div
          style={{
            position: 'absolute',
            left: 60,
            right: 60,
            top: 120,
            bottom: 60,
            borderRadius: 24,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            padding: '36px 48px',
            gap: 24,
          }}
        >
          {/* left: score */}
          <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', paddingRight: 24 }}>
            <div style={{ fontSize: 22, opacity: 0.8, marginBottom: 8 }}>Your Score</div>
            <div style={{ display:'flex', alignItems:'baseline', gap: 18 }}>
              <div style={{
                fontFamily: 'Orbitron',
                fontSize: 160,
                fontWeight: 800,
                lineHeight: 1,
                background: `linear-gradient(180deg, ${theme.primary}, ${theme.secondary})`,
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: `0 0 30px ${theme.glow}`,
              }}>{score}</div>
              <div style={{ fontSize: 40, fontWeight: 800, marginTop: 36, color: theme.primary }}>{theme.name}</div>
            </div>

            <div style={{ display:'flex', gap: 16, marginTop: 24 }}>
              <div style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: 12, opacity: .7 }}>Wallet</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{shortAddr(address)}</div>
              </div>
              {percentile !== null && (
                <div style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}>
                  <div style={{ fontSize: 12, opacity: .7 }}>Percentile</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>Top {100 - percentile}%</div>
                </div>
              )}
            </div>

            {measuredAt && (
              <div style={{ marginTop: 14, fontSize: 14, opacity: 0.7 }}>Measured: {new Date(measuredAt).toLocaleString('en-US', { hour12: false })}</div>
            )}
          </div>

          {/* right: badge ring */}
          <div style={{ position: 'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {/* concentric ring */}
            <div style={{ position:'absolute', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,255,255,0.12), transparent)', boxShadow:`0 0 60px ${theme.glow}` }} />
            <div style={{ position:'absolute', width: 420, height: 420, borderRadius:'50%', border: '1px dashed rgba(255,255,255,0.18)' }} />

            <div style={{
              width: 260,
              height: 260,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `conic-gradient(${theme.primary} ${(score/100)*360}deg, rgba(255,255,255,0.12) 0)`,
              boxShadow: `0 0 50px ${theme.glow}`,
            }}>
              <div style={{
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.55)',
                border: '1px solid rgba(255,255,255,0.16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
                <div style={{ fontSize: 22, opacity: 0.8 }}>Base</div>
                <div style={{ fontSize: 48, fontWeight: 800, marginTop: 4 }}>{tier}</div>
              </div>
            </div>
          </div>
        </div>

        {/* footer url */}
        <div style={{ position: 'absolute', bottom: 24, right: 36, fontSize: 18, opacity: .7 }}>basedrop.xyz</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: inter, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 800, style: 'normal' },
        { name: 'Orbitron', data: orbitron, weight: 600, style: 'normal' },
      ],
    }
  );
}
