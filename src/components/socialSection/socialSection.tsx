import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

const reviews = [
  {
    name: "Sofía Martínez",
    username: "@sofi.mart",
    body: "¡Increíble trabajo en el rediseño de nuestra web! El equipo de High Design captó perfectamente nuestra esencia y la llevó a otro nivel. Totalmente recomendados.",
    img: "https://avatar.vercel.sh/sofi.mart",
  },
  {
    name: "Carlos Gutiérrez",
    username: "@carlosg",
    body: "La campaña de redes sociales que crearon para nosotros superó todas nuestras expectativas. ¡El engagement se disparó un 200%! Profesionales de primera.",
    img: "https://avatar.vercel.sh/carlosg",
  },
  {
    name: "Ana Lucía Ríos",
    username: "@anar_design",
    body: "Trabajar con High Design fue una experiencia excepcional. Su atención al detalle y creatividad en las animaciones nos dejó sin palabras. ¡Volveremos por más!",
    img: "https://avatar.vercel.sh/anar_design",
  },
  {
    name: "Miguel Ángel Torres",
    username: "@miguel.torres",
    body: "El rediseño de identidad visual que nos hicieron transformó por completo nuestra marca. Ahora tenemos una imagen coherente en todos los canales. ¡Excelente trabajo!",
    img: "https://avatar.vercel.sh/miguel.torres",
  },
  {
    name: "Valentina Rojas",
    username: "@valeroj",
    body: "Las ilustraciones personalizadas que crearon para nuestra app son simplemente increíbles. Captaron perfectamente lo que necesitábamos y lo superaron con creces.",
    img: "https://avatar.vercel.sh/valeroj",
  },
  {
    name: "Andrés López",
    username: "@andres.lpz",
    body: "La estrategia de contenidos digitales que desarrollaron para nosotros fue un antes y después. Muy profesionales, creativos y siempre atentos a los detalles.",
    img: "https://avatar.vercel.sh/andres.lpz",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl  p-4",
        // light styles
        " bg-[#ECE3FF]/[.5] hover:bg-[#ECE3FF]/[.25]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-left">{body}</blockquote>
    </figure>
  )
}

export function SocialSection() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <h2 className="text-4xl font-bold mb-8">Muy bien pero...<br></br><span className="text-[#7741EA]">¿Qué dicen de ustedes?</span></h2>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
