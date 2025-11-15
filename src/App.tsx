import "./App.css";
import { SocialSection } from "./components/socialSection/socialSection.tsx";
import { HeroSection } from "./components/heroSection/heroSection.tsx";
import ServiciosSection from "./components/serviciosSection/serviciosSection.tsx";
import CTASection from "./components/ctaSection/ctaSection.tsx";
import NavBar from "./components/navBar/navBar";
import ProcesoSection from "./components/procesoSection/procesoSection.tsx";
import ProyectosSection from "./components/proyectosSection/proyectosSection.tsx";
import { TimelineSection } from "./components/timelineSection/timelineSection.tsx";
import { LottieAnimation } from "./components/ui/lottie-animation.tsx";
import { lottiePath } from "./lib/lottiePaths.ts";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServiciosPage from "./pages/Servicios/serviciosPage.tsx";
import TrabajosPage from "./pages/Trabajos/trabajosPage.tsx";
import ContactoPage from "./pages/Contacto/contactoPage.tsx";

function App() {
  return (
    <>
   <Router>
  <div className="flex flex-col items-stretch justify-center min-h-screen w-full gap-[15vh]">
    <NavBar />
    <Routes>
      <Route path="/servicios" element={<ServiciosPage />} />
      <Route path="/trabajos" element={<TrabajosPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/" element={
        <>
          <HeroSection />
          <div className="relative w-full">
            <div className="z-15 mt-60">
            <ServiciosSection />
            </div>
            <div className="pointer-events-none absolute -bottom-46  z-1 right-25 sm:right-55" aria-hidden="true">
              <LottieAnimation
                path={lottiePath('Linea1.json')}
                className="w-32 h-32 sm:w-64 sm:h-64"
                loop={false}
                autoplay={true}
                startOnView

              />
            </div>
          </div>
          <div className="relative w-full">
            <ProyectosSection />
            <div className="pointer-events-none absolute -bottom-80 left-2 sm:left-8" aria-hidden="true">
              <LottieAnimation
                path={lottiePath('Linea2.json')}
                className="w-28 h-28 sm:w-150 sm:h-150"
                loop={false}
                startOnView
              />
            </div>
          </div>
          <SocialSection />
          <ProcesoSection />
          <TimelineSection />
          <CTASection />
        </>
      } />
    </Routes>
  </div>
</Router>
    </>
  );
}

export default App;
