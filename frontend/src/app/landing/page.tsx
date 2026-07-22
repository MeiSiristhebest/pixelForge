'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Palette,
  Download,
  Play,
  Star,
  ArrowRight,
  Check,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

const Hero3DScene = dynamic(
  () => import('@/components/Hero3DScene').then((mod) => mod.Hero3DScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-transparent" /> }
);

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const features = [
  { icon: Sparkles, title: 'AI-Powered Engine', desc: 'Describe your character in natural language. Our specialized models generate pixel-perfect sprite sheets instantaneously.', color: 'rgba(168, 85, 247, 0.25)', iconColor: 'text-purple-400' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Get complete sprite sheets in seconds with distributed GPU cluster acceleration.', color: 'rgba(234, 179, 8, 0.25)', iconColor: 'text-yellow-400' },
  { icon: Palette, title: 'Authentic Aesthetics', desc: 'True 16/32 color palettes ensuring your assets maintain true retro gaming fidelity.', color: 'rgba(236, 72, 153, 0.25)', iconColor: 'text-pink-400' },
  { icon: Download, title: 'Engine Ready', desc: 'Download transparent PNGs formatted explicitly for Unity, Godot, and Unreal Engine.', color: 'rgba(34, 197, 94, 0.25)', iconColor: 'text-green-400' },
  { icon: Play, title: 'Real-time Preview', desc: 'See your character animate in real-time before downloading. Tweak prompts and see immediate visual feedback.', color: 'rgba(6, 182, 212, 0.25)', iconColor: 'text-cyan-400' },
  { icon: Star, title: 'Infinite Styles', desc: 'From 8-bit RPGs to modern cyberpunk platformers. Match any aesthetic you desire effortlessly.', color: 'rgba(249, 115, 22, 0.25)', iconColor: 'text-orange-400' },
];

const steps = [
  { num: '01', title: 'Describe', desc: 'Enter a detailed prompt modeling your character' },
  { num: '02', title: 'Generate', desc: 'AI streams multiple unique sprite variations' },
  { num: '03', title: 'Preview', desc: 'Observe real-time animation cycles intuitively' },
  { num: '04', title: 'Export', desc: 'Download ready-to-use engine sprite sheets' },
];

const plans = [
  { name: 'Hobby', price: '$0', desc: 'Perfect for trying out PixelForge', features: ['5 generations/month', 'Basic styles', 'Standard resolution', 'Community support'], cta: 'Get Started', popular: false },
  { name: 'Pro', price: '$19', desc: 'For indie developers and hobbyists', features: ['100 generations/month', 'All styles', 'High resolution', 'Priority generation', 'Email support', 'Commercial license'], cta: 'Start Free Trial', popular: true },
  { name: 'Studio', price: '$89', desc: 'For professional game studios', features: ['Unlimited generations', 'All styles', '4K resolution', 'Instant generation', 'Dedicated support', 'API access', 'Custom training'], cta: 'Contact Sales', popular: false },
];

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-screen bg-[#030305] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none noise-overlay mix-blend-overlay opacity-20" />
      
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#030305]/60 backdrop-blur-2xl border-b border-white/5 supports-[backdrop-filter]:bg-[#030305]/40 text-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">PixelForge</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-white/60 hover:text-white transition-colors">Features</Link>
            <Link href="#how" className="text-white/60 hover:text-white transition-colors">How it Works</Link>
            <Link href="#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-white/60 hover:text-white transition-colors font-medium">Log in</Link>
            <Link
              href="/register"
              className="relative px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-full font-medium transition-transform hover:scale-105"
            >
              Sign up
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center pt-16">
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 aurora-animate mix-blend-screen" />
          <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 aurora-animate mix-blend-screen" style={{ animationDelay: '-5s', animationDuration: '40s' }} />
          <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-pink-600/20 aurora-animate mix-blend-screen" style={{ animationDelay: '-15s', animationDuration: '35s' }} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030305]/50 to-[#030305] pointer-events-none z-0" />

        {/* 3D Scene */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen bg-transparent pointer-events-[none_!important]">
          <Hero3DScene />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex mx-auto items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-xs font-medium text-white/80 tracking-wide uppercase">PixelForge Engine v2.0 Live</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-8 leading-tight sm:leading-tight lg:leading-tight"
          >
            <motion.span variants={fadeInUp} className="block text-white mb-2">Create generation-defining</motion.span>
            <motion.span variants={fadeInUp} className="block gradient-text-shimmer pb-4">pixel art assets.</motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl text-white/50 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Describe your character in plain English to our diffusion model. Get game-ready, perfectly sliced sprite sheets in strictly enforced 16-bit palettes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20 pointer-events-auto"
          >
            <Link href="/register" className="relative p-[1px] group rounded-full overflow-hidden block">
              <span className="absolute inset-0 rounded-full spin-conic-animate bg-[conic-gradient(from_90deg_at_50%_50%,#e2cbff_0%,#393bb2_50%,#e2cbff_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative px-8 py-4 bg-[#030305] rounded-full flex items-center justify-center gap-2 transition-all hover:bg-transparent">
                <span className="font-semibold text-lg text-white">Start Creating Free</span>
                <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-40 px-6 relative z-10 border-t border-white/5 bg-[#030305]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-24">
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
              Features engineered for<br /><span className="text-white/40">modern game development.</span>
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeInUp}>
                <SpotlightCard className="h-full" spotlightColor={f.color}>
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-medium text-white/90 mb-3">{f.title}</h3>
                    <p className="text-white/50 leading-relaxed font-light">{f.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how" className="py-40 px-6 relative z-10 border-t border-white/5 bg-[#050508]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-24">
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
              From text to asset in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">four steps.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div 
                key={s.num} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: '-50px' }} 
                variants={fadeInUp} 
                className="relative group"
              >
                {/* Connecting Line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
                )}
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center mb-6 text-sm font-mono text-white/70 group-hover:text-white group-hover:border-purple-500/50 transition-colors">
                  {s.num}
                </div>
                <h3 className="text-xl font-medium text-white/90 mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 px-6 relative z-10 border-t border-white/5 bg-[#030305]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-24">
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
              Simple pricing.<br /><span className="text-white/40">Scale as you grow.</span>
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((p) => (
              <motion.div key={p.name} variants={fadeInUp}>
                <SpotlightCard 
                  spotlightColor={p.popular ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)'}
                  className={p.popular ? '!border-purple-500/30' : ''}
                >
                  <div className="flex flex-col h-full relative">
                    {p.popular && (
                      <div className="absolute top-0 right-0 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full text-xs font-medium tracking-wide translate-x-4 -translate-y-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-medium text-white/90 mb-2">{p.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                      <span className="text-white/40 text-sm">/month</span>
                    </div>
                    <p className="text-white/50 text-sm mb-8 font-light h-10">{p.desc}</p>
                    <div className="flex-grow space-y-4 mb-10">
                      {p.features.map((f) => (
                        <div key={f} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <span className="text-white/70 text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/register"
                      className={`block w-full py-3 rounded-xl text-center font-medium text-sm transition-all ${
                        p.popular
                          ? 'bg-white text-black hover:bg-gray-100'
                          : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {p.cta}
                    </Link>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#030305] text-sm text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium text-white/60">PixelForge</span>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">Discord</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          </div>
          <div>&copy; 2026 PixelForge. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
