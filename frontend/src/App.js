import React, { useState } from 'react';
import './App.css';
import Welcome from './Welcome';
import Login from './Login';
import DesignOverlay from './components/DesignOverlay';
import RakePlanner from './RakePlanner';
import RouteSchedule from './RouteSchedule';
import Alerts from './Alerts';
import RecentPlansPanel from './RecentPlansPanel';
import CreateAlertPanel from './CreateAlertPanel';
import SeedDBButton from './components/SeedDBButton';
import ReportsAnalytics from './ReportsAnalytics';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [user, setUser] = useState(null);

  if (screen === 'welcome') {
    return (
      <>
        <Welcome onContinue={() => setScreen('login')} />
        <DesignOverlay />
      </>
    );
  }

  if (screen === 'login') {
    return (
      <>
        <Login onLogin={(u) => { setUser(u); setScreen('dashboard'); }} />
        <DesignOverlay />
      </>
    );
  }

  return (
    <div className="App">
      <h2>Logged in</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16 }}>
        <div>
          <RouteSchedule />
          <div style={{ marginTop: 16 }}>
            <ReportsAnalytics />
          </div>
        </div>
        <div>
          <RakePlanner />
          <div style={{ marginTop: 16 }}>
            <Alerts />
          </div>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <RecentPlansPanel />
            <CreateAlertPanel />
          </div>
          <div style={{ marginTop: 16 }}>
            {user && ['admin', 'manager'].includes(user.role) && <SeedDBButton />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
