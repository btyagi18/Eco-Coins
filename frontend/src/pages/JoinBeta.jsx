import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare, Send, CheckCircle } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useTheme } from "../context/ThemeContext";
import api from "../lib/api";

const JoinBeta = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const toast = useToast();
  const { theme } = useTheme();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/api/pre-register", form);

      toast.success("Beta request submitted", "You're on the early access list now.");
      setSubmittedEmail(form.email);
      setSubmitted(true);

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (err) {
      toast.error("Could not join beta", err?.response?.data?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`glass w-full max-w-md rounded-3xl p-12 text-center border ${
            theme === 'dark'
              ? 'border-emerald-500/20'
              : 'border-emerald-400/30'
          }`}
        >
          <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
            theme === 'dark'
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-emerald-100/60 text-emerald-600'
          }`}>
            <CheckCircle size={48} />
          </div>
          <h2 className={`mb-4 text-3xl font-bold ${
            theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
          }`}>You're on the list!</h2>
          <p className={`mb-8 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Thank you for joining our beta program. We will reach out to{" "}
            <strong>{submittedEmail}</strong> as soon as early access opens.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setSubmittedEmail("");
            }}
            className={`w-full rounded-2xl py-4 font-bold transition ${
              theme === 'dark'
                ? 'bg-emerald-600/80 text-white hover:bg-emerald-600'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            Back to Form
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`relative mx-auto flex w-full max-w-7xl flex-col items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8 ${
      theme === 'dark' ? 'bg-slate-900/20' : 'bg-slate-50/30'
    }`}>
      <div className="absolute top-0 right-0 z-[-1] h-[420px] w-[420px] rounded-full bg-pink-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 z-[-1] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 max-w-2xl px-4 text-center"
      >
        <span className={`mb-4 inline-block rounded-full border px-4 py-1.5 text-sm font-bold ${
          theme === 'dark'
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
            : 'border-emerald-400/40 bg-emerald-100/50 text-emerald-600'
        }`}>
          Coming Soon
        </span>
        <h1 className={`mb-6 text-4xl font-extrabold md:text-6xl ${
          theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
        }`}>
          Join our Private{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Beta
          </span>
        </h1>
        <p className={`text-lg leading-relaxed ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Be among the first to explore Clean2Earn, shape the experience with your
          feedback, and get early access before the public launch.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl"
      >
        <div className={`glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-10 border ${
          theme === 'dark'
            ? 'border-emerald-500/10'
            : 'border-emerald-400/20'
        }`}>
          <div className={`pointer-events-none absolute inset-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-slate-400/5 to-transparent'
              : 'bg-gradient-to-br from-white/60 to-transparent'
          }`} />

          <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="firstName" className={`ml-1 flex items-center gap-2 text-sm font-semibold ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <User size={16} /> First Name
                </label>
                <input
                  required
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Bhumika"
                  className={`w-full rounded-2xl px-5 py-4 shadow-inner outline-none transition ${
                    theme === 'dark'
                      ? 'border border-slate-600/40 bg-slate-700/30 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20'
                      : 'border border-slate-200 bg-white/70 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className={`ml-1 flex items-center gap-2 text-sm font-semibold ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <User size={16} /> Last Name
                </label>
                <input
                  required
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Tyagi"
                  className={`w-full rounded-2xl px-5 py-4 shadow-inner outline-none transition ${
                    theme === 'dark'
                      ? 'border border-slate-600/40 bg-slate-700/30 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20'
                      : 'border border-slate-200 bg-white/70 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="email" className={`ml-1 flex items-center gap-2 text-sm font-semibold ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <Mail size={16} /> Email Address
                </label>
                <input
                  required
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="btyag67@example.com"
                  className={`w-full rounded-2xl px-5 py-4 shadow-inner outline-none transition ${
                    theme === 'dark'
                      ? 'border border-slate-600/40 bg-slate-700/30 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20'
                      : 'border border-slate-200 bg-white/70 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className={`ml-1 text-sm font-semibold ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Phone Number
                </label>
                <input
                  required
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 5678923412"
                  className={`w-full rounded-2xl px-5 py-4 shadow-inner outline-none transition ${
                    theme === 'dark'
                      ? 'border border-slate-600/40 bg-slate-700/30 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20'
                      : 'border border-slate-200 bg-white/70 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className={`ml-1 flex items-center gap-2 text-sm font-semibold ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <MessageSquare size={16} /> Why do you want to join?
              </label>
              <textarea
                required
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Share your interest in Clean2Earn and what excites you about joining early."
                className={`w-full resize-none rounded-2xl px-5 py-4 shadow-inner outline-none transition ${
                  theme === 'dark'
                    ? 'border border-slate-600/40 bg-slate-700/30 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20'
                    : 'border border-slate-200 bg-white/70 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`group relative mt-4 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl py-5 text-lg font-bold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                theme === 'dark'
                  ? 'bg-emerald-600/80 text-white hover:bg-emerald-600'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <span className="relative z-10">{loading ? "Submitting..." : "Request Access"}</span>
              <Send
                size={20}
                className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinBeta;
