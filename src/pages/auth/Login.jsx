import { motion } from "framer-motion";
import { useState } from "react";
import { HiEye, HiEyeOff, HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import useLogin from "../../hooks/useLogin";
import showToast from "../../utils/toast";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ userName, password });
      if (!res.success) {
        showToast(res?.data?.error || "Login failed", "error");
      } else {
        showToast("Welcome back to NexusNews!", "success");
      }
    } catch (err) {
      console.log(err);
      showToast("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* LEFT SIDE - BRANDING */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-900 p-10 flex flex-col justify-between overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-primary-400 opacity-30 rounded-full blur-2xl mix-blend-overlay"></div>
          
          <div className="relative z-10 flex items-center justify-start">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-extrabold text-white tracking-tight cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              NexusNews
              <span className="text-primary-300">.</span>
            </motion.div>
          </div>
          
          <div className="relative z-10 mt-20 md:mt-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Your portal to <br />
                <span className="text-primary-200">the world's stories.</span>
              </h1>
              <p className="text-primary-100 text-lg md:text-xl font-light leading-relaxed max-w-sm">
                Login to the administrative dashboard to manage content, authors, and breaking news.
              </p>
            </motion.div>
          </div>
          
          <div className="relative z-10 text-primary-200 text-sm font-medium opacity-80 pt-10">
            © {new Date().getFullYear()} NexusNews. All rights reserved.
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-base mb-10">
              Please enter your credentials to access your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineUser className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="admin"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-700 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-slate-700 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary-500 transition-colors"
                  >
                    {showPassword ? (
                      <HiEyeOff className="h-5 w-5" />
                    ) : (
                      <HiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:opacity-70 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(var(--color-primary-600),0.5)] hover:shadow-[0_12px_25px_-6px_rgba(var(--color-primary-600),0.6)] mt-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
