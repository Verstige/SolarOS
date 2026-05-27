'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Zap, BarChart3, Users, Megaphone, Shield, Calendar, ArrowRight, CheckCircle2, Sun, ChevronRight, Play, Star, Menu, X, Clock, DollarSign, Wrench } from 'lucide-react';

const SOLAR = {
  primary: '#FF6B00',
  secondary: '#00D4AA',
  accent: '#FFD60A',
  bg: '#000000',
  surface: '#0A0A0F',
  surface2: '#111118',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.14)',
  muted: '#8E8E93',
  text: '#FFFFFF',
  success: '#30D158',
  warning: '#FF9F0A',
};

const FEATURES = [
  { icon: Zap, title: 'AI-Powered Proposals', desc: 'Generate professional solar proposals in under 2 hours. AI analyzes roof specs, energy usage, and local utility rates to build compelling quotes that close deals.', color: SOLAR.primary },
  { icon: BarChart3, title: 'Visual Pipeline', desc: 'Track every project from lead to activation. Drag-and-drop kanban board with real-time status, priority flags, and milestone tracking.', color: SOLAR.secondary },
  { icon: Users, title: 'Team Management', desc: 'Onboard installers, electricians, and sales reps with structured workflows. Training modules, certifications, and performance metrics in one place.', color: '#BF5FFF' },
  { icon: Megaphone, title: 'Social Hub', desc: 'Manage Facebook, Instagram, LinkedIn, and YouTube from one dashboard. Schedule posts, track ad performance, and generate AI-powered content.', color: '#FF2D55' },
  { icon: Calendar, title: 'Smart Scheduling', desc: 'Auto-schedule installations based on crew availability, permits, and weather windows. Never double-book or miss a deadline.', color: '#5856D6' },
  { icon: Shield, title: 'Permit Automation', desc: 'Automated permit preparation and submission. Track inspection status and receive alerts when docs are approved or rejected.', color: SOLAR.warning },
];

const MODULES = [
  { label: 'AI Proposals', path: '/dashboard', color: SOLAR.primary, badge: 'AI-Powered' },
  { label: 'Pipeline', path: '/dashboard/pipeline', color: SOLAR.secondary, badge: null },
  { label: 'Social Hub', path: '/dashboard/social', color: '#FF2D55', badge: null },
  { label: 'Team', path: '/dashboard/employees', color: '#BF5FFF', badge: null },
  { label: 'Scheduling', path: '/dashboard', color: '#5856D6', badge: null },
  { label: 'Permits', path: '/dashboard', color: SOLAR.warning, badge: 'Auto' },
];

const TESTIMONIALS = [
  { name: 'David R.', role: 'Owner, Tampa Solar Co.', content: 'We cut our proposal time from 3 days to 4 hours. The AI does the heavy lifting on roof calculations and financing scenarios.', rating: 5 },
  { name: 'Maria L.', role: 'Operations Director, SunVolt FL', content: 'Managing 12 crews used to be chaos. SolarOS gave us clarity. We know exactly where every job stands every morning.', rating: 5 },
  { name: 'James T.', role: 'Sales Manager, Skyline Energy', content: 'The social calendar alone saves us 6 hours a week. Our Instagram engagement is up 40% since we started using the AI content suggestions.', rating: 5 },
];

const PRICING = [
  { name: 'Starter', price: '299', desc: 'For small solar companies getting started', features: ['1 User', '50 Proposals/mo', 'Pipeline Tracking', 'Email Support'], color: SOLAR.muted },
  { name: 'Growth', price: '599', desc: 'For growing teams that need more power', features: ['5 Users', 'Unlimited Proposals', 'Social Hub', 'Team Management', 'Priority Support'], color: SOLAR.primary, popular: true },
  { name: 'Scale', price: '999', desc: 'For established companies at scale', features: ['15 Users', 'Everything in Growth', 'Permit Automation', 'Google Workspace', 'Dedicated Account Manager'], color: SOLAR.secondary },
  { name: 'Enterprise', price: '2,000+', desc: 'Custom solution for large operations', features: ['Unlimited Users', 'White-Label Options', 'Custom Integrations', 'SLA & Onboarding', 'API Access'], color: SOLAR.accent },
];

const STATS = [
  { value: '2hrs', label: 'Avg. proposal time (was 3 days)' },
  { value: '40%', label: 'More installs per quarter' },
  { value: '6hrs', label: 'Saved per week on social' },
  { value: '52%', label: 'Faster permitting cycles' },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4" style={{ background: 'rgba(0,0,0,0.9)', borderBottom: `1px solid ${SOLAR.border}` }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${SOLAR.primary}, ${SOLAR.accent})` }}>
            <Sun size={18} style={{ color: '#000' }} />
          </div>
          <span className="font-bold text-lg">SolarOS</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Modules', 'Pricing', 'Testimonials'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm" style={{ color: SOLAR.muted }}>{item}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="/dashboard" className="text-sm px-4 py-2 rounded-xl" style={{ color: SOLAR.muted }}>Sign In</a>
          <a href="/dashboard" className="text-sm font-semibold px-5 py-2.5 rounded-xl" style={{ background: SOLAR.primary, color: '#000' }}>Get Started Free</a>
        </div>
        <button className="md:hidden w-9 h-9 flex items-center justify-center" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden pt-4 pb-2 space-y-2">
          {['Features', 'Modules', 'Pricing', 'Testimonials'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm py-2" style={{ color: SOLAR.muted }} onClick={() => setOpen(false)}>{item}</a>
          ))}
          <a href="/dashboard" className="block text-sm font-semibold py-2" style={{ color: SOLAR.primary }}>Get Started Free</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,0,0.12) 0%, transparent 60%)' }} />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10" style={{ background: SOLAR.primary }} />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8" style={{ background: `${SOLAR.primary}15`, border: `1px solid ${SOLAR.primary}30`, color: SOLAR.primary }}>
            <Zap size={12} /> Now deployed to regional solar companies across Florida
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight" style={{ color: SOLAR.text }}>
            The Operating System<br />
            <span style={{ color: SOLAR.primary }}>For Solar Companies</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto" style={{ color: SOLAR.muted }}>
            AI-powered proposals. Visual pipeline. Social automation. Team management. Everything in one place — built for companies doing $500K to $50M in annual solar volume.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/dashboard" className="flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold" style={{ background: SOLAR.primary, color: '#000' }}>
              Launch App Free <ArrowRight size={18} />
            </a>
            <a href="#features" className="flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-medium" style={{ border: `1px solid ${SOLAR.border}`, color: SOLAR.muted }}>
              <Play size={16} /> See How It Works
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-16">
          <div className="rounded-3xl overflow-hidden" style={{ border: `1px solid ${SOLAR.border}`, boxShadow: `0 0 80px rgba(255,107,0,0.15)` }}>
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: SOLAR.surface, borderBottom: `1px solid ${SOLAR.border}` }}>
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} /><div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} /><div className="w-3 h-3 rounded-full" style={{ background: '#28CA41' }} /></div>
              <div className="flex-1 text-center text-xs" style={{ color: SOLAR.muted }}>solaros.app / dashboard</div>
            </div>
            <div style={{ background: SOLAR.bg, height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="text-center">
                <div className="text-6xl mb-4"><Sun size={64} style={{ color: SOLAR.primary }} /></div>
                <div className="text-2xl font-bold mb-2">Command Center</div>
                <div className="text-sm" style={{ color: SOLAR.muted }}>Pipeline · Proposals · Social · Team · Permits</div>
                <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: `${SOLAR.primary}20`, color: SOLAR.primary }}>
                  <ArrowRight size={14} /> Open Dashboard
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-20 px-6" style={{ borderTop: `1px solid ${SOLAR.border}`, borderBottom: `1px solid ${SOLAR.border}` }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-4xl font-bold mb-1" style={{ color: SOLAR.primary }}>{stat.value}</div>
              <div className="text-sm" style={{ color: SOLAR.muted }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: SOLAR.primary }}>Platform Capabilities</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Everything your team needs</h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: SOLAR.muted }}>Stop juggling 7 different tools. SolarOS brings proposals, pipeline, social, and team management into one coherent operating system.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}18` }}>
                <f.icon size={22} style={{ color: f.color }} />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: SOLAR.muted }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section id="modules" className="py-24 px-6" style={{ background: SOLAR.surface }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: SOLAR.secondary }}>Platform Modules</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">One platform. Every workflow.</h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: SOLAR.muted }}>SolarOS connects your proposals, pipeline, crew, and social presence into one unified command center.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MODULES.map((m, i) => (
            <motion.a key={m.label} href={m.path} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="relative rounded-2xl p-6 group cursor-pointer" style={{ background: SOLAR.bg, border: `1px solid ${SOLAR.border}` }}>
              {m.badge && <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase" style={{ background: `${m.color}20`, color: m.color }}>{m.badge}</span>}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${m.color}18` }}>
                <div className="w-4 h-4 rounded-sm" style={{ background: m.color }} />
              </div>
              <div className="font-semibold mb-1">{m.label}</div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={16} style={{ color: m.color }} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: SOLAR.accent }}>Customer Stories</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Trusted by solar companies</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} style={{ color: SOLAR.accent }} fill={SOLAR.accent} />)}
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: SOLAR.text }}>"{t.content}"</p>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs" style={{ color: SOLAR.muted }}>{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6" style={{ background: SOLAR.surface }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: SOLAR.primary }}>Simple Pricing</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Start free. Scale as you grow.</h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: SOLAR.muted }}>No per-seat gotchas. No hidden fees. Just a platform that grows with your business.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRICING.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl p-6" style={{ background: p.popular ? `${p.color}10` : SOLAR.bg, border: `1px solid ${p.popular ? p.color + '40' : SOLAR.border}` }}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full uppercase" style={{ background: p.color, color: '#000' }}>Most Popular</div>}
              <div className="text-sm font-semibold mb-1" style={{ color: p.color }}>{p.name}</div>
              <div className="text-3xl font-bold mb-1">${p.price}<span className="text-sm font-normal" style={{ color: SOLAR.muted }}>/mo</span></div>
              <div className="text-xs mb-5" style={{ color: SOLAR.muted }}>{p.desc}</div>
              <div className="space-y-2 mb-6">
                {p.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs" style={{ color: SOLAR.muted }}>
                    <CheckCircle2 size={13} style={{ color: p.color }} />{f}
                  </div>
                ))}
              </div>
              <a href="/dashboard" className="block text-center text-sm font-semibold py-2.5 rounded-xl" style={{ background: p.popular ? p.color : `${p.color}20`, color: p.popular ? '#000' : p.color }}>
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 70% at 50% 100%, rgba(255,107,0,0.1) 0%, transparent 60%)` }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to run your solar company like a pro?</h2>
        <p className="text-xl mb-10" style={{ color: SOLAR.muted }}>Join solar companies across Florida that are closing more deals, installing faster, and spending less time on admin.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/dashboard" className="flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold" style={{ background: SOLAR.primary, color: '#000' }}>
            Start Free Trial <ArrowRight size={18} />
          </a>
          <div className="flex items-center gap-2 text-sm" style={{ color: SOLAR.muted }}>
            <Clock size={14} />No credit card required
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-12" style={{ borderTop: `1px solid ${SOLAR.border}` }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sun size={16} style={{ color: SOLAR.primary }} />
          <span className="font-bold text-sm">SolarOS</span>
          <span className="text-xs" style={{ color: SOLAR.muted }}>The Operating System for Solar Companies</span>
        </div>
        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Contact'].map(item => (
            <a key={item} href="#" className="text-xs" style={{ color: SOLAR.muted }}>{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div style={{ background: SOLAR.bg, color: SOLAR.text }}>
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Modules />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}