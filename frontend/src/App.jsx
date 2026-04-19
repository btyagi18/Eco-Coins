import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Contact from './pages/Contact';
import JoinBeta from './pages/JoinBeta';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const { theme, isDark } = useTheme();
  
  return (
    <div 
      className={`min-h-screen relative w-full overflow-x-hidden selection:bg-primary-light/30 transition-colors duration-500 ${
        isDark
          ? 'bg-slate-950'
          : 'bg-slate-50'
      }`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0f172a 0%, #0d2818 50%, #081b1f 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1fdf4 50%, #ecf4f7 100%)',
      }}
    >
      <AnimatedBackground />

      <Navbar />

      <main className="relative z-10 w-full pt-16 min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-beta" element={<JoinBeta />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
