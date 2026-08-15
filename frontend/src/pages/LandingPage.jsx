import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import DeveloperSection from '../components/DeveloperSection';
import { useGame } from '../context/GameContext';

export default function LandingPage() {
  const { startGame } = useGame();

  return (
    <div>
      <HeroSection onPlayClick={startGame} />
      <AboutSection />
      <FeaturesSection />
      <DeveloperSection />
    </div>
  );
}
