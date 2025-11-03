import "./App.css";
import { SocialSection } from "./components/social-section/social-section.tsx";
import { Hero } from "./components/hero/hero.tsx";
import Servicios from "./components/servicios/servicios";
import CTA from "./components/cta/cta.tsx";
import NavBar from "./components/navBar/navBar";
import Proceso from "./components/proceso/proceso";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full gap-[5vh]">
        <NavBar />
        <Hero />
        
        <Servicios />

        <SocialSection />

        <Proceso />

        <CTA />


      </div>
    </>
  );
}

export default App;
