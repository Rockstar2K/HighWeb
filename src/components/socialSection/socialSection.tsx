import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

const reviews = [
  {
    name: "Sofía Martínez",
    username: "@sofi.mart",
    body: "¡Increíble trabajo en el rediseño de nuestra web! El equipo de High Design captó perfectamente nuestra esencia y la llevó a otro nivel. Totalmente recomendados.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
  },
  {
    name: "Carlos Gutiérrez",
    username: "@carlosg",
    body: "La campaña de redes sociales que crearon para nosotros superó todas nuestras expectativas. ¡El engagement se disparó un 200%! Profesionales de primera.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
  },
  {
    name: "Ana Lucía Ríos",
    username: "@anar_design",
    body: "Trabajar con High Design fue una experiencia excepcional. Su atención al detalle y creatividad en las animaciones nos dejó sin palabras. ¡Volveremos por más!",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
  },
  {
    name: "Miguel Ángel Torres",
    username: "@miguel.torres",
    body: "El rediseño de identidad visual que nos hicieron transformó por completo nuestra marca. Ahora tenemos una imagen coherente en todos los canales. ¡Excelente trabajo!",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80",
  },
  {
    name: "Valentina Rojas",
    username: "@valeroj",
    body: "Las ilustraciones personalizadas que crearon para nuestra app son simplemente increíbles. Captaron perfectamente lo que necesitábamos y lo superaron con creces.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
  },
  {
    name: "Andrés López",
    username: "@andres.lpz",
    body: "La estrategia de contenidos digitales que desarrollaron para nosotros fue un antes y después. Muy profesionales, creativos y siempre atentos a los detalles.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
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
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl p-4",
        "bg-[#ECE3FF]/[.3] hover:bg-[#ECE3FF]/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
          <img 
            className="h-full w-full object-cover" 
            alt={`${name}'s profile`} 
            src={img} 
          />
        </div>
        <div className="flex flex-col min-w-0">
          <figcaption className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-600">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-left">{body}</blockquote>
    </figure>
  )
}

export function SocialSection() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <h2 className="text-4xl font-bold mb-8">Muy bien pero...<br></br><span className="text-[#7741EA]">¿Qué dicen de ustedes?</span></h2>
      <Marquee  className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse  className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
