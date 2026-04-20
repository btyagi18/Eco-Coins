// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Camera, UploadCloud, Cpu, CheckCircle, Coins, Leaf, Trash2 } from 'lucide-react';

// export default function HeroAnimation() {
//   const [step, setStep] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStep((prev) => (prev + 1) % 4);
//     }, 3000); // Rotate every 3 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const steps = [
//     {
//       id: 0,
//       title: "1. Capture",
//       icon: <Camera size={56} className="text-blue-500 drop-shadow-md" />,
//       subIcon: <Trash2 size={28} className="text-slate-400 absolute -bottom-3 -right-3" />,
//       color: "bg-blue-500/10 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]",
//       desc: "Locate and photograph environmental waste."
//     },
//     {
//       id: 1,
//       title: "2. Upload",
//       icon: <UploadCloud size={56} className="text-purple-500 drop-shadow-md" />,
//       subIcon: (
//         <motion.div 
//           animate={{ y: [0, -20], opacity: [1, 0] }} 
//           transition={{ repeat: Infinity, duration: 1.5 }} 
//           className="absolute -top-6"
//         >
//           <UploadCloud size={20} className="text-purple-400" />
//         </motion.div>
//       ),
//       color: "bg-purple-500/10 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]",
//       desc: "Submit your photo to the Clean2Earn network."
//     },
//     {
//       id: 2,
//       title: "3. AI Verify",
//       icon: <Cpu size={56} className="text-cyan-500 drop-shadow-md" />,
//       subIcon: (
//         <motion.div
//            initial={{ scale: 0 }}
//            animate={{ scale: 1 }}
//            transition={{ delay: 0.5, type: 'spring' }}
//         >
//            <CheckCircle size={28} className="text-emerald-500 absolute -bottom-3 -right-3 bg-white dark:bg-slate-900 rounded-full" />
//         </motion.div>
//       ),
//       color: "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]",
//       desc: "Our AI verifies the cleanup authenticity."
//     },
//     {
//       id: 3,
//       title: "4. Earn Coins",
//       icon: <Coins size={64} className="text-amber-500 drop-shadow-lg" />,
//       subIcon: (
//         <motion.div 
//           animate={{ y: [0, -30], opacity: [1, 0] }} 
//           transition={{ repeat: Infinity, duration: 1.5 }} 
//           className="absolute -top-6 text-emerald-500 font-extrabold text-xl"
//         >
//           +50
//         </motion.div>
//       ),
//       color: "bg-amber-500/10 border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.4)]",
//       desc: "Receive rewards directly to your wallet."
//     }
//   ];

//   return (
//     <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center mx-auto">
//       {/* Background Decorative Rings Removed per user request */}

//       {/* Main Device Mockup (Phone style) */}
//       <div className="relative z-10 w-[280px] h-[560px] glass rounded-[3rem] border-4 border-slate-200/50 dark:border-slate-800/80 shadow-2xl flex flex-col items-center p-6 overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl">
//         {/* Dynamic Notch */}
//         <div className="w-32 h-7 bg-slate-300/80 dark:bg-slate-950/80 rounded-b-xl absolute top-0 shadow-inner" />

//         <div className="flex-1 w-full flex flex-col items-center justify-center mt-6 relative">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={step}
//               initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
//               animate={{ opacity: 1, scale: 1, rotate: 0 }}
//               exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
//               transition={{ type: "spring", stiffness: 300, damping: 25 }}
//               className={`w-44 h-44 rounded-[2rem] flex items-center justify-center relative border-2 ${steps[step].color} bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-xl transition-colors duration-500`}
//             >
//               {steps[step].icon}
//               {steps[step].subIcon}
//             </motion.div>
//           </AnimatePresence>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`text-${step}`}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -15 }}
//               transition={{ duration: 0.3 }}
//               className="mt-10 text-center"
//             >
//               <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">{steps[step].title}</h3>
//               <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 px-2 leading-relaxed">
//                 {steps[step].desc}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         </div>
        
//         {/* Progress indicators bottom */}
//         <div className="flex gap-3 mb-6 mt-4 bg-black/5 dark:bg-white/5 py-2 px-4 rounded-full">
//           {[0, 1, 2, 3].map((i) => (
//             <motion.div 
//               key={i}
//               className={`w-2.5 h-2.5 rounded-full ${i === step ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-slate-300 dark:bg-slate-700'}`}
//               animate={{ scale: i === step ? 1.4 : 1 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             />
//           ))}
//         </div>
//         <div className="w-1/3 h-1.5 bg-slate-300 dark:bg-slate-800 rounded-full mb-2" />
//       </div>
      
//       {/* Floating decorative elements around the phone */}
//       <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-6 top-1/4 glass p-4 rounded-2xl border border-emerald-500/30 shadow-lg z-20 hidden md:block">
//         <Leaf className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" size={36} />
//       </motion.div>
//       <motion.div animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -right-6 bottom-1/4 glass p-4 rounded-2xl border border-amber-500/30 shadow-lg z-20 hidden md:block">
//         <Coins className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" size={36} />
//       </motion.div>
//     </div>
//   );
// }







import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, UploadCloud, Cpu, CheckCircle, Coins, Leaf, Trash2 } from 'lucide-react';

export default function HeroAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 0,
      title: "Capture",
      subtitle: "Photograph environmental waste",
      icon: Camera,
      iconColor: '#0ea5e9',
      glowColor: 'rgba(14,165,233,0.3)',
      bgColor: 'rgba(14,165,233,0.08)',
      borderColor: 'rgba(14,165,233,0.25)',
      tag: 'STEP 01',
    },
    {
      id: 1,
      title: "Upload",
      subtitle: "Submit to the Clean2Earn network",
      icon: UploadCloud,
      iconColor: '#10b981',
      glowColor: 'rgba(16,185,129,0.35)',
      bgColor: 'rgba(16,185,129,0.08)',
      borderColor: 'rgba(16,185,129,0.25)',
      tag: 'STEP 02',
    },
    {
      id: 2,
      title: "AI Verify",
      subtitle: "Authenticity confirmed by AI",
      icon: Cpu,
      iconColor: '#34d399',
      glowColor: 'rgba(52,211,153,0.3)',
      bgColor: 'rgba(52,211,153,0.08)',
      borderColor: 'rgba(52,211,153,0.25)',
      tag: 'STEP 03',
    },
    {
      id: 3,
      title: "Earn Coins",
      subtitle: "Receive rewards instantly",
      icon: Coins,
      iconColor: '#f59e0b',
      glowColor: 'rgba(245,158,11,0.35)',
      bgColor: 'rgba(245,158,11,0.08)',
      borderColor: 'rgba(245,158,11,0.25)',
      tag: 'STEP 04',
    }
  ];

  const current = steps[step];

  return (
    <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center mx-auto">
      
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full"
        style={{ border: '1px solid rgba(16,185,129,0.08)' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[75%] h-[75%] rounded-full"
        style={{ border: '1px dashed rgba(52,211,153,0.1)' }}
      />

      {/* Orbiting dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[65%] h-[65%]"
        style={{ transformOrigin: '50% 50%' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{ background: '#34d399', boxShadow: '0 0 12px rgba(52,211,153,0.8)' }}
        />
      </motion.div>

      {/* Phone mockup */}
      <div
        className="relative z-10 w-[240px] h-[480px] rounded-[2.5rem] flex flex-col items-center overflow-hidden"
        style={{
          background: 'rgba(1,18,8,0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(16,185,129,0.2)',
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${current.glowColor}, inset 0 1px 0 rgba(255,255,255,0.06)`,
          transition: 'box-shadow 0.7s ease',
        }}
      >
        {/* Dynamic notch */}
        <div className="w-24 h-6 rounded-b-2xl mt-0 flex-shrink-0"
          style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(16,185,129,0.1)', borderTop: 'none' }}
        />

        {/* Screen content */}
        <div className="flex-1 w-full flex flex-col items-center justify-center px-5 py-4">
          
          {/* Status bar */}
          <div className="w-full flex items-center justify-between mb-6 px-1">
            <div className="eco-badge" style={{ fontSize: '9px', padding: '2px 6px', letterSpacing: '0.05em' }}>
              {current.tag}
            </div>
            <div className="flex gap-1">
              {[1,2,3].map(i => (
                <div key={i} className="w-1 h-1 rounded-full" style={{ background: i <= 2 ? '#10b981' : 'rgba(16,185,129,0.3)' }} />
              ))}
            </div>
          </div>

          {/* Main icon */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative w-28 h-28 rounded-3xl flex items-center justify-center mb-6"
              style={{
                background: current.bgColor,
                border: `1px solid ${current.borderColor}`,
                boxShadow: `0 0 40px ${current.glowColor}`,
              }}
            >
              {step === 1 && (
                <motion.div
                  animate={{ y: [0, -24], opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="absolute -top-5 left-1/2 -translate-x-1/2"
                >
                  <UploadCloud size={14} style={{ color: current.iconColor }} />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  animate={{ y: [0, -28], opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 font-bold text-sm"
                  style={{ color: current.iconColor }}
                >
                  +50
                </motion.div>
              )}
              <current.icon size={44} style={{ color: current.iconColor, filter: `drop-shadow(0 0 12px ${current.glowColor})` }} />
              {step === 2 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: '#022818', border: '1px solid rgba(52,211,153,0.4)' }}
                >
                  <CheckCircle size={14} style={{ color: '#34d399' }} />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${step}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="text-lg font-bold text-slate-100 tracking-tight">{current.title}</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed px-2">{current.subtitle}</p>
            </motion.div>
          </AnimatePresence>

          {/* Scan animation for step 2 */}
          {step === 2 && (
            <motion.div
              animate={{ y: [-60, 60] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse', ease: 'easeInOut' }}
              className="absolute left-8 right-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.8), transparent)', boxShadow: '0 0 8px rgba(52,211,153,0.6)' }}
            />
          )}
        </div>

        {/* Step dots */}
        <div className="flex gap-2 mb-5 px-3 py-2 rounded-full"
          style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.1)' }}
        >
          {[0,1,2,3].map(i => (
            <motion.div
              key={i}
              animate={{ scale: i === step ? 1.4 : 1, opacity: i === step ? 1 : 0.35 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: i === step ? current.iconColor : 'rgba(110,231,183,0.4)' }}
            />
          ))}
        </div>

        {/* Home bar */}
        <div className="w-20 h-1 rounded-full mb-3 opacity-30"
          style={{ background: '#34d399' }}
        />
      </div>

      {/* Floating decorative cards */}
      <motion.div
        animate={{ y: [-12, 12, -12], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-8 top-1/4 z-20 hidden lg:flex items-center gap-2.5 px-4 py-3 rounded-2xl"
        style={{
          background: 'rgba(1,18,8,0.9)',
          border: '1px solid rgba(16,185,129,0.25)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(16,185,129,0.15)',
        }}
      >
        <Leaf size={20} style={{ color: '#34d399', filter: 'drop-shadow(0 0 8px rgba(52,211,153,0.6))' }} />
        <div>
          <div className="text-xs font-semibold text-slate-200">Cleanup</div>
          <div className="text-xs text-emerald-400">Verified ✓</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [12, -12, 12], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -right-8 bottom-1/4 z-20 hidden lg:flex items-center gap-2.5 px-4 py-3 rounded-2xl"
        style={{
          background: 'rgba(1,18,8,0.9)',
          border: '1px solid rgba(245,158,11,0.25)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(245,158,11,0.12)',
        }}
      >
        <Coins size={20} style={{ color: '#f59e0b', filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.6))' }} />
        <div>
          <div className="text-xs font-semibold text-slate-200">+50 Coins</div>
          <div className="text-xs text-amber-400">Earned today</div>
        </div>
      </motion.div>
    </div>
  );
}