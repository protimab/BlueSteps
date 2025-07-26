// App.js
import React, { useState } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';

import OceanMap from './components/BlueOceanMap';
import Habits from './components/Habits';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignUpForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  function handleSignupSuccess() {
    setIsLoggedIn(true);
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
    <div className="App">
      <h1>BlueSteps Ocean Map</h1>
      <Habits />
      <OceanMap />
    </div>
  );
}

export default App;
