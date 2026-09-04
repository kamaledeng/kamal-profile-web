import { useEffect, useRef, useState } from 'react'
import { Globe, Terminal, Wallet, Rocket, Code2, BarChart3, Shield } from 'lucide-react'
import { TwitterIcon, GithubIcon, SendIcon } from './icons'
import './index.css'

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#interests', label: 'Interests' },
  { href: '#projects', label: 'Projects' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#contact', label: 'Contact' },
]

const INTERESTS = [
  { icon: Terminal, title: 'NFT Mint', desc: 'Free & gas-optimized mints on Robinhood Chain.' },
  { icon: Wallet, title: 'Crypto', desc: 'On-chain ops, RPC debugging, wallet hygiene.' },
  { icon: BarChart3, title: 'Airdrop Farming', desc: 'Early project research and eligibility tracking.' },
  { icon: Code2, title: 'Automation', desc: 'Telegram bots, cronjobs, VPS scripts.' },
  { icon: Shield, title: 'Security', desc: 'Burner wallets, local signing, scam checks.' },
  { icon: Rocket, title: 'Deploy', desc: 'GitHub + Vercel auto deploy pipelines.' },
]

const PROJECTS = [
  { name: 'test-hermes-app', tech: 'Vite + React', status: 'Live', link: 'https://github.com/kamaledeng/test-hermes-app' },
  { name: 'kamal-profile-web', tech: 'Vite + React', status: 'Live', link: 'https://github.com/kamaledeng/kamal-profile-web' },
  { name: 'NFT Auto Mint', tech: 'Node + RPC', status: 'In progress', link: '#' },
  { name: 'Telegram Bots', tech: 'Python/Node', status: 'Active', link: '#' },
]

const TIMELINE = [
  { date: '2026-09', title: 'Auto Deploy Setup', desc: 'Repo → Vercel connected, CI ready.' },
  { date: '2026-09', title: 'NFT Mint Automation', desc: 'nftctl.cjs workflow + gas tuning.' },
  { date: '2026-09', title: 'Profile Site', desc: 'Personal brand launched.' },
]

function GlowOrb() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      el.style.transform = `translate(${x * 40 - 20}px, ${y * 40 - 20}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return <div ref={ref} style={styles.orb} />
}

function ProjectCard({ project }) {
  return (
    <a href={project.link} target="_blank" rel="noreferrer" className="glass" style={styles.projectCard}>
      <div style={styles.projectHeader}>
        <div>
          <h3 style={styles.projectName}>{project.name}</h3>
          <p style={styles.projectTech}>{project.tech}</p>
        </div>
        <span style={{
          ...styles.badge,
          background: project.status === 'Live' ? 'rgba(16,185,129,0.15)' : 'rgba(250,204,21,0.15)',
          color: project.status === 'Live' ? '#34d399' : '#facc15',
        }}>{project.status}</span>
      </div>
    </a>
  )
}

function TimelineItem({ item }) {
  return (
    <div className="glass" style={styles.timelineItem}>
      <div style={styles.timelineDate}>{item.date}</div>
      <div>
        <h3 style={styles.timelineTitle}>{item.title}</h3>
        <p style={styles.timelineDesc}>{item.desc}</p>
      </div>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 style={styles.sectionTitle}>{title}</h2>
        {children}
      </div>
    </section>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t) }, [])

  return (
    <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      <nav style={styles.nav}>
        <div className="container" style={styles.navInner}>
          <a href="#" style={styles.logo}>K</a>
          <div style={styles.navLinks}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} style={styles.navLink}>{n.label}</a>
            ))}
          </div>
        </div>
      </nav>

      <header style={styles.hero}>
        <GlowOrb />
        <div className="container" style={styles.heroInner}>
          <div style={styles.heroBadge}>Web3 Builder</div>
          <h1 style={styles.heroTitle}>Kamal</h1>
          <p style={styles.heroSub}>Building tools, mints, automations, and deploy pipelines.</p>
          <div style={styles.heroActions}>
            <a href="#projects" style={styles.primaryButton}>View Projects</a>
            <a href="#contact" style={styles.secondaryButton}>Get in Touch</a>
          </div>
        </div>
      </header>

      <Section id="about" title="About">
        <div className="glass" style={styles.aboutCard}>
          <p style={styles.aboutText}>
            Builder focused on practical crypto tooling: NFT mint automations, Telegram bots, VPS hardening,
            and shipping small products fast. I care more about working systems than hype.
          </p>
        </div>
      </Section>

      <Section id="interests" title="Interests">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {INTERESTS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass" style={styles.interestCard}>
              <Icon size={22} color="#94a3b8" />
              <h3 style={styles.interestTitle}>{title}</h3>
              <p style={styles.interestDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {PROJECTS.map((p) => <ProjectCard key={p.name} project={p} />)}
        </div>
      </Section>

      <Section id="timeline" title="Timeline">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TIMELINE.map((t) => <TimelineItem key={t.date + t.title} item={t} />)}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <div className="glass" style={styles.contactCard}>
          <p style={styles.contactText}>Reach out or follow the build.</p>
          <div style={styles.socialRow}>
            <a href="https://x.com/direumatteul" target="_blank" rel="noreferrer" style={styles.socialButton}><TwitterIcon /> Twitter</a>
            <a href="https://github.com/kamaledeng" target="_blank" rel="noreferrer" style={styles.socialButton}><GithubIcon /> GitHub</a>
            <a href="https://t.me/direumatteul" target="_blank" rel="noreferrer" style={styles.socialButton}><SendIcon /> Telegram</a>
            <a href="https://direumatteul.me" target="_blank" rel="noreferrer" style={styles.socialButton}><Globe size={18} /> Website</a>
          </div>
        </div>
      </Section>

      <footer style={styles.footer}>
        <div className="container" style={styles.footerInner}>
          <p style={styles.footerText}>© {new Date().getFullYear()} Kamal. Built with Vite + React.</p>
        </div>
      </footer>
    </div>
  )
}

const styles = {
  nav: { position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,15,0.7)', backdropFilter: 'blur(12px)' },
  navInner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 },
  logo: { fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', background: 'linear-gradient(135deg,#22d3ee,#818cf8)', WebkitBackgroundClip: 'text', color: 'transparent' },
  navLinks: { display: 'flex', gap: 18 },
  navLink: { fontSize: 14, color: '#94a3b8', transition: 'color 0.2s' },
  hero: { position: 'relative', overflow: 'hidden', padding: '120px 0 100px' },
  heroInner: { position: 'relative', zIndex: 2 },
  heroBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 999, background: 'rgba(34,211,238,0.1)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.25)', fontSize: 12, fontWeight: 600, marginBottom: 18 },
  heroTitle: { fontSize: 'clamp(40px, 8vw, 76px)', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(180deg,#ffffff,#94a3b8)', WebkitBackgroundClip: 'text', color: 'transparent' },
  heroSub: { marginTop: 16, fontSize: 'clamp(14px, 2.2vw, 18px)', color: '#94a3b8', maxWidth: 520 },
  heroActions: { marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' },
  primaryButton: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 18px', borderRadius: 12, background: '#ffffff', color: '#0a0a0f', fontWeight: 600, fontSize: 14, transition: 'transform 0.15s ease, box-shadow 0.2s ease', boxShadow: '0 10px 30px rgba(255,255,255,0.08)' },
  secondaryButton: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#e2e8f0', fontWeight: 600, fontSize: 14, transition: 'transform 0.15s ease' },
  sectionTitle: { fontSize: 26, fontWeight: 700, marginBottom: 22, color: '#ffffff' },
  aboutCard: { padding: 24 },
  aboutText: { fontSize: 16, color: '#cbd5e1' },
  interestCard: { padding: 18 },
  interestTitle: { marginTop: 10, fontSize: 16, fontWeight: 600, color: '#f1f5f9' },
  interestDesc: { marginTop: 6, fontSize: 13, color: '#94a3b8' },
  projectCard: { padding: 18 },
  projectHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  projectName: { fontSize: 16, fontWeight: 600, color: '#f1f5f9' },
  projectTech: { marginTop: 4, fontSize: 12, color: '#94a3b8' },
  badge: { fontSize: 12, padding: '4px 10px', borderRadius: 999, fontWeight: 600, whiteSpace: 'nowrap' },
  timelineItem: { display: 'flex', gap: 14, alignItems: 'flex-start', padding: 16 },
  timelineDate: { fontSize: 12, color: '#22d3ee', fontWeight: 600, minWidth: 72, paddingTop: 2 },
  timelineTitle: { fontSize: 15, fontWeight: 600, color: '#f1f5f9' },
  timelineDesc: { marginTop: 4, fontSize: 13, color: '#94a3b8' },
  contactCard: { padding: 24, textAlign: 'center' },
  contactText: { color: '#cbd5e1', marginBottom: 16 },
  socialRow: { display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' },
  socialButton: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#e2e8f0', fontSize: 13, fontWeight: 600, transition: 'transform 0.15s ease, background 0.2s ease' },
  footer: { borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 0' },
  footerInner: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  footerText: { fontSize: 13, color: '#64748b' },
  orb: { position: 'absolute', top: -80, left: 10, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.22), rgba(129,140,248,0.12), transparent 70%)', filter: 'blur(40px)', zIndex: 1, pointerEvents: 'none' },
}

export default App
