import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Compass, Mail, Lock, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { login, loginAsDemoComplete, loginAsDemoFresh } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("alex.rivera@university.edu");
  const [password, setPassword] = useState("••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const loggedUser = login(email, password, rememberMe);
      setIsLoading(false);

      if (loggedUser.onboardingComplete) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    }, 400);
  };

  const handleQuickDemoComplete = () => {
    loginAsDemoComplete();
    navigate("/dashboard");
  };

  const handleQuickDemoFresh = () => {
    loginAsDemoFresh();
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-indigo-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-heading font-extrabold text-slate-900">
              Student Login
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Access your personalized recommendations & application pipeline
            </p>
          </div>

          {/* Quick 1-Click Demo Login Buttons */}
          <div className="mb-6 p-3 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-100 rounded-2xl">
            <div className="text-[11px] font-bold text-indigo-900 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Instant 1-Click Demo Logins</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickDemoComplete}
                className="p-2 text-left bg-white hover:bg-indigo-50/60 border border-indigo-200 rounded-xl transition-all shadow-2xs cursor-pointer"
              >
                <div className="text-[11px] font-bold text-slate-900 truncate">Alex Rivera</div>
                <div className="text-[10px] text-emerald-600 font-semibold">94% Complete Profile →</div>
              </button>
              <button
                type="button"
                onClick={handleQuickDemoFresh}
                className="p-2 text-left bg-white hover:bg-purple-50/60 border border-purple-200 rounded-xl transition-all shadow-2xs cursor-pointer"
              >
                <div className="text-[11px] font-bold text-slate-900 truncate">Rohan Sharma</div>
                <div className="text-[10px] text-amber-600 font-semibold">Fresh Onboarding →</div>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl mb-4">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => alert("Mock password reset link sent to " + email)}
                  className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 cursor-pointer"
                />
                <span className="text-xs text-slate-600">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-xs font-heading font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign In to Portal"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-indigo-600 hover:underline">
              Create student account
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
