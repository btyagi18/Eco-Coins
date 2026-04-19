// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   AlertTriangle,
//   ArrowLeft,
//   Camera,
//   CheckCircle,
//   Coins,
//   Loader2,
//   MapPin,
//   RefreshCw,
//   ShieldCheck,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import useCamera from "../hooks/useCamera";
// import useAiVerification from "../hooks/useAiVerification";
// import { formatLocationText, formatPhotoMeta } from "../utils/photoMeta";
// import api from "../lib/api";

// const trackerSteps = ["Before", "After", "Verify", "Done"];

// const StepTracker = ({ step }) => (
//   <div className="w-full max-w-3xl mb-12 relative z-10 px-4">
//     <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-200/50 dark:bg-white/10 -translate-y-1/2 rounded-full border border-black/5 dark:border-white/5" />
//     <div
//       className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 -translate-y-1/2 rounded-full transition-all duration-700"
//       style={{ width: `${(step / 3) * 100}%` }}
//     />

//     <div className="flex justify-between relative z-10">
//       {trackerSteps.map((label, index) => {
//         const active = step >= index;
//         return (
//           <div key={label} className="flex flex-col items-center gap-3">
//             <div
//               className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-[3px] md:border-4 flex items-center justify-center transition-all duration-500 ${
//                 active
//                   ? "bg-pink-500 border-pink-200 shadow-[0_0_20px_rgba(236,72,153,0.45)]"
//                   : "bg-slate-800/50 border-slate-500/30"
//               }`}
//             >
//               {active ? (
//                 <CheckCircle size={22} className="text-black dark:text-white" />
//               ) : (
//                 <span className="text-slate-400 font-bold">{index + 1}</span>
//               )}
//             </div>
//             <span className={`text-xs md:text-sm font-bold uppercase ${active ? "text-pink-500" : "text-slate-500"}`}>
//               {label}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// );

// const PhotoCard = ({ label, photo }) => {
//   const meta = formatPhotoMeta(photo?.meta);

//   return (
//     <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950/90 aspect-video shadow-2xl">
//       <div className="absolute inset-0">
//         {photo ? (
//           <img src={photo.dataUrl} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-slate-400">
//             No photo captured yet
//           </div>
//         )}
//       </div>
//       {photo && (
//         <div className="absolute inset-x-0 bottom-0 bg-black/72 backdrop-blur-md p-4 text-sm text-slate-200 space-y-1">
//           <div className="font-bold text-black dark:text-white text-base">{label}</div>
//           <div className="truncate">{meta.date}</div>
//           <div>{meta.time}</div>
//           <div className="truncate">{meta.location}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Upload = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(0);
//   const [beforePhoto, setBeforePhoto] = useState(null);
//   const [afterPhoto, setAfterPhoto] = useState(null);
//   const [cameraError, setCameraError] = useState(null);
//   const [captureBusy, setCaptureBusy] = useState(false);
//   const [todayMissions, setTodayMissions] = useState(0);
//   const [dailyLimitReached, setDailyLimitReached] = useState(false);
//   const [dailyStatusLoading, setDailyStatusLoading] = useState(true);

//   const {
//     videoRef,
//     isStreaming,
//     locationMeta,
//     locationError,
//     startCamera,
//     stopCamera,
//     capturePhoto,
//   } = useCamera();
//   const { status, result, error, verify, reset } = useAiVerification();

//   const locationText = useMemo(
//     () => formatLocationText(locationMeta, locationError),
//     [locationMeta, locationError],
//   );

//   useEffect(() => {
//     return () => stopCamera();
//   }, [stopCamera]);

//   useEffect(() => {
//     const fetchDailyStatus = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           setDailyStatusLoading(false);
//           return;
//         }

//         const res = await api.get("/api/dashboard", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setTodayMissions(res.data.todayMissions || 0);
//         setDailyLimitReached(Boolean(res.data.hasDailyLimitReached));
//       } catch (nextError) {
//         console.error("Upload daily status error:", nextError);
//       } finally {
//         setDailyStatusLoading(false);
//       }
//     };

//     fetchDailyStatus();
//   }, []);

//   useEffect(() => {
//     if (step === 2 && beforePhoto && afterPhoto && status === "idle") {
//       verify(beforePhoto, afterPhoto).catch(() => {});
//     }
//   }, [afterPhoto, beforePhoto, status, step, verify]);

//   useEffect(() => {
//     if (status === "done") {
//       setStep(3);
//     }
//   }, [status]);

//   const openCamera = async () => {
//     setCameraError(null);

//     if (dailyLimitReached) {
//       setCameraError("Daily cleanup limit reached. Come back tomorrow for more submissions.");
//       return;
//     }

//     try {
//       await startCamera();
//     } catch (error) {
//       setCameraError(error.message);
//     }
//   };

//   const handleCapture = async () => {
//     setCaptureBusy(true);
//     setCameraError(null);

//     try {
//       const photo = await capturePhoto();

//       if (!photo) {
//         throw new Error("Unable to capture photo.");
//       }

//       stopCamera();

//       if (step === 0) {
//         setBeforePhoto(photo);
//         setStep(1);
//       } else if (step === 1) {
//         setAfterPhoto(photo);
//         setStep(2);
//       }
//     } catch (error) {
//       setCameraError(error.message || "Unable to capture photo.");
//     } finally {
//       setCaptureBusy(false);
//     }
//   };

//   const handleReset = () => {
//     stopCamera();
//     reset();
//     setBeforePhoto(null);
//     setAfterPhoto(null);
//     setCameraError(null);
//     setStep(0);
//   };

//   const title = step === 0 ? "Capture Before Photo" : step === 1 ? "Capture After Photo" : "Verify Cleanup";
//   const subtitle =
//     step === 0
//       ? "Use the rear camera to capture the dirty area before cleaning."
//       : step === 1
//         ? "Capture the same area after cleaning so AI can compare both images."
//         : "We compare both images, timestamps, and GPS details before giving the result.";

//   const verificationSummary =
//     status === "done" && result
//       ? result.awardedCoins
//         ? `You earned ${result.awardedCoins} Eco-Coins from this verified cleanup.`
//         : "This submission did not earn coins."
//       : "";

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col items-center min-h-[85vh]">
//       <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
//           Real Camera <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">AI Verification</span>
//         </h1>
//         <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto">
//           Capture real before and after photos, include location metadata, and verify the cleanup through the backend AI flow.
//         </p>
//       </motion.div>

//       <StepTracker step={step} />

//       <div className="w-full max-w-5xl">
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-black/30 p-6 md:p-8 shadow-2xl"
//         >
//           <div className="flex items-center justify-between gap-4 mb-6">
//             <div>
//               <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{title}</h2>
//               <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">{subtitle}</p>
//               <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
//                 Today's submissions: {todayMissions}/2
//               </p>
//             </div>
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-2"
//             >
//               <ArrowLeft size={16} />
//               Dashboard
//             </button>
//           </div>

//           {step < 2 && (
//             <>
//               {dailyLimitReached && !dailyStatusLoading && (
//                 <div className="mb-5 rounded-2xl border border-amber-300/40 bg-amber-500/10 px-4 py-3 text-amber-700 dark:text-amber-300">
//                   You have already completed 2 verified cleanups today. Upload will unlock again tomorrow.
//                 </div>
//               )}

//               <div className="rounded-[1.75rem] overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-video relative">
//                 {!isStreaming && (
//                   <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-3">
//                     <Camera size={52} />
//                     <p>Open camera to use the live rear-camera flow</p>
//                   </div>
//                 )}
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   playsInline
//                   muted
//                   className={`w-full h-full object-cover ${isStreaming ? "block" : "hidden"}`}
//                 />
//               </div>

//               <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2">
//                 <MapPin size={16} className="text-pink-500 shrink-0" />
//                 <span>{locationText}</span>
//               </div>

//               {cameraError && (
//                 <div className="mt-4 rounded-2xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-red-700 dark:text-red-300 flex items-center gap-2">
//                   <AlertTriangle size={16} />
//                   <span>{cameraError}</span>
//                 </div>
//               )}

//               <div className="mt-6 flex flex-wrap gap-3">
//                 {!isStreaming ? (
//                   <button
//                     onClick={openCamera}
//                     disabled={dailyLimitReached || dailyStatusLoading}
//                     className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 text-slate-900 dark:text-white font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {dailyLimitReached ? "Daily Limit Reached" : "Open Rear Camera"}
//                   </button>
//                 ) : (
//                   <>
//                     <button
//                       onClick={handleCapture}
//                       disabled={captureBusy || dailyLimitReached}
//                       className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 dark:text-white font-bold shadow-lg flex items-center gap-2 disabled:opacity-60"
//                     >
//                       {captureBusy ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
//                       {captureBusy ? "Capturing..." : step === 0 ? "Capture Before" : "Capture After"}
//                     </button>
//                     <button
//                       onClick={stopCamera}
//                       className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold"
//                     >
//                       Close Camera
//                     </button>
//                   </>
//                 )}
//               </div>
//             </>
//           )}

//           {step >= 2 && (
//             <div className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-5">
//                 <PhotoCard label="Before" photo={beforePhoto} />
//                 <PhotoCard label="After" photo={afterPhoto} />
//               </div>

//               {status === "loading" && (
//                 <div className="rounded-[2rem] border border-cyan-300/30 bg-cyan-500/10 p-8 flex flex-col items-center text-center gap-4">
//                   <Loader2 size={40} className="animate-spin text-cyan-500" />
//                   <h3 className="text-2xl font-black text-slate-900 dark:text-white">Analyzing</h3>
//                   <p className="text-slate-600 dark:text-slate-300 max-w-xl">
//                     Comparing the dirty and cleaned photos, plus the date, time, and location metadata.
//                   </p>
//                 </div>
//               )}

//               {status === "error" && (
//                 <div className="rounded-[2rem] border border-red-300/40 bg-red-500/10 p-6 text-red-700 dark:text-red-300">
//                   <div className="flex items-center gap-2 font-bold mb-2">
//                     <AlertTriangle size={18} />
//                     Verification failed
//                   </div>
//                   <p>{error}</p>
//                   <button
//                     onClick={handleReset}
//                     className="mt-4 px-5 py-2 rounded-xl border border-red-300/40"
//                   >
//                     Start Again
//                   </button>
//                 </div>
//               )}

//               {status === "done" && result && (
//                 <div className="rounded-[2rem] border border-emerald-300/40 bg-emerald-500/10 p-8 text-center">
//                   <ShieldCheck size={54} className="text-emerald-500 mx-auto mb-4" />
//                   <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
//                     {result.verdict === "CLEANED"
//                       ? "Cleanup Verified"
//                       : result.verdict === "FRAUD_DETECTED"
//                         ? "Verification Flagged"
//                         : "Needs More Cleaning"}
//                   </h3>
//                   <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-5">
//                     {result.details}
//                   </p>
//                   <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-5">
//                     {verificationSummary}
//                   </p>
//                   <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-black">
//                     <Coins size={18} />
//                     Confidence: {result.confidence}
//                   </div>
//                 </div>
//               )}

//               <div className="flex justify-center pt-2">
//                 <button
//                   onClick={handleReset}
//                   className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold flex items-center justify-center gap-2"
//                 >
//                   <RefreshCw size={16} />
//                   Reset Flow
//                 </button>
//               </div>
//             </div>
//           )}
//         </motion.section>
//       </div>
//     </div>
//   );
// };

// export default Upload;








import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, ArrowLeft, Camera, CheckCircle, Coins,
  Loader2, MapPin, RefreshCw, ShieldCheck, Leaf,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCamera from "../hooks/useCamera";
import useAiVerification from "../hooks/useAiVerification";
import { formatLocationText, formatPhotoMeta } from "../utils/photoMeta";
import api from "../lib/api";

const trackerSteps = ["Before", "After", "Verify", "Done"];

const StepTracker = ({ step }) => (
  <div className="w-full max-w-2xl mb-10 relative">
    {/* Track line */}
    <div className="absolute top-5 left-5 right-5 h-px"
      style={{ background: 'rgba(16,185,129,0.1)' }}
    />
    <motion.div
      className="absolute top-5 left-5 h-px"
      initial={{ width: 0 }}
      animate={{ width: `${(step / 3) * 100}%` }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background: 'linear-gradient(90deg, #059669, #34d399)',
        boxShadow: '0 0 10px rgba(52,211,153,0.5)',
        maxWidth: 'calc(100% - 40px)',
      }}
    />

    <div className="relative z-10 flex justify-between">
      {trackerSteps.map((label, index) => {
        const active = step >= index;
        const current = step === index;
        return (
          <div key={label} className="flex flex-col items-center gap-2">
            <motion.div
              animate={{
                boxShadow: current ? '0 0 20px rgba(16,185,129,0.5), 0 0 40px rgba(16,185,129,0.2)' : 'none',
              }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
              style={{
                background: active ? 'linear-gradient(135deg, #059669, #0d9488)' : 'rgba(6,78,59,0.2)',
                border: active ? '1px solid rgba(52,211,153,0.4)' : '1px solid rgba(16,185,129,0.1)',
              }}
            >
              {active ? (
                <CheckCircle size={18} className="text-emerald-100" />
              ) : (
                <span className="text-slate-600 text-sm font-bold">{index + 1}</span>
              )}
            </motion.div>
            <span className={`text-xs font-medium tracking-wide ${active ? 'text-emerald-400' : 'text-slate-600'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

const PhotoCard = ({ label, photo }) => {
  const meta = formatPhotoMeta(photo?.meta);
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-video"
      style={{
        background: 'rgba(1,18,8,0.8)',
        border: '1px solid rgba(16,185,129,0.15)',
      }}
    >
      {photo ? (
        <>
          <img src={photo.dataUrl} alt={label} className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 p-4"
            style={{ background: 'linear-gradient(to top, rgba(1,18,8,0.95), transparent)' }}
          >
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">{label}</div>
            <div className="text-xs text-slate-300">{meta.date} · {meta.time}</div>
            <div className="text-xs text-slate-400 truncate">{meta.location}</div>
          </div>
          <div className="absolute top-3 right-3">
            <span className="eco-badge text-xs">Captured</span>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-600">
          <Camera size={32} className="opacity-40" />
          <p className="text-sm">No photo captured yet</p>
        </div>
      )}
    </div>
  );
};

const Upload = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [beforePhoto, setBeforePhoto] = useState(null);
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [captureBusy, setCaptureBusy] = useState(false);
  const [todayMissions, setTodayMissions] = useState(0);
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const [dailyStatusLoading, setDailyStatusLoading] = useState(true);

  const { videoRef, isStreaming, locationMeta, locationError, startCamera, stopCamera, capturePhoto } = useCamera();
  const { status, result, error, verify, reset } = useAiVerification();

  const locationText = useMemo(
    () => formatLocationText(locationMeta, locationError),
    [locationMeta, locationError],
  );

  useEffect(() => { return () => stopCamera(); }, [stopCamera]);

  useEffect(() => {
    const fetchDailyStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setDailyStatusLoading(false); return; }
        const res = await api.get("/api/dashboard", { headers: { Authorization: `Bearer ${token}` } });
        setTodayMissions(res.data.todayMissions || 0);
        setDailyLimitReached(Boolean(res.data.hasDailyLimitReached));
      } catch (e) { console.error(e); }
      finally { setDailyStatusLoading(false); }
    };
    fetchDailyStatus();
  }, []);

  useEffect(() => {
    if (step === 2 && beforePhoto && afterPhoto && status === "idle") {
      verify(beforePhoto, afterPhoto).catch(() => {});
    }
  }, [afterPhoto, beforePhoto, status, step, verify]);

  useEffect(() => { if (status === "done") setStep(3); }, [status]);

  const openCamera = async () => {
    setCameraError(null);
    if (dailyLimitReached) { setCameraError("Daily cleanup limit reached. Come back tomorrow."); return; }
    try { await startCamera(); } catch (e) { setCameraError(e.message); }
  };

  const handleCapture = async () => {
    setCaptureBusy(true); setCameraError(null);
    try {
      const photo = await capturePhoto();
      if (!photo) throw new Error("Unable to capture photo.");
      stopCamera();
      if (step === 0) { setBeforePhoto(photo); setStep(1); }
      else if (step === 1) { setAfterPhoto(photo); setStep(2); }
    } catch (e) { setCameraError(e.message || "Unable to capture photo."); }
    finally { setCaptureBusy(false); }
  };

  const handleReset = () => {
    stopCamera(); reset(); setBeforePhoto(null); setAfterPhoto(null); setCameraError(null); setStep(0);
  };

  const titles = ["Capture Before Photo", "Capture After Photo", "Verify Cleanup", "Complete"];
  const subtitles = [
    "Use the rear camera to photograph the dirty area before cleaning.",
    "Capture the same area after cleaning so AI can compare both images.",
    "Comparing both images, timestamps, and GPS data.",
    "Verification complete.",
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col items-center">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="eco-badge mb-4 inline-flex"><Leaf size={11} /> AI-Powered Verification</span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
          Real Camera{' '}
          <span style={{
            background: 'linear-gradient(135deg, #34d399, #10b981, #0d9488)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            AI Verification
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Capture real before/after photos with location metadata, then let our AI verify your cleanup.
        </p>
      </motion.div>

      <StepTracker step={step} />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full rounded-3xl p-6 md:p-8"
        style={{
          background: 'rgba(1,18,8,0.8)',
          border: '1px solid rgba(16,185,129,0.15)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Card header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">{titles[step]}</h2>
            <p className="text-slate-400 mt-1.5 text-sm max-w-xl">{subtitles[step]}</p>
            <p className="text-xs text-slate-600 mt-2">Today's submissions: {todayMissions}/2</p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-slate-200 transition-colors shrink-0"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <ArrowLeft size={15} />
            Dashboard
          </button>
        </div>

        {step < 2 && (
          <>
            {dailyLimitReached && !dailyStatusLoading && (
              <div className="mb-6 p-4 rounded-xl flex items-center gap-3 text-sm"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                <span className="text-amber-300">Daily limit reached. Come back tomorrow for more submissions.</span>
              </div>
            )}

            {/* Camera view */}
            <div className="rounded-2xl overflow-hidden aspect-video relative"
              style={{ background: '#010a05', border: '1px solid rgba(16,185,129,0.12)' }}
            >
              {!isStreaming && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-600">
                  <Camera size={44} className="opacity-40" />
                  <p className="text-sm">Open camera to start</p>
                </div>
              )}
              <video ref={videoRef} autoPlay playsInline muted
                className={`w-full h-full object-cover ${isStreaming ? "block" : "hidden"}`}
              />
              {/* Corner brackets */}
              {isStreaming && (
                <>
                  <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-500 rounded-tl-lg opacity-70" />
                  <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-500 rounded-tr-lg opacity-70" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-500 rounded-bl-lg opacity-70" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-500 rounded-br-lg opacity-70" />
                </>
              )}
            </div>

            {/* Location */}
            <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)' }}
            >
              <MapPin size={15} className="text-emerald-500 shrink-0" />
              <span className="text-slate-400">{locationText}</span>
            </div>

            {cameraError && (
              <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <AlertTriangle size={15} className="text-red-400 shrink-0" />
                <span className="text-red-300">{cameraError}</span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {!isStreaming ? (
                <button
                  onClick={openCamera}
                  disabled={dailyLimitReached || dailyStatusLoading}
                  className="btn-eco-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Camera size={16} />
                  {dailyLimitReached ? "Daily Limit Reached" : "Open Camera"}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCapture}
                    disabled={captureBusy || dailyLimitReached}
                    className="btn-eco-primary disabled:opacity-60"
                  >
                    {captureBusy ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
                    {captureBusy ? "Capturing..." : step === 0 ? "Capture Before" : "Capture After"}
                  </button>
                  <button onClick={stopCamera} className="btn-eco-ghost">
                    Close Camera
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {step >= 2 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <PhotoCard label="Before" photo={beforePhoto} />
              <PhotoCard label="After" photo={afterPhoto} />
            </div>

            {/* Loading */}
            {status === "loading" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl p-8 flex flex-col items-center text-center gap-4"
                style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)' }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 rounded-full"
                  style={{ border: '2px solid rgba(14,165,233,0.15)', borderTopColor: '#0ea5e9' }}
                />
                <h3 className="text-xl font-bold text-slate-100">Analyzing Cleanup</h3>
                <p className="text-slate-400 text-sm max-w-sm">Comparing images, timestamps, and GPS location data...</p>
              </motion.div>
            )}

            {/* Error */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <div className="flex items-center gap-2 font-bold mb-2 text-red-400">
                  <AlertTriangle size={18} /> Verification failed
                </div>
                <p className="text-red-300 text-sm">{error}</p>
                <button onClick={handleReset} className="mt-4 btn-eco-ghost text-sm border-red-500/30 text-red-400 hover:bg-red-500/10">
                  Start Again
                </button>
              </motion.div>
            )}

            {/* Done */}
            {status === "done" && result && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-8 text-center"
                  style={{
                    background: result.verdict === "CLEANED"
                      ? 'rgba(16,185,129,0.08)'
                      : 'rgba(245,158,11,0.06)',
                    border: result.verdict === "CLEANED"
                      ? '1px solid rgba(16,185,129,0.25)'
                      : '1px solid rgba(245,158,11,0.2)',
                  }}
                >
                  <ShieldCheck size={48} className="mx-auto mb-4 text-emerald-400" style={{ filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.5))' }} />
                  <h3 className="text-2xl font-bold text-slate-100 mb-3">
                    {result.verdict === "CLEANED"
                      ? "Cleanup Verified! 🌿"
                      : result.verdict === "FRAUD_DETECTED"
                        ? "Verification Flagged"
                        : "Needs More Cleaning"}
                  </h3>
                  <p className="text-slate-400 max-w-xl mx-auto text-sm mb-5">{result.details}</p>
                  {result.awardedCoins > 0 && (
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
                      style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24' }}
                    >
                      <Coins size={16} />
                      +{result.awardedCoins} Rewards Earned
                    </div>
                  )}
                  <div className="mt-4 text-xs text-slate-500">Confidence: {result.confidence}</div>
                </motion.div>
              </AnimatePresence>
            )}

            <div className="flex justify-center pt-2">
              <button onClick={handleReset} className="btn-eco-ghost">
                <RefreshCw size={15} />
                Reset Flow
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Upload;