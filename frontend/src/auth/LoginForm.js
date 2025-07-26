import React, { useState } from "react";
import { Eye, EyeOff, Waves, Mail, Lock } from "lucide-react";

export default function LoginForm({ onLoginSuccess, switchToSignup }) {
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
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    wrapper: {
      width: '100%',
      maxWidth: '400px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    logo: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #2563eb, #0891b2)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: '0 0 4px 0'
    },
    subtitle: {
      fontSize: '14px',
      color: '#64748b',
      margin: '0'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f1f5f9',
      padding: '32px'
    },
    cardHeader: {
      marginBottom: '24px'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0 0 4px 0'
    },
    cardSubtitle: {
      fontSize: '14px',
      color: '#64748b',
      margin: '0'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      display: 'block'
    },
    inputWrapper: {
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '12px 12px 12px 40px',
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#1e293b',
      transition: 'all 0.2s',
      boxSizing: 'border-box',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#94a3b8'
    },
    eyeButton: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      padding: '4px',
      transition: 'color 0.2s'
    },
    error: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      padding: '12px',
      color: '#dc2626',
      fontSize: '14px'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #2563eb, #0891b2)',
      color: 'white',
      fontWeight: '500',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    buttonHover: {
      background: 'linear-gradient(135deg, #1d4ed8, #0e7490)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    buttonDisabled: {
      opacity: '0.5',
      cursor: 'not-allowed'
    },
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    loadingWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    divider: {
      textAlign: 'center',
      margin: '24px 0',
      paddingTop: '24px',
      borderTop: '1px solid #f1f5f9'
    },
    signupText: {
      fontSize: '14px',
      color: '#64748b',
      margin: '0'
    },
    signupLink: {
      color: '#2563eb',
      fontWeight: '500',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    footer: {
      textAlign: 'center',
      marginTop: '24px'
    },
    footerText: {
      fontSize: '12px',
      color: '#94a3b8',
      margin: '0'
    }
  };

  const [buttonHover, setButtonHover] = useState(false);
  const [inputFocus, setInputFocus] = useState({ email: false, password: false });

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes jellyfish-float {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
            25% { transform: translateY(-20px) translateX(10px) rotate(2deg); }
            50% { transform: translateY(-10px) translateX(-5px) rotate(-1deg); }
            75% { transform: translateY(-25px) translateX(15px) rotate(1deg); }
          }
          
          @keyframes turtle-swim {
            0% { transform: translateX(-100px) translateY(0px) rotate(0deg); }
            25% { transform: translateX(calc(25vw)) translateY(-10px) rotate(2deg); }
            50% { transform: translateX(calc(50vw)) translateY(5px) rotate(-1deg); }
            75% { transform: translateX(calc(75vw)) translateY(-5px) rotate(1deg); }
            100% { transform: translateX(calc(100vw + 100px)) translateY(0px) rotate(0deg); }
          }
          
          @keyframes bubble-rise {
            0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { transform: translateY(-100px) scale(1.2); opacity: 0; }
          }
          
          @keyframes seaweed-sway {
            0%, 100% { transform: rotate(0deg) scaleY(1); }
            50% { transform: rotate(3deg) scaleY(1.05); }
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
          top: '20%',
          left: '10%',
          animation: 'jellyfish-float 8s ease-in-out infinite',
          opacity: 0.6
        }}>
          🪼
        </div>
        
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          animation: 'jellyfish-float 6s ease-in-out infinite 2s',
          opacity: 0.5,
          fontSize: '0.8em'
        }}>
          🪼
        </div>
        
        {/* Turtle */}
        <div style={{
          position: 'absolute',
          top: '40%',
          animation: 'turtle-swim 25s linear infinite',
          opacity: 0.7,
          fontSize: '1.2em'
        }}>
          🐢
        </div>
        
        {/* Bubbles */}
        <div style={{
          position: 'absolute',
          left: '20%',
          animation: 'bubble-rise 12s ease-in-out infinite',
          fontSize: '0.5em',
          opacity: 0.4
        }}>
          ○
        </div>
        
        <div style={{
          position: 'absolute',
          left: '70%',
          animation: 'bubble-rise 15s ease-in-out infinite 3s',
          fontSize: '0.3em',
          opacity: 0.5
        }}>
          ○
        </div>
        
        <div style={{
          position: 'absolute',
          left: '85%',
          animation: 'bubble-rise 10s ease-in-out infinite 6s',
          fontSize: '0.4em',
          opacity: 0.3
        }}>
          ○
        </div>
        
        {/* Plant */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '5%',
          animation: 'seaweed-sway 4s ease-in-out infinite',
          opacity: 0.3,
          fontSize: '2em',
          transformOrigin: 'bottom center'
        }}>
          🌱
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: '8%',
          animation: 'seaweed-sway 5s ease-in-out infinite 1s',
          opacity: 0.25,
          fontSize: '1.5em',
          transformOrigin: 'bottom center'
        }}>
          🌱
        </div>
        
        {/* Fish */}
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '20%',
          animation: 'turtle-swim 20s linear infinite reverse 5s',
          opacity: 0.4,
          fontSize: '0.8em'
        }}>
          🐠
        </div>
      </div>
      
      <div style={{...styles.wrapper, position: 'relative', zIndex: 10}}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <Waves size={24} color="white" />
          </div>
          <h1 style={styles.title}>BlueSteps</h1>
          <p style={styles.subtitle}>Ocean sustainability at your fingertips</p>
        </div>

        {/* Login Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Welcome back</h2>
            <p style={styles.cardSubtitle}>Continue your ocean conservation journey</p>
          </div>

          <div style={styles.form}>
            {/* Email */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputWrapper}>
                <Mail size={16} style={styles.inputIcon} />
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
                <Lock size={16} style={styles.inputIcon} />
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
                    paddingRight: '44px',
                    ...(inputFocus.password ? styles.inputFocus : {})
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  onMouseEnter={(e) => e.target.style.color = '#64748b'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          {/* Sign Up */}
          <div style={styles.divider}>
            <p style={styles.signupText}>
              Don't have an account?{" "}
              <button
                onClick={switchToSignup}
                style={styles.signupLink}
                onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.color = '#2563eb'}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Join the community dedicated to ocean sustainability
          </p>
        </div>
      </div>
    </div>
  );
}