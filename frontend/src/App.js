import React, { useState, useEffect } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';

import OceanMap from './components/BlueOceanMap';
import Habits from './components/Habits';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignUpForm';
import { logout } from './auth/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  function handleSignupSuccess() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    logout();
    setIsLoggedIn(false);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-500 to-sky-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="App">
        {showSignup ? (
          <SignupForm
            onSignupSuccess={handleSignupSuccess}
            switchToLogin={() => setShowSignup(false)}
          />
        ) : (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            switchToSignup={() => setShowSignup(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">BlueSteps Ocean Map</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Habits />
          </div>
          <div>
            <OceanMap />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;