import { useState } from 'react';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { MainLayout } from './components/layout/MainLayout';
import { HeroSection } from './features/portfolio/HeroSection';
import { ExperienceSection } from './features/portfolio/ExperienceSection';
import { ProjectGrid } from './features/portfolio/ProjectGrid';
import { ContactSection } from './features/portfolio/ContactSection';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <MainLayout>
        <HeroSection />
        <ExperienceSection />
        <ProjectGrid />
        <ContactSection />
      </MainLayout>
    </>
  );
}

export default App;

