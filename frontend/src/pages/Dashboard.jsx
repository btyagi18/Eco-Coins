// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   Coins,
//   Image as ImageIcon,
//   TrendingUp,
//   CheckCircle,
//   MapPin,
//   Medal,
// } from "lucide-react";
// import api from "../lib/api";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [data, setData] = React.useState({
//     coins: 0,
//     cleanups: 0,
//     impact: 0,
//     rank: 0,
//     activities: [],
//     todayMissions: 0,
//     hasDailyLimitReached: false,
//     leaderboard: [],
//   });
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           setLoading(false);
//           return;
//         }

//         const res = await api.get("/api/dashboard", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setData((current) => ({ ...current, ...res.data }));
//       } catch (error) {
//         console.error("Dashboard error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) {
//     return <div className="mt-20 text-center text-xl animate-pulse">Loading your eco impact...</div>;
//   }

//   const missionProgress = Math.min((data.todayMissions / 2) * 100, 100);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12 w-full">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="space-y-10"
//       >
//         <div className="flex justify-between items-center gap-4">
//           <div>
//             <h1 className="text-5xl font-extrabold">Dashboard</h1>
//             <p className="text-slate-500 mt-3">
//               Monitor your environmental impact and reward balance.
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/upload")}
//             disabled={data.hasDailyLimitReached}
//             className="glass px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ImageIcon size={20} />
//             {data.hasDailyLimitReached ? "Daily Limit Reached" : "Upload Cleanup"}
//           </button>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {[
//             { label: "Total Eco-Coins", value: data.coins, icon: Coins },
//             { label: "Verified Cleanups", value: data.cleanups, icon: CheckCircle },
//             { label: "Impact Score", value: data.impact, icon: TrendingUp },
//           ].map((stat) => (
//             <div key={stat.label} className="card-pro rounded-2xl p-6">
//               <stat.icon className="mb-2" />
//               <p className="text-sm text-gray-500">{stat.label}</p>
//               <p className="text-3xl font-bold">{stat.value}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8">
//           {/* Recent Activity - Featured Left Column */}
//           <div className="md:col-span-2 lg:col-span-5 lg:row-span-2 card-pro rounded-3xl p-8 flex flex-col">
//             <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
//             <div className="space-y-4 flex-1 overflow-y-auto">
//               {data.activities.length === 0 ? (
//                 <p className="text-gray-500">No activity yet</p>
//               ) : (
//                 data.activities.map((activity, index) => (
//                   <div key={`${activity.location}-${index}`} className="flex items-start justify-between gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800">
//                     <div>
//                       <p className="flex items-center gap-2 font-semibold">
//                         <MapPin size={16} className="text-pink-500" />
//                         {activity.location}
//                       </p>
//                       <p className="text-sm text-gray-500">+{activity.coins} coins</p>
//                     </div>
//                     <CheckCircle className="shrink-0 text-green-500" />
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Daily Challenges - Top Right */}
//           <div className="md:col-span-2 lg:col-span-7 card-pro rounded-3xl p-8">
//             <h2 className="mb-4 text-2xl font-bold">Daily Challenges</h2>
//             <p className="text-lg">{data.todayMissions}/2 Missions Completed</p>

//             <div className="mt-6 h-5 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800">
//               <div
//                 className="h-full rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
//                 style={{ width: `${missionProgress}%` }}
//               />
//             </div>

//             <button
//               onClick={() => navigate("/upload")}
//               disabled={data.hasDailyLimitReached}
//               className="mt-6 w-full rounded-xl bg-gradient-to-r from-green-400 to-blue-500 py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {data.hasDailyLimitReached ? "Come back tomorrow for more cleanups" : "Complete today mission"}
//             </button>
//           </div>

//           {/* Leaderboard - Bottom Right */}
//           <div className="md:col-span-2 lg:col-span-7 card-pro rounded-3xl p-8">
//             <h2 className="mb-6 text-xl font-bold">Leaderboard</h2>

//             <div className="space-y-4">
//               {data.leaderboard.length === 0 ? (
//                 <p className="text-gray-500">No users on the board yet</p>
//               ) : (
//                 data.leaderboard.map((user) => (
//                   <div
//                     key={`${user.rank}-${user.name}`}
//                     className="flex items-start gap-3 rounded-2xl border border-slate-200/60 px-4 py-3 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
//                   >
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 font-bold text-amber-500">
//                       #{user.rank}
//                     </div>
//                     <div className="flex-1">
//                       <p className="flex items-center gap-2 font-semibold">
//                         <Medal size={16} className="text-pink-500" />
//                         {user.name}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {user.coins} coins • {user.cleanups} cleanups • {user.impact} impact
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Dashboard;








import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Coins, Image as ImageIcon, TrendingUp, CheckCircle,
  MapPin, Medal, Zap, ArrowUpRight, Leaf, Target,
} from "lucide-react";
import api from "../lib/api";

const StatCard = ({ label, value, icon: Icon, color, glowColor, delay = 0, suffix = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    className="relative rounded-2xl p-6 overflow-hidden group"
    style={{
      background: 'rgba(1,18,8,0.7)',
      border: '1px solid rgba(16,185,129,0.1)',
      backdropFilter: 'blur(20px)',
      transition: 'all 0.35s ease',
    }}
    whileHover={{ scale: 1.02 }}
  >
    {/* Top highlight */}
    <div className="absolute top-0 left-0 right-0 h-px"
      style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }}
    />
    {/* Ambient glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: `radial-gradient(circle at 20% 50%, ${glowColor} 0%, transparent 70%)` }}
    />

    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${glowColor}`, border: `1px solid ${color}25` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <ArrowUpRight size={14} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
      </div>
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-100">
        {value}
        {suffix && <span className="text-base font-medium text-slate-500 ml-1">{suffix}</span>}
      </p>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    coins: 0, cleanups: 0, impact: 0, rank: 0,
    activities: [], todayMissions: 0,
    hasDailyLimitReached: false, leaderboard: [],
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setLoading(false); return; }
        const res = await api.get("/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData((current) => ({ ...current, ...res.data }));
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 rounded-full"
            style={{ border: '2px solid rgba(16,185,129,0.1)', borderTopColor: '#10b981' }}
          />
          <p className="text-slate-400 text-sm">Loading your eco impact...</p>
        </div>
      </div>
    );
  }

  const missionProgress = Math.min((data.todayMissions / 2) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10"
      >
        <div>
          <div className="eco-badge mb-3"><Leaf size={11} /> Your Impact Dashboard</div>
          <h1 className="text-4xl font-bold text-slate-100">Dashboard</h1>
          <p className="text-slate-400 mt-1.5 text-sm">Monitor your environmental impact and reward balance.</p>
        </div>
        <button
          onClick={() => navigate("/upload")}
          disabled={data.hasDailyLimitReached}
          className="btn-eco-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          <ImageIcon size={16} />
          {data.hasDailyLimitReached ? "Daily Limit Reached" : "Upload Cleanup"}
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Rewards" value={data.coins} icon={Coins} color="#f59e0b" glowColor="rgba(245,158,11,0.12)" delay={0} />
        <StatCard label="Verified Cleanups" value={data.cleanups} icon={CheckCircle} color="#10b981" glowColor="rgba(16,185,129,0.12)" delay={0.1} />
        <StatCard label="Impact Score" value={data.impact} icon={TrendingUp} color="#0ea5e9" glowColor="rgba(14,165,233,0.12)" delay={0.2} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-5 rounded-2xl p-6 flex flex-col"
          style={{
            background: 'rgba(1,18,8,0.7)',
            border: '1px solid rgba(16,185,129,0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-100">Recent Activity</h2>
            <span className="eco-badge"><Zap size={10} /> Live</span>
          </div>

          <div className="space-y-3 flex-1">
            {data.activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}
                >
                  <Leaf size={22} className="text-emerald-600" />
                </div>
                <p className="text-slate-500 text-sm">No activity yet.<br/>Start your first cleanup!</p>
              </div>
            ) : (
              data.activities.map((activity, index) => (
                <motion.div
                  key={`${activity.location}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl group"
                  style={{
                    background: 'rgba(6,78,59,0.1)',
                    border: '1px solid rgba(16,185,129,0.08)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(16,185,129,0.1)' }}
                    >
                      <MapPin size={14} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-200 text-sm">{activity.location}</p>
                      <p className="text-xs text-emerald-500">+{activity.coins} coins</p>
                    </div>
                  </div>
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Daily Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(1,18,8,0.7)',
              border: '1px solid rgba(16,185,129,0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-100">Daily Challenges</h2>
                <p className="text-slate-500 text-sm mt-0.5">{data.todayMissions}/2 missions completed</p>
              </div>
              <Target size={20} className="text-emerald-600" />
            </div>

            {/* Progress */}
            <div className="eco-progress mb-5">
              <motion.div
                className="eco-progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${missionProgress}%` }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            <div className="flex items-center gap-3">
              {[0, 1].map(i => (
                <div key={i} className="flex-1 flex items-center gap-2 p-3 rounded-xl"
                  style={{
                    background: i < data.todayMissions ? 'rgba(16,185,129,0.1)' : 'rgba(6,78,59,0.08)',
                    border: `1px solid ${i < data.todayMissions ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.07)'}`,
                  }}
                >
                  <CheckCircle size={16} style={{ color: i < data.todayMissions ? '#10b981' : 'rgba(16,185,129,0.2)' }} />
                  <span className="text-xs font-medium" style={{ color: i < data.todayMissions ? '#6ee7b7' : '#4b5563' }}>
                    Mission {i + 1}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/upload")}
              disabled={data.hasDailyLimitReached}
              className="mt-5 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: data.hasDailyLimitReached
                  ? 'rgba(16,185,129,0.05)'
                  : 'linear-gradient(135deg, #059669, #0d9488)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: '#ecfdf5',
                boxShadow: data.hasDailyLimitReached ? 'none' : '0 4px 20px rgba(5,150,105,0.3)',
              }}
            >
              {data.hasDailyLimitReached ? "Come back tomorrow for more cleanups" : "Complete today's mission →"}
            </button>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="rounded-2xl p-6 flex-1"
            style={{
              background: 'rgba(1,18,8,0.7)',
              border: '1px solid rgba(16,185,129,0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-100">Leaderboard</h2>
              <Medal size={18} className="text-amber-500" />
            </div>

            <div className="space-y-2">
              {data.leaderboard.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-6">No users on the board yet</p>
              ) : (
                data.leaderboard.map((user, index) => (
                  <motion.div
                    key={`${user.rank}-${user.name}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl group"
                    style={{
                      background: 'rgba(6,78,59,0.08)',
                      border: '1px solid rgba(16,185,129,0.07)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: user.rank <= 3
                          ? 'rgba(245,158,11,0.15)'
                          : 'rgba(16,185,129,0.08)',
                        color: user.rank <= 3 ? '#f59e0b' : '#6ee7b7',
                        border: `1px solid ${user.rank <= 3 ? 'rgba(245,158,11,0.25)' : 'rgba(16,185,129,0.1)'}`,
                      }}
                    >
                      #{user.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-200 text-sm truncate">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.cleanups} cleanups · {user.impact} impact</p>
                    </div>
                    <div className="text-sm font-bold text-amber-400 shrink-0">{user.coins}</div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;