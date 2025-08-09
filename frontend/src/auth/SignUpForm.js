import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Anchor } from "lucide-react";
import { signup } from "./auth"; 

export default function SignupForm({ onSignupSuccess = () => {}, switchToLogin = () => {} }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await signup(email, password, name); 
      onSignupSuccess?.();
    } catch {
      setError("Signup failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Anchor size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">Join BlueSteps</h1>
          <p className="text-white/80 text-base">Start your ocean conservation adventure</p>
        </div>

        {/*signup bg */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">Create Your Account</h2>
            <p className="text-slate-600 text-sm">Join the community dedicated to ocean sustainability</p>
          </div>

          <div className="space-y-5">
            {/* name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  name ? 'text-cyan-500' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/*email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  email ? 'text-cyan-500' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  password ? 'text-cyan-500' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* signup button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* login */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <button
                onClick={switchToLogin}
                className="text-cyan-600 font-medium hover:text-cyan-800 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-white/70">
            Join thousands making a difference for our oceans
          </p>
        </div>
      </div>
    </div>
  );
}