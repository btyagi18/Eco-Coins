// import React from 'react';
// import { motion } from 'framer-motion';
// import { Globe, Users, Trash2, TreeDeciduous } from 'lucide-react';

// const Impact = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center max-w-3xl mx-auto mb-20"
//       >
//         <h1 className="text-4xl md:text-6xl font-extrabold text-slate-950 dark:text-white mb-6 tracking-tight">
//           Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Impact</span>
//         </h1>
//         <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
//           See the collective difference our community is making around the globe. Every single action counts towards a cleaner planet.
//         </p>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//         {[
//           { label: "Active Users", value: "12,450", icon: Users, color: "text-blue-500", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]" },
//           { label: "Waste Removed (kg)", value: "85,320", icon: Trash2, color: "text-emerald-500", glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]" },
//           { label: "Areas Cleaned", value: "4,120", icon: Globe, color: "text-cyan-500", glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]" },
//           { label: "Trees Equivalent", value: "1,500", icon: TreeDeciduous, color: "text-green-500", glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]" },
//         ].map((stat, idx) => (
//           <motion.div 
//             key={idx}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: idx * 0.1, type: "spring" }}
//             className={`card-pro p-8 rounded-3xl flex flex-col items-center justify-center text-center group transition-all duration-300 ${stat.glow} hover:-translate-y-2 border-slate-100 dark:border-slate-800`}
//           >
//             <div className={`p-5 rounded-2xl bg-black/5 dark:bg-white/5 mb-6 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
//               <stat.icon size={40} />
//             </div>
//             <p className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mb-3">{stat.value}</p>
//             <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
//           </motion.div>
//         ))}
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className="card-pro rounded-3xl p-8 md:p-12 border-slate-100 dark:border-slate-800"
//       >
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-black/10 dark:border-white/10 pb-6 gap-4">
//           <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
//             Community Leaderboard
//           </h2>
//           <div className="card-pro px-4 py-2 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800">
//             Current Season: Spring 2026
//           </div>
//         </div>
        
//         <div className="space-y-4">
//           {[1, 2, 3, 4, 5].map((i) => (
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.5 + (i * 0.1) }}
//               key={i} 
//               className="flex items-center gap-4 md:gap-6 p-4 rounded-2xl card-pro hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 transform hover:scale-[1.01] border-slate-100 dark:border-slate-800"
//             >
//               <div className={`w-12 h-12 rounded-full flex items-center justify-center text-slate-900 dark:text-white font-bold text-lg shadow-lg ${i === 1 ? 'bg-gradient-to-r from-yellow-400 to-amber-600 scale-110' : i === 2 ? 'bg-gradient-to-r from-slate-300 to-slate-500' : i === 3 ? 'bg-gradient-to-r from-amber-600 to-orange-800' : 'bg-slate-800 dark:bg-slate-700'}`}>
//               </div>
//               <div className="w-14 h-14 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden border-2 border-transparent hover:border-emerald-500 transition-colors">
//                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=EcoWarrior${i}`} alt="Avatar" className="w-full h-full object-cover" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-bold text-lg text-slate-950 dark:text-white">EcoWarrior{i}</p>
//                 <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{150 - i * 12} cleanups verified</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xl font-bold text-slate-900 dark:text-primary-light">
//                   {12500 - i * 850} <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase">Coins</span>
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Impact;






import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Trash2, TreeDeciduous, TrendingUp, Leaf } from 'lucide-react';

const Impact = () => {
  const stats = [
    { label: "Active Users", value: "12,450", icon: Users, color: '#0ea5e9', glow: 'rgba(14,165,233,0.15)' },
    { label: "Waste Removed", value: "85,320 kg", icon: Trash2, color: '#10b981', glow: 'rgba(16,185,129,0.15)' },
    { label: "Areas Cleaned", value: "4,120", icon: Globe, color: '#34d399', glow: 'rgba(52,211,153,0.12)' },
    { label: "Trees Equivalent", value: "1,500", icon: TreeDeciduous, color: '#f59e0b', glow: 'rgba(245,158,11,0.12)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="eco-badge mb-4 inline-flex"><TrendingUp size={11} /> Real World Data</span>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-5">
          Global{' '}
          <span style={{
            background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #0d9488 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Impact
          </span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          See the collective difference our community is making. Every verified action contributes to a measurably cleaner planet.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="relative rounded-2xl p-7 text-center overflow-hidden group cursor-pointer"
            style={{
              background: 'rgba(1,18,8,0.75)',
              border: '1px solid rgba(16,185,129,0.1)',
              backdropFilter: 'blur(20px)',
              transition: 'border-color 0.4s ease',
            }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 50% 50%, ${stat.glow} 0%, transparent 70%)` }}
            />
            {/* Top border glow on hover */}
            <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{ background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)` }}
            />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{
                  background: stat.glow,
                  border: `1px solid ${stat.color}25`,
                  transition: 'all 0.3s ease',
                }}
              >
                <stat.icon size={26} style={{ color: stat.color }} />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">{stat.value}</p>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(1,18,8,0.8)',
          border: '1px solid rgba(16,185,129,0.12)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Header */}
        <div className="px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          style={{ borderBottom: '1px solid rgba(16,185,129,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <Leaf size={16} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Community Leaderboard</h2>
          </div>
          <span className="eco-badge">Spring 2026 Season</span>
        </div>

        {/* Rows */}
        <div className="p-6 space-y-3">
          {[1, 2, 3, 4, 5].map((i, index) => {
            const rankColors = ['#f59e0b', '#94a3b8', '#cd7f32', null, null];
            const rankGlows = [
              'rgba(245,158,11,0.2)', 'rgba(148,163,184,0.15)',
              'rgba(205,127,50,0.15)', null, null,
            ];
            const rankBg = rankColors[index]
              ? `linear-gradient(135deg, ${rankColors[index]}30, ${rankColors[index]}15)`
              : 'rgba(6,78,59,0.12)';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 p-4 rounded-2xl group cursor-pointer"
                style={{
                  background: 'rgba(6,78,59,0.06)',
                  border: '1px solid rgba(16,185,129,0.07)',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Rank badge */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                  style={{
                    background: rankBg,
                    border: `1px solid ${rankColors[index] ? rankColors[index] + '35' : 'rgba(16,185,129,0.12)'}`,
                    color: rankColors[index] || '#6ee7b7',
                    boxShadow: rankGlows[index] ? `0 0 15px ${rankGlows[index]}` : 'none',
                  }}
                >
                  #{i}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0"
                  style={{ border: '1px solid rgba(16,185,129,0.15)' }}
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Eco${i}`}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-200 text-sm group-hover:text-emerald-300 transition-colors">
                    EcoWarrior{i}
                  </p>
                  <p className="text-xs text-slate-500">{150 - i * 12} cleanups verified</p>
                </div>

                {/* Score */}
                <div className="text-right shrink-0">
                  <div className="font-bold text-slate-100 text-sm">{(12500 - i * 850).toLocaleString()}</div>
                  <div className="text-xs text-amber-500">coins</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
};

export default Impact;