// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useToast } from "../context/ToastContext";
// import api from "../lib/api";

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });
//   const navigate = useNavigate();
//   const toast = useToast();

//   const handleSignup = async () => {
//     try {
//       await api.post("/api/auth/register", form);
//       toast.success("Signup successful", "Your account has been created. Please log in.");
//       navigate("/login");
//     } catch (err) {
//       toast.error("Signup failed", err.response?.data?.message || "Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white">
//       <div className="glass p-10 rounded-3xl w-[420px] shadow-2xl">
//         <h2 className="text-3xl font-bold mb-8 text-center">
//           Create Account
//         </h2>

//         <input
//           className="w-full p-4 mb-4 rounded-xl bg-white/10 border border-white/10"
//           placeholder="Full Name"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           className="w-full p-4 mb-4 rounded-xl bg-white/10 border border-white/10"
//           placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           className="w-full p-4 mb-6 rounded-xl bg-white/10 border border-white/10"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button
//           onClick={handleSignup}
//           className="w-full bg-emerald-500 hover:bg-emerald-400 py-4 rounded-xl font-bold"
//         >
//           Sign Up
//         </button>

//         <p className="mt-6 text-center text-sm text-slate-300">
//           Already have an account?{" "}
//           <Link to="/login" className="font-semibold text-emerald-400 hover:text-emerald-300">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }









import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useToast } from "../context/ToastContext";
import api from "../lib/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = async () => {
    setLoading(true);
    try {
      await api.post("/api/auth/register", form);
      toast.success("Account created", "Please log in to start earning.");
      navigate("/login");
    } catch (err) {
      toast.error("Signup failed", err.response?.data?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-12"
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.3) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md relative"
      >
        <div className="rounded-3xl p-8 md:p-10"
          style={{
            background: 'rgba(1,18,8,0.85)',
            border: '1px solid rgba(16,185,129,0.2)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(16,185,129,0.08)',
          }}
        >
          <div className="absolute top-0 left-6 right-6 h-px rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)' }}
          />

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(13,148,136,0.15))',
                border: '1px solid rgba(16,185,129,0.3)',
                boxShadow: '0 0 30px rgba(16,185,129,0.2)',
              }}
            >
              <Leaf size={22} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Create account</h2>
            <p className="text-slate-500 text-sm mt-1">Join the Clean2Earn movement</p>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Full name"
                className="eco-input pl-11"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                placeholder="Email address"
                className="eco-input pl-11"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="eco-input pl-11 pr-12"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="btn-eco-primary w-full justify-center mt-6 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 rounded-full"
                style={{ border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff' }}
              />
            ) : (
              <>Create Account <ArrowRight size={18} /></>
            )}
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}