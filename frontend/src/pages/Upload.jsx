import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  CheckCircle,
  Coins,
  Loader2,
  MapPin,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCamera from "../hooks/useCamera";
import useAiVerification from "../hooks/useAiVerification";
import { formatLocationText, formatPhotoMeta } from "../utils/photoMeta";

const trackerSteps = ["Before", "After", "Verify", "Done"];

const StepTracker = ({ step }) => (
  <div className="w-full max-w-3xl mb-12 relative z-10 px-4">
    <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-200/50 dark:bg-white/10 -translate-y-1/2 rounded-full border border-black/5 dark:border-white/5" />
    <div
      className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 -translate-y-1/2 rounded-full transition-all duration-700"
      style={{ width: `${(step / 3) * 100}%` }}
    />

    <div className="flex justify-between relative z-10">
      {trackerSteps.map((label, index) => {
        const active = step >= index;
        return (
          <div key={label} className="flex flex-col items-center gap-3">
            <div
              className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-[3px] md:border-4 flex items-center justify-center transition-all duration-500 ${
                active
                  ? "bg-pink-500 border-pink-200 shadow-[0_0_20px_rgba(236,72,153,0.45)]"
                  : "bg-slate-800/50 border-slate-500/30"
              }`}
            >
              {active ? (
                <CheckCircle size={22} className="text-black dark:text-white" />
              ) : (
                <span className="text-slate-400 font-bold">{index + 1}</span>
              )}
            </div>
            <span className={`text-xs md:text-sm font-bold uppercase ${active ? "text-pink-500" : "text-slate-500"}`}>
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
    <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950/90 aspect-video shadow-2xl">
      <div className="absolute inset-0">
        {photo ? (
          <img src={photo.dataUrl} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No photo captured yet
          </div>
        )}
      </div>
      {photo && (
        <div className="absolute inset-x-0 bottom-0 bg-black/72 backdrop-blur-md p-4 text-sm text-slate-200 space-y-1">
          <div className="font-bold text-black dark:text-white text-base">{label}</div>
          <div className="truncate">{meta.date}</div>
          <div>{meta.time}</div>
          <div className="truncate">{meta.location}</div>
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

  const {
    videoRef,
    isStreaming,
    locationMeta,
    locationError,
    startCamera,
    stopCamera,
    capturePhoto,
  } = useCamera();
  const { status, result, error, verify, reset } = useAiVerification();

  const locationText = useMemo(
    () => formatLocationText(locationMeta, locationError),
    [locationMeta, locationError],
  );

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  useEffect(() => {
    if (step === 2 && beforePhoto && afterPhoto && status === "idle") {
      verify(beforePhoto, afterPhoto).catch(() => {});
    }
  }, [afterPhoto, beforePhoto, status, step, verify]);

  useEffect(() => {
    if (status === "done") {
      setStep(3);
    }
  }, [status]);

  const openCamera = async () => {
    setCameraError(null);
    try {
      await startCamera();
    } catch (error) {
      setCameraError(error.message);
    }
  };

  const handleCapture = async () => {
    setCaptureBusy(true);
    setCameraError(null);

    try {
      const photo = await capturePhoto();

      if (!photo) {
        throw new Error("Unable to capture photo.");
      }

      stopCamera();

      if (step === 0) {
        setBeforePhoto(photo);
        setStep(1);
      } else if (step === 1) {
        setAfterPhoto(photo);
        setStep(2);
      }
    } catch (error) {
      setCameraError(error.message || "Unable to capture photo.");
    } finally {
      setCaptureBusy(false);
    }
  };

  const handleReset = () => {
    stopCamera();
    reset();
    setBeforePhoto(null);
    setAfterPhoto(null);
    setCameraError(null);
    setStep(0);
  };

  const title = step === 0 ? "Capture Before Photo" : step === 1 ? "Capture After Photo" : "Verify Cleanup";
  const subtitle =
    step === 0
      ? "Use the rear camera to capture the dirty area before cleaning."
      : step === 1
        ? "Capture the same area after cleaning so AI can compare both images."
        : "We compare both images, timestamps, and GPS details before giving the result.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col items-center min-h-[85vh]">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
          Real Camera <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">AI Verification</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto">
          Capture real before and after photos, include location metadata, and verify the cleanup through the backend AI flow.
        </p>
      </motion.div>

      <StepTracker step={step} />

      <div className="w-full max-w-5xl">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-black/30 p-6 md:p-8 shadow-2xl"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{title}</h2>
              <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">{subtitle}</p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Dashboard
            </button>
          </div>

          {step < 2 && (
            <>
              <div className="rounded-[1.75rem] overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-video relative">
                {!isStreaming && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-3">
                    <Camera size={52} />
                    <p>Open camera to use the live rear-camera flow</p>
                  </div>
                )}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${isStreaming ? "block" : "hidden"}`}
                />
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <MapPin size={16} className="text-pink-500 shrink-0" />
                <span>{locationText}</span>
              </div>

              {cameraError && (
                <div className="mt-4 rounded-2xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <span>{cameraError}</span>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {!isStreaming ? (
                  <button
                    onClick={openCamera}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 text-slate-900 dark:text-white font-bold shadow-lg"
                  >
                    Open Rear Camera
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCapture}
                      disabled={captureBusy}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 dark:text-white font-bold shadow-lg flex items-center gap-2 disabled:opacity-60"
                    >
                      {captureBusy ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                      {captureBusy ? "Capturing..." : step === 0 ? "Capture Before" : "Capture After"}
                    </button>
                    <button
                      onClick={stopCamera}
                      className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold"
                    >
                      Close Camera
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          {step >= 2 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <PhotoCard label="Before" photo={beforePhoto} />
                <PhotoCard label="After" photo={afterPhoto} />
              </div>

              {status === "loading" && (
                <div className="rounded-[2rem] border border-cyan-300/30 bg-cyan-500/10 p-8 flex flex-col items-center text-center gap-4">
                  <Loader2 size={40} className="animate-spin text-cyan-500" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Analyzing</h3>
                  <p className="text-slate-600 dark:text-slate-300 max-w-xl">
                    Comparing the dirty and cleaned photos, plus the date, time, and location metadata.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="rounded-[2rem] border border-red-300/40 bg-red-500/10 p-6 text-red-700 dark:text-red-300">
                  <div className="flex items-center gap-2 font-bold mb-2">
                    <AlertTriangle size={18} />
                    Verification failed
                  </div>
                  <p>{error}</p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-5 py-2 rounded-xl border border-red-300/40"
                  >
                    Start Again
                  </button>
                </div>
              )}

              {status === "done" && result && (
                <div className="rounded-[2rem] border border-emerald-300/40 bg-emerald-500/10 p-8 text-center">
                  <ShieldCheck size={54} className="text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
                    {result.verdict === "CLEANED"
                      ? "Cleanup Verified"
                      : result.verdict === "FRAUD_DETECTED"
                        ? "Verification Flagged"
                        : "Needs More Cleaning"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-5">
                    {result.details}
                  </p>
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-black">
                    <Coins size={18} />
                    Confidence: {result.confidence}
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold flex items-center justify-center gap-2"
                >
                  <RefreshCw size={16} />
                  Reset Flow
                </button>
              </div>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default Upload;
