import "./App.css";
import { SocialSection } from "./components/socialSection/socialSection.tsx";
import { HeroSection } from "./components/heroSection/heroSection.tsx";
import ServiciosSection from "./components/serviciosSection/serviciosSection.tsx";
import CTASection from "./components/ctaSection/ctaSection.tsx";
import NavBar from "./components/navBar/navBar";
import ProcesoSection from "./components/procesoSection/procesoSection.tsx";
import ProyectosSection from "./components/proyectosSection/proyectosSection.tsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServiciosPage from "./pages/Servicios/serviciosPage.tsx";

function App() {
  return (
    <>
   <Router>
  <div className="flex flex-col items-center justify-center min-h-screen w-full gap-[15vh]">
    <NavBar />
    <Routes>
      <Route path="/servicios" element={<ServiciosPage />} />
      <Route path="/" element={
        <>
          <HeroSection />
          <ServiciosSection />
          <ProyectosSection />
          <SocialSection />
          <ProcesoSection />
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
