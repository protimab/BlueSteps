import React, { useState } from "react";
import { Eye, EyeOff, Waves, Mail, Lock } from "lucide-react";

export default function LoginForm({ onLoginSuccess = () => {}, switchToSignup = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLoginSuccess();
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 25%, #0369a1 50%, #075985 75%, #0c4a6e 100%)',
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
        radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(30, 64, 175, 0.1) 0%, transparent 50%)
      `,
      pointerEvents: 'none'
    },
    wrapper: {
      width: '100%',
      maxWidth: '420px',
      position: 'relative',
      zIndex: 10
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    logo: {
      width: '56px',
      height: '56px',
      background: 'linear-gradient(135deg, #1e40af, #0891b2, #06b6d4)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white',
      margin: '0 0 8px 0',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    subtitle: {
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.8)',
      margin: '0',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
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
      fontSize: '24px',
      fontWeight: '700',
      color: '#1e293b',
      margin: '0 0 8px 0'
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
      padding: '14px 14px 14px 44px',
      background: 'rgba(248, 250, 252, 0.8)',
      border: '2px solid rgba(226, 232, 240, 0.8)',
      borderRadius: '12px',
      fontSize: '15px',
      color: '#1e293b',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxSizing: 'border-box',
      outline: 'none',
      backdropFilter: 'blur(10px)'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)',
      background: 'rgba(255, 255, 255, 0.95)'
    },
    inputIcon: {
      position: 'absolute',
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#94a3b8',
      transition: 'color 0.2s'
    },
    eyeButton: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '6px',
      transition: 'all 0.2s'
    },
    error: {
      background: 'rgba(254, 242, 242, 0.9)',
      border: '2px solid rgba(254, 202, 202, 0.8)',
      borderRadius: '12px',
      padding: '14px',
      color: '#dc2626',
      fontSize: '14px',
      backdropFilter: 'blur(10px)'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #2563eb, #0891b2, #06b6d4)',
      color: 'white',
      fontWeight: '600',
      padding: '16px 24px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '15px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    buttonDisabled: {
      opacity: '0.7',
      cursor: 'not-allowed',
      transform: 'none'
    },
    spinner: {
      width: '18px',
      height: '18px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    loadingWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    divider: {
      textAlign: 'center',
      margin: '32px 0 0 0',
      paddingTop: '32px',
      borderTop: '1px solid rgba(241, 245, 249, 0.8)'
    },
    signupText: {
      fontSize: '14px',
      color: '#64748b',
      margin: '0'
    },
    signupLink: {
      color: '#2563eb',
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
      color: 'rgba(255, 255, 255, 0.7)',
      margin: '0',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    }
  };

  const [buttonHover, setButtonHover] = useState(false);
  const [inputFocus, setInputFocus] = useState({ email: false, password: false });

  return (
    <div style={styles.container}>
      <div style={styles.oceanOverlay}></div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes wave-motion {
            0%, 100% { transform: translateY(0px) scaleX(1); }
            50% { transform: translateY(-5px) scaleX(1.1); }
          }
          
          @keyframes jellyfish-float {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
            25% { transform: translateY(-30px) translateX(15px) rotate(3deg); }
            50% { transform: translateY(-15px) translateX(-10px) rotate(-2deg); }
            75% { transform: translateY(-35px) translateX(20px) rotate(2deg); }
          }
          
          @keyframes whale-swim {
            0% { transform: translateX(-150px) translateY(0px) rotate(0deg) scaleX(1); }
            25% { transform: translateX(25vw) translateY(-20px) rotate(2deg) scaleX(1); }
            50% { transform: translateX(50vw) translateY(10px) rotate(-1deg) scaleX(-1); }
            75% { transform: translateX(75vw) translateY(-15px) rotate(1deg) scaleX(-1); }
            100% { transform: translateX(calc(100vw + 150px)) translateY(0px) rotate(0deg) scaleX(-1); }
          }
          
          @keyframes octopus-dance {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            25% { transform: translateY(-25px) rotate(5deg) scale(1.1); }
            50% { transform: translateY(-10px) rotate(-3deg) scale(0.95); }
            75% { transform: translateY(-30px) rotate(4deg) scale(1.05); }
          }
          
          @keyframes shell-bounce {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-40px) rotate(180deg); }
            100% { transform: translateY(0px) rotate(360deg); }
          }
          
          @keyframes fish-school {
            0% { transform: translateX(-100px) translateY(0px) scaleX(1); }
            20% { transform: translateX(20vw) translateY(-15px) scaleX(1); }
            40% { transform: translateX(40vw) translateY(10px) scaleX(-1); }
            60% { transform: translateX(60vw) translateY(-20px) scaleX(-1); }
            80% { transform: translateX(80vw) translateY(5px) scaleX(1); }
            100% { transform: translateX(calc(100vw + 100px)) translateY(0px) scaleX(1); }
          }
          
          @keyframes bubble-rise {
            0% { transform: translateY(100vh) scale(0.3); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
          }
          
          @keyframes coral-sway {
            0%, 100% { transform: rotate(0deg) scaleY(1); }
            25% { transform: rotate(4deg) scaleY(1.08); }
            75% { transform: rotate(-3deg) scaleY(0.95); }
          }
          
          @keyframes seaweed-flow {
            0%, 100% { transform: rotate(-2deg) scaleX(1); }
            50% { transform: rotate(5deg) scaleX(1.1); }
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
        {/* Jellyfish */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          animation: 'jellyfish-float 10s ease-in-out infinite',
          opacity: 0.7,
          fontSize: '2em',
          filter: 'drop-shadow(0 0 10px rgba(147, 197, 253, 0.5))'
        }}>
          🪼
        </div>
        
        <div style={{
          position: 'absolute',
          top: '65%',
          right: '12%',
          animation: 'jellyfish-float 8s ease-in-out infinite 3s',
          opacity: 0.6,
          fontSize: '1.8em',
          filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))'
        }}>
          🪼
        </div>
        
        {/* Whale */}
        <div style={{
          position: 'absolute',
          top: '30%',
          animation: 'whale-swim 35s linear infinite',
          opacity: 0.8,
          fontSize: '2.5em',
          filter: 'drop-shadow(0 0 15px rgba(30, 64, 175, 0.3))'
        }}>
          🐋
        </div>
        
        {/* Octopus */}
        <div style={{
          position: 'absolute',
          top: '45%',
          left: '15%',
          animation: 'octopus-dance 7s ease-in-out infinite',
          opacity: 0.7,
          fontSize: '2.2em',
          filter: 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.4))'
        }}>
          🐙
        </div>
        
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '25%',
          animation: 'octopus-dance 9s ease-in-out infinite 4s',
          opacity: 0.6,
          fontSize: '1.8em',
          filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.3))'
        }}>
          🐙
        </div>
        
        {/* Shells */}
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '25%',
          animation: 'shell-bounce 6s ease-in-out infinite',
          opacity: 0.8,
          fontSize: '1.5em',
          filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))'
        }}>
          🐚
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '35%',
          right: '30%',
          animation: 'shell-bounce 8s ease-in-out infinite 2s',
          opacity: 0.7,
          fontSize: '1.8em',
          filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))'
        }}>
          🐚
        </div>
        
        {/* Fish */}
        <div style={{
          position: 'absolute',
          top: '55%',
          animation: 'fish-school 28s linear infinite',
          opacity: 0.7,
          fontSize: '1.6em',
          filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))'
        }}>
          🐠
        </div>
        
        <div style={{
          position: 'absolute',
          top: '25%',
          animation: 'fish-school 22s linear infinite 8s',
          opacity: 0.6,
          fontSize: '1.4em',
          filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.3))'
        }}>
          🐟
        </div>
        
        <div style={{
          position: 'absolute',
          top: '70%',
          animation: 'fish-school 25s linear infinite 5s',
          opacity: 0.8,
          fontSize: '1.7em',
          filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.4))'
        }}>
          🐡
        </div>
        
        {/* Bubbles */}
        <div style={{
          position: 'absolute',
          left: '18%',
          animation: 'bubble-rise 14s ease-in-out infinite',
          fontSize: '2.5em',
          opacity: 0.5
        }}>
          🫧
        </div>
        
        <div style={{
          position: 'absolute',
          left: '65%',
          animation: 'bubble-rise 18s ease-in-out infinite 4s',
          fontSize: '2em',
          opacity: 0.6
        }}>
          🫧
        </div>
        
        <div style={{
          position: 'absolute',
          left: '82%',
          animation: 'bubble-rise 12s ease-in-out infinite 7s',
          fontSize: '1.8em',
          opacity: 0.4
        }}>
          🫧
        </div>
        
        <div style={{
          position: 'absolute',
          left: '35%',
          animation: 'bubble-rise 16s ease-in-out infinite 10s',
          fontSize: '2.2em',
          opacity: 0.5
        }}>
          🫧
        </div>
        
        {/* Corals */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '5%',
          animation: 'coral-sway 6s ease-in-out infinite',
          opacity: 0.4,
          fontSize: '2.5em',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.3))'
        }}>
          🪸
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: '8%',
          animation: 'coral-sway 8s ease-in-out infinite 2s',
          opacity: 0.35,
          fontSize: '2.2em',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))'
        }}>
          🪸
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '45%',
          animation: 'coral-sway 7s ease-in-out infinite 4s',
          opacity: 0.3,
          fontSize: '2.8em',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.3))'
        }}>
          🪸
        </div>
        
        {/* Seaweed */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '20%',
          animation: 'seaweed-flow 5s ease-in-out infinite',
          opacity: 0.3,
          fontSize: '3em',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))'
        }}>
          🌿
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: '25%',
          animation: 'seaweed-flow 6s ease-in-out infinite 3s',
          opacity: 0.25,
          fontSize: '2.5em',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.3))'
        }}>
          🌿
        </div>
        
        {/* Waves */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '70%',
          animation: 'wave-motion 4s ease-in-out infinite',
          opacity: 0.4,
          fontSize: '2em',
          filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'
        }}>
          🌊
        </div>
        
        <div style={{
          position: 'absolute',
          top: '80%',
          left: '10%',
          animation: 'wave-motion 5s ease-in-out infinite 2s',
          opacity: 0.3,
          fontSize: '1.8em',
          filter: 'drop-shadow(0 0 6px rgba(147, 197, 253, 0.4))'
        }}>
          🌊
        </div>
      </div>
      
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <Waves size={28} color="white" />
          </div>
          <h1 style={styles.title}>BlueSteps</h1>
          <p style={styles.subtitle}>Ocean sustainability at your fingertips</p>
        </div>

        {/* Login Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Welcome back 🌊</h2>
            <p style={styles.cardSubtitle}>Continue your ocean conservation journey</p>
          </div>

          <div style={styles.form}>
            {/* Email */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} style={{
                  ...styles.inputIcon,
                  color: inputFocus.email ? '#3b82f6' : '#94a3b8'
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
                  color: inputFocus.password ? '#3b82f6' : '#94a3b8'
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setInputFocus(prev => ({ ...prev, password: true }))}
                  onBlur={() => setInputFocus(prev => ({ ...prev, password: false }))}
                  required
                  style={{
                    ...styles.input,
                    paddingRight: '50px',
                    ...(inputFocus.password ? styles.inputFocus : {})
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#64748b';
                    e.target.style.background = 'rgba(59, 130, 246, 0.1)';
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
                {error}
              </div>
            )}

            {/* Login Button */}
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
                  <span>Diving in...</span>
                </div>
              ) : (
                "Dive In"
              )}
            </button>
          </div>

          {/* Sign Up */}
          <div style={styles.divider}>
            <p style={styles.signupText}>
              New to our ocean community?{" "}
              <button
                onClick={switchToSignup}
                style={styles.signupLink}
                onMouseEnter={(e) => {
                  e.target.style.color = '#1d4ed8';
                  e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#2563eb';
                  e.target.style.background = 'none';
                }}
              >
                Join the wave
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            🐋 Join thousands making waves for ocean conservation 🌊
          </p>
        </div>
      </div>
    </div>
  );
}