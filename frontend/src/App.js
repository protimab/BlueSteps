import React, { useState, useEffect } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';

import OceanMap from './components/BlueOceanMap';
import Habits from './components/Habits';
import CommunityDashboard from './components/CommunityDashboard';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignUpForm';
import { logout } from './auth/auth';
import { Users, Map, User } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('habits');

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

  const navigationItems = [
    { id: 'habits', label: 'My Habits', icon: User },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'map', label: 'Ocean Map', icon: Map },
  ];

  return (
    <div className="App min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">BlueSteps Ocean Map
              <span className="text-3xl mr-2">🌊</span>
            </h1>
              BlueSteps Ocean Conservation
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
            Logout
            </button>
          </div>

          <nav className="mt-4">
            <div className="flex space-x-1">
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setCurrentView(id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'habits' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Habits />
            </div>
            <div>
              <OceanMap />
            </div>
          </div>
        )}
        {currentView === 'community' && <CommunityDashboard />}
        {currentView === 'map' && (
          <div className="max-w-4xl mx-auto">
            <OceanMap />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;