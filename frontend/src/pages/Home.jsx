// import React from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight, Sparkles, Target, Award } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import HeroAnimation from '../components/HeroAnimation';

// const Home = () => {
//   return (
//     <div className="flex flex-col items-center w-full">
//       {/* Hero Section */}
//       <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex flex-col-reverse lg:flex-row items-center gap-16">
//         <div className="flex-1 space-y-8 z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
//               Clean the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-500">World</span>, <br />
//               Earn <span className="text-pink-500 dark:text-pink-400 text-glow">Rewards</span>.
//             </h1>
//             <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
//               Join the AI-powered movement addressing environmental cleanliness. 
//               Verify your cleanups, earn digital coins, and redeem them for exclusive rewards.
//             </p>
//           </motion.div>
          
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="flex flex-wrap gap-4"
//           >
//             <Link to="/upload" className="px-8 py-4 rounded-xl bg-pink-500 hover:bg-pink-600 dark:bg-pink-500 dark:hover:bg-pink-400 text-slate-900 dark:text-white font-bold text-lg shadow-lg dark:shadow-pink-500/20 transition-all flex items-center gap-2 hover:-translate-y-1">
//               Start Earning
//               <ArrowRight size={20} />
//             </Link>
//             <Link to="/join-beta" className="px-8 py-4 rounded-xl border-2 border-slate-200 dark:border-white/10 glass hover:border-pink-500 dark:hover:border-pink-500 font-bold text-lg transition-all flex items-center gap-2 hover:-translate-y-1 text-slate-900 dark:text-white group">
//               Join Beta
//               <Sparkles size={20} className="text-pink-500 group-hover:animate-pulse" />
//             </Link>
//           </motion.div>
//         </div>

//         <motion.div 
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, type: "spring" }}
//           className="flex-1 w-full flex justify-center lg:justify-end xl:mr-10 relative"
//         >
//           {/* Decorative glow behind the animation */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-400/20 dark:bg-pink-500/10 blur-[100px] rounded-full z-[-1]" />
//           <HeroAnimation />
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section className="w-full py-24 bg-white/30 dark:bg-black/20 mt-12 backdrop-blur-md border-y border-black/5 dark:border-white/5 relative overflow-hidden">
//         {/* Subtle patterned background */}
//         <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center mb-16">
//             <motion.h2 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-3xl md:text-5xl font-bold text-slate-950 dark:text-white mb-6"
//             >
//               How it works
//             </motion.h2>
//             <motion.p 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto"
//             >
//               Three simple steps to make a measurable difference and get rewarded for your efforts in maintaining a cleaner environment.
//             </motion.p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { icon: Target, title: "1. Capture & Verify", desc: "Take before and after photos of your cleanup. Our AI verifies authenticity preventing misuse." },
//               { icon: Award, title: "2. Earn Coins", desc: "Get rewarded instantly with Eco-Coins for your verified positive real-world actions." },
//               { icon: Sparkles, title: "3. Redeem Rewards", desc: "Use your hard-earned coins for exclusive discounts and perks from eco-friendly partners." }
//             ].map((feature, idx) => (
//               <motion.div 
//                 key={idx}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.2 }}
//                 className="glass p-10 rounded-3xl relative overflow-hidden group hover:-translate-y-3 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10"
//               >
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-indigo-500 flex items-center justify-center mb-8 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
//                   <feature.icon size={32} />
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">{feature.title}</h3>
//                 <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.desc}</p>
                
//                 {/* Decorative background element */}
//                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;







import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Award, Shield, Globe, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroAnimation from '../components/HeroAnimation';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">

      {/* ========== HERO ========== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 flex flex-col-reverse lg:flex-row items-center gap-20">

        <div className="flex-1 space-y-8 z-10">
          {/* Badge */}
          <motion.div {...fadeUp(0)}>
            <span className="eco-badge">
              <Zap size={11} />
              AI-Powered Eco Rewards Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div {...fadeUp(0.1)}>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-100 leading-[1.08]">
              Heal the{' '}
              <span className="relative inline-block">
                <span className="text-eco-gradient" style={{
                  background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #0d9488 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Planet.
                </span>
                <motion.div
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                  className="absolute -bottom-1 left-0 right-0 h-px origin-left"
                  style={{ background: 'linear-gradient(90deg, #10b981, transparent)' }}
                />
              </span>
              <br />
              Earn{' '}
              <span className="text-gold-gradient" style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Rewards.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
              Join the AI-powered movement rewarding environmental action. Verify your cleanups,
              earn tokens, and redeem them for exclusive partner rewards.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.2)} className="flex items-center gap-8">
            {[
              { value: '12K+', label: 'Active users' },
              { value: '85K kg', label: 'Waste removed' },
              { value: '4.1K', label: 'Areas cleaned' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-xl font-bold text-emerald-400">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4">
            <Link to="/upload" className="btn-eco-primary text-base px-8 py-4">
              Start Earning
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/join-beta"
              className="btn-eco-ghost text-base px-8 py-4"
            >
              <Sparkles size={16} />
              Join Beta
            </Link>
          </motion.div>
        </div>

        {/* Hero Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="flex-1 w-full flex justify-center lg:justify-end relative"
        >
          {/* Ambient glow behind */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(16,185,129,0.12) 0%, transparent 65%)',
              filter: 'blur(20px)',
            }}
          />
          <HeroAnimation />
        </motion.div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="w-full py-24 relative overflow-hidden">
        {/* Section divider */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.2), transparent)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4"
            >
              <span className="eco-badge">How it works</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-100">
                Three steps to{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #34d399, #10b981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  real impact
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                Every verified cleanup action earns you digital rewards. Simple, transparent, and measurable.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                number: '01',
                title: "Capture & Verify",
                desc: "Take before and after photos of your cleanup. Our AI verifies authenticity, preventing fraud and ensuring genuine impact.",
                color: '#0ea5e9',
                glowColor: 'rgba(14,165,233,0.15)',
              },
              {
                icon: Award,
                number: '02',
                title: "Earn Rewards",
                desc: "Get rewarded instantly with tokens for every verified positive environmental action you complete.",
                color: '#10b981',
                glowColor: 'rgba(16,185,129,0.15)',
                featured: true,
              },
              {
                icon: Sparkles,
                number: '03',
                title: "Redeem Rewards",
                desc: "Use your hard-earned coins for exclusive discounts and perks from eco-conscious partner brands.",
                color: '#f59e0b',
                glowColor: 'rgba(245,158,11,0.12)',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.4, 0, 0.2, 1] }}
                className={`relative rounded-2xl p-8 overflow-hidden group cursor-pointer ${feature.featured ? 'ring-1 ring-emerald-500/30' : ''}`}
                style={{
                  background: feature.featured
                    ? 'rgba(6,78,59,0.2)'
                    : 'rgba(1,18,8,0.6)',
                  border: `1px solid ${feature.featured ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.1)'}`,
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.4s ease',
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Background glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 50%, ${feature.glowColor} 0%, transparent 70%)` }}
                />

                {/* Number watermark */}
                <div className="absolute top-4 right-6 text-6xl font-black opacity-[0.04] text-slate-100 select-none">
                  {feature.number}
                </div>

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `${feature.glowColor}`,
                    border: `1px solid ${feature.color}30`,
                  }}
                >
                  <feature.icon size={26} style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>

                {/* Arrow on hover */}
                <div className="mt-6 flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0"
                  style={{ color: feature.color }}
                >
                  Learn more <ChevronRight size={14} />
                </div>

                {/* Top line accent */}
                {feature.featured && (
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent)' }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.15), transparent)' }}
        />
      </section>

      {/* ========== TRUST SECTION ========== */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-10 md:p-16 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(6,78,59,0.15) 0%, rgba(2,40,24,0.4) 50%, rgba(13,148,136,0.1) 100%)',
              border: '1px solid rgba(16,185,129,0.15)',
            }}
          >
            {/* Ambient */}
            <div className="absolute top-0 right-0 w-80 h-80 opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(16,185,129,0.4) 0%, transparent 60%)' }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-4 max-w-lg">
                <span className="eco-badge"><Shield size={11} /> Trusted & Verified</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
                  Technology healing the planet, one cleanup at a time.
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Our AI verification system ensures every coin earned represents a genuine environmental action.
                  No shortcuts, no fraud — just real impact.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-w-[200px]">
                {[
                  { icon: Shield, label: 'AI-verified actions', color: '#10b981' },
                  { icon: Globe, label: 'Global impact tracking', color: '#0ea5e9' },
                  { icon: Award, label: 'Real partner rewards', color: '#f59e0b' },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                    >
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span className="text-sm text-slate-300">{label}</span>
                  </div>
                ))}
                <Link to="/upload" className="btn-eco-primary mt-4 justify-center">
                  Start Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;