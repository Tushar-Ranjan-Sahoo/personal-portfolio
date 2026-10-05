import { MainLayout } from './components/layout/MainLayout';
import { HeroSection } from './features/portfolio/HeroSection';
import { ExperienceSection } from './features/portfolio/ExperienceSection';
import { ProjectGrid } from './features/portfolio/ProjectGrid';
import { ContactSection } from './features/portfolio/ContactSection';

function App() {
  return (
    <MainLayout>
      <HeroSection />
      <ExperienceSection />
      <ProjectGrid />
      <ContactSection />
    </MainLayout>
  );
}

export default App;

