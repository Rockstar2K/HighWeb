import { Button } from "@/components/ui/button";
import { LottieAnimation } from "@/components/ui/lottie-animation";
import { lottiePath } from "@/lib/lottiePaths";
import { Link } from "react-router-dom";

export function TimelineSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center ">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            ¿Preparado para recibir resultados?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-10">
            Te guiamos paso a paso desde que nos contactas hasta la primera reunión. Así es cómo avanzamos juntos.
          </p>
        </div>

        <ol className="sr-only space-y-2 text-gray-700">
          <li>Recibe nuestra propuesta comercial por email.</li>
          <li>Lee y realiza tu primer pago (50%).</li>
          <li>Agenda la primera reunión.</li>
        </ol>

        <div className="hidden md:flex justify-center -mt-30 pointer-events-none">
          <LottieAnimation
            path={lottiePath("Proceso de compra.json")}
            className="w-full max-w-4xl lg:max-w-5xl"
            ariaLabel="Línea de tiempo del proceso"
            loop={false}
            startOnView
          />
        </div>

        <div className="flex flex-col items-center gap-4 mt-8 md:mt-10 lg:-mt-20">
          <p className="text-gray-600 text-center">
            ¿Cuánto vale todo esto? Una inversión clara para resultados extraordinarios.
          </p>
          <Link to="/servicios" className="inline-flex">
            <Button variant="purple" className="px-10 py-6 text-lg rounded-full shadow-lg">
              Pide la propuesta completa
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
