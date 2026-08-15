import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider, useGame } from './context/GameContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastAlert from './components/ToastAlert';
import LandingPage from './pages/LandingPage';
import PlayPage from './pages/PlayPage';

function AppContent() {
  const { activeTab, toast } = useGame();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {activeTab === 'landing' ? <LandingPage /> : <PlayPage />}
      </main>

      <ToastAlert toast={toast} />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </ThemeProvider>
  );
}
