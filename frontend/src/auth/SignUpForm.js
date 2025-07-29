import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Anchor, Sparkles } from "lucide-react";
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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 25%, #0e7490 50%, #155e75 75%, #164e63 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    oceanOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(14, 116, 144, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(21, 94, 117, 0.2) 0%, transparent 50%)
      `,
      pointerEvents: 'none'
    },
    wrapper: {
      width: '100%',
      maxWidth: '440px',
      position: 'relative',
      zIndex: 10
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    logo: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)',
      borderRadius: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      animation: 'logo-glow 3s ease-in-out infinite'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: 'white',
      margin: '0 0 8px 0',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    subtitle: {
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.85)',
      margin: '0',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.96)',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '40px',
      backdropFilter: 'blur(20px)'
    },
    cardHeader: {
      marginBottom: '32px',
      textAlign: 'center'
    },
    cardTitle: {
      fontSize: '26px',
      fontWeight: '700',
      color: '#1e293b',
      margin: '0 0 8px 0',
      background: 'linear-gradient(135deg, #0891b2, #06b6d4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    cardSubtitle: {
      fontSize: '15px',
      color: '#64748b',
      margin: '0'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      display: 'block'
    },
    inputWrapper: {
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '16px 16px 16px 48px',
      background: 'rgba(248, 250, 252, 0.9)',
      border: '2px solid rgba(226, 232, 240, 0.8)',
      borderRadius: '14px',
      fontSize: '15px',
      color: '#1e293b',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxSizing: 'border-box',
      outline: 'none',
      backdropFilter: 'blur(10px)'
    },
    inputFocus: {
      borderColor: '#0891b2',
      boxShadow: '0 0 0 4px rgba(8, 145, 178, 0.1)',
      background: 'rgba(255, 255, 255, 0.98)',
      transform: 'translateY(-1px)'
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#94a3b8',
      transition: 'color 0.2s'
    },
    eyeButton: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      padding: '6px',
      borderRadius: '8px',
      transition: 'all 0.2s'
    },
    error: {
      background: 'rgba(254, 242, 242, 0.95)',
      border: '2px solid rgba(254, 202, 202, 0.8)',
      borderRadius: '14px',
      padding: '16px',
      color: '#dc2626',
      fontSize: '14px',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)',
      color: 'white',
      fontWeight: '600',
      padding: '18px 24px',
      borderRadius: '14px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      background: 'linear-gradient(135deg, #0e7490, #0891b2, #06b6d4)'
    },
    buttonDisabled: {
      opacity: '0.7',
      cursor: 'not-allowed',
      transform: 'none'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    loadingWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },
    divider: {
      textAlign: 'center',
      margin: '32px 0 0 0',
      paddingTop: '32px',
      borderTop: '1px solid rgba(241, 245, 249, 0.8)'
    },
    loginText: {
      fontSize: '14px',
      color: '#64748b',
      margin: '0'
    },
    loginLink: {
      color: '#0891b2',
      fontWeight: '600',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'color 0.2s',
      padding: '2px 4px',
      borderRadius: '4px'
    },
    footer: {
      textAlign: 'center',
      marginTop: '24px'
    },
    footerText: {
      fontSize: '13px',
      color: 'rgba(255, 255, 255, 0.75)',
      margin: '0',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    }
  };

  const [buttonHover, setButtonHover] = useState(false);
  const [inputFocus, setInputFocus] = useState({ name: false, email: false, password: false });

  return (
    <div style={styles.container}>
      <div style={styles.oceanOverlay}></div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes logo-glow {
            0%, 100% { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 20px rgba(34, 211, 238, 0.3); }
            50% { box-shadow: 0 25px 30px -5px rgba(0, 0, 0, 0.15), 0 0 30px rgba(34, 211, 238, 0.5); }
          }
          
          @keyframes dolphin {
            0% { transform: translateX(-120px) translateY(20px) rotate(0deg) scaleX(1); }
            15% { transform: translateX(15vw) translateY(-30px) rotate(-15deg) scaleX(1); }
            30% { transform: translateX(30vw) translateY(-50px) rotate(-25deg) scaleX(1); }
            45% { transform: translateX(45vw) translateY(-30px) rotate(-10deg) scaleX(1); }
            60% { transform: translateX(60vw) translateY(10px) rotate(5deg) scaleX(-1); }
            75% { transform: translateX(75vw) translateY(-20px) rotate(-5deg) scaleX(-1); }
            100% { transform: translateX(calc(100vw + 120px)) translateY(20px) rotate(0deg) scaleX(-1); }
          }
          
          @keyframes crab {
            0% { transform: translateX(-80px) rotate(0deg) scaleX(1); }
            25% { transform: translateX(25vw) rotate(5deg) scaleX(1); }
            50% { transform: translateX(50vw) rotate(-3deg) scaleX(-1); }
            75% { transform: translateX(75vw) rotate(4deg) scaleX(-1); }
            100% { transform: translateX(calc(100vw + 80px)) rotate(0deg) scaleX(-1); }
          }
          
          @keyframes flowers-footer {
            0%, 100% { transform: rotate(-3deg) scaleY(1); }
            33% { transform: rotate(5deg) scaleY(1.1); }
            66% { transform: rotate(-4deg) scaleY(0.95); }
          }
        `}
      </style>
      
      {/* Ocean Animations */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {/* Dolphins */}
        <div style={{
          position: 'absolute',
          top: '40%',
          animation: 'dolphin 30s linear infinite',
          opacity: 0.9,
          fontSize: '2.8em',
          filter: 'drop-shadow(0 0 18px rgba(59, 130, 246, 0.4))'
        }}>
          🐬
        </div>
        
        <div style={{
          position: 'absolute',
          top: '60%',
          animation: 'dolphin 35s linear infinite 12s',
          opacity: 0.8,
          fontSize: '2.4em',
          filter: 'drop-shadow(0 0 15px rgba(147, 197, 253, 0.5))'
        }}>
          🐬
        </div>
        
        {/* Crabs */}
        <div style={{
          position: 'absolute',
          bottom: '15%',
          animation: 'crab 25s linear infinite',
          opacity: 0.8,
          fontSize: '1.8em',
          filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.4))'
        }}>
          🦀
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '8%',
          animation: 'crab  20s linear infinite 8s',
          opacity: 0.7,
          fontSize: '1.5em',
          filter: 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.3))'
        }}>
          🦀
        </div>

        {/* Flowers Footer */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '8%',
          animation: 'flowers-footer 7s ease-in-out infinite',
          opacity: 0.4,
          fontSize: '2.5em',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.4))'
        }}>
          🌺
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: '15%',
          animation: 'flowers-footer 9s ease-in-out infinite 3s',
          opacity: 0.35,
          fontSize: '2.8em',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.4))'
        }}>
          🌺
        </div>

      </div>
      
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <Anchor size={30} color="white" />
          </div>
          <h1 style={styles.title}>Join BlueSteps</h1>
          <p style={styles.subtitle}>Start your ocean conservation adventure</p>
        </div>

        {/* Signup Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Create Your Account</h2>
            <p style={styles.cardSubtitle}>Dive into a community that cares about our oceans</p>
          </div>

          <div style={styles.form}>
            {/* Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <User size={18} style={{
                  ...styles.inputIcon,
                  color: inputFocus.name ? '#0891b2' : '#94a3b8'
                }} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setInputFocus(prev => ({ ...prev, name: true }))}
                  onBlur={() => setInputFocus(prev => ({ ...prev, name: false }))}
                  required
                  style={{
                    ...styles.input,
                    ...(inputFocus.name ? styles.inputFocus : {})
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} style={{
                  ...styles.inputIcon,
                  color: inputFocus.email ? '#0891b2' : '#94a3b8'
                }} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setInputFocus(prev => ({ ...prev, email: true }))}
                  onBlur={() => setInputFocus(prev => ({ ...prev, email: false }))}
                  required
                  style={{
                    ...styles.input,
                    ...(inputFocus.email ? styles.inputFocus : {})
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={18} style={{
                  ...styles.inputIcon,
                  color: inputFocus.password ? '#0891b2' : '#94a3b8'
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setInputFocus(prev => ({ ...prev, password: true }))}
                  onBlur={() => setInputFocus(prev => ({ ...prev, password: false }))}
                  required
                  style={{
                    ...styles.input,
                    paddingRight: '52px',
                    ...(inputFocus.password ? styles.inputFocus : {})
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#64748b';
                    e.target.style.background = 'rgba(8, 145, 178, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#94a3b8';
                    e.target.style.background = 'none';
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={styles.error}>
                <Sparkles size={16} />
                {error}
              </div>
            )}

            {/* Signup Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                ...styles.button,
                ...(buttonHover && !isLoading ? styles.buttonHover : {}),
                ...(isLoading ? styles.buttonDisabled : {})
              }}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              {isLoading ? (
                <div style={styles.loadingWrapper}>
                  <div style={styles.spinner}></div>
                  <span>Creating your account...</span>
                </div>
              ) : (
                "Start Your Ocean Journey"
              )}
            </button>
          </div>

          {/* Login Link */}
          <div style={styles.divider}>
            <p style={styles.loginText}>
              Already part of our ocean family?{" "}
              <button
                onClick={switchToLogin}
                style={styles.loginLink}
                onMouseEnter={(e) => {
                  e.target.style.color = '#0e7490';
                  e.target.style.background = 'rgba(8, 145, 178, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#0891b2';
                  e.target.style.background = 'none';
                }}
              >
                Welcome back
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            🌊 Ready to make waves for ocean conservation? 🐬
          </p>
        </div>
      </div>
    </div>
  );
}