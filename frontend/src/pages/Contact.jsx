import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import api from '../lib/api';

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
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

      await api.post("/api/contact", form);

      toast.success("Message sent", "Thanks for reaching out. We'll get back to you soon.");

      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch (err) {
      toast.error("Could not send message", err?.response?.data?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col lg:flex-row gap-16 relative overflow-hidden ${
      theme === 'dark' ? 'bg-slate-900/20' : 'bg-slate-50/30'
    }`}>
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-[100px] z-[-1]" />
      <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-[120px] z-[-1]" />

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 space-y-12"
      >
        <div>
          <h1 className={`text-5xl md:text-6xl font-extrabold mb-6 tracking-tight ${
            theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Get in Touch
          </h1>
          <p className={`max-w-lg text-lg md:text-xl leading-relaxed ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Have questions about Clean2Earn, collaboration ideas, or feedback for the team?
            Send us a message and we will get back to you soon.
          </p>
        </div>

        <div className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`glass flex items-center gap-5 rounded-3xl p-6 transition-transform border ${
              theme === 'dark'
                ? 'border-emerald-500/10'
                : 'border-emerald-400/20'
            }`}
          >
            <div className={`rounded-2xl p-4 ${
              theme === 'dark'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-emerald-100/60 text-emerald-600'
            }`}>
              <Mail size={26} />
            </div>
            <div>
              <p className={`mb-1 text-sm font-medium ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-600'
              }`}>Email Us</p>
              <p className={`text-lg font-bold ${
                theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
              }`}>tyagi.bhumika24@gmail.com</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`glass flex items-center gap-5 rounded-3xl p-6 transition-transform border ${
              theme === 'dark'
                ? 'border-cyan-500/10'
                : 'border-cyan-400/20'
            }`}
          >
            <div className={`rounded-2xl p-4 ${
              theme === 'dark'
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'bg-cyan-100/60 text-cyan-600'
            }`}>
              <MapPin size={26} />
            </div>
            <div>
              <p className={`mb-1 text-sm font-medium ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-600'
              }`}>Visit Us</p>
              <p className={`text-lg font-bold leading-tight ${
                theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
              }`}>
                KCC Institute of Technology
                <br />
                and Management
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`glass flex items-center gap-5 rounded-3xl p-6 transition-transform border ${
              theme === 'dark'
                ? 'border-violet-500/10'
                : 'border-violet-400/20'
            }`}
          >
            <div className={`rounded-2xl p-4 ${
              theme === 'dark'
                ? 'bg-violet-500/10 text-violet-400'
                : 'bg-violet-100/60 text-violet-600'
            }`}>
              <Phone size={26} />
            </div>
            <div>
              <p className={`mb-1 text-sm font-medium ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-600'
              }`}>Call Us</p>
              <p className={`text-lg font-bold ${
                theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
              }`}>+91 9953195428</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1"
      >
        <div className={`glass relative overflow-hidden rounded-3xl p-8 md:p-12 border ${
          theme === 'dark'
            ? 'border-emerald-500/10'
            : 'border-emerald-400/20'
        }`}>
          <div className={`pointer-events-none absolute inset-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-slate-400/5 to-transparent'
              : 'bg-gradient-to-br from-white/60 to-transparent'
          }`} />
          <h2 className={`relative z-10 mb-8 text-3xl font-bold ${
            theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Send us a Message
          </h2>

          <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className={`ml-1 text-sm font-medium ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Your Full Name here"
                className={`w-full rounded-2xl px-5 py-4 shadow-inner outline-none transition ${
                  theme === 'dark'
                    ? 'border border-slate-600/40 bg-slate-700/30 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20'
                    : 'border border-slate-200 bg-white/70 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className={`ml-1 text-sm font-medium ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="yourname@example.com"
                className={`w-full rounded-2xl px-5 py-4 shadow-inner outline-none transition ${
                  theme === 'dark'
                    ? 'border border-slate-600/40 bg-slate-700/30 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20'
                    : 'border border-slate-200 bg-white/70 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className={`ml-1 text-sm font-medium ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="How can we help you?"
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
              className={`group mt-4 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-lg font-bold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                theme === 'dark'
                  ? 'bg-emerald-600/80 text-white hover:bg-emerald-600'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
              <Send size={20} className={loading ? "" : "transition-transform group-hover:translate-x-1"} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
