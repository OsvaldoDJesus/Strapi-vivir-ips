import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Familiar from "../assets/epsfamiliar.png"
import Famisanar from "../assets/famisanar.png"
import Fiduprevisora from "../assets/fiduprevisora.png"
import Fomag from "../assets/fomag.png"
import Enterritorio from "../assets/Logo_Enterritorio.png"
import Caja from "../assets/logocaja.png"
import Disan from "../assets/LogoDisan.png"
import CapitalSalud from "../assets/capital-salud.png"
import Asmet from "../assets/logo_asmet.png"
import CapresocaLogo from "../assets/CapresocaLogo.png"
import Policia from "../assets/LogoDisan.png"

const logos = [
  { src: Familiar.src, alt: "Imagen Familiar" },
  { src: Famisanar.src, alt: "Imagen Famisanar" },
  { src: Fiduprevisora.src, alt: "Imagen Fiduprevisora" },
  { src: Fomag.src, alt: "Imagen Fomag", maxHeight: "30px" },
  { src: Enterritorio.src, alt: "Imagen Enterritorio" },
  { src: Caja.src, alt: "Imagen Caja" },
  { src: Disan.src, alt: "Imagen Disan" },
  { src: CapitalSalud.src, alt: "Imagen Capital Salud" },
  { src: Asmet.src, alt: "Imagen Asmet" },
  { src: CapresocaLogo.src, alt: "Imagen Capresoca" },
  { src: Policia.src, alt: "Imagen Policia" },
]

export default function LogoCarouselNew() {
  return (
    <div className="logo-carousel-container">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-4">
          {logos.map((logo, index) => (
            <CarouselItem 
              key={index} 
              className="pl-4 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="logo-item flex justify-center items-center px-2 md:px-4">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    maxHeight: logo.maxHeight || "60px",
                    height: "60px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="carousel-nav-button left-button" />
        <CarouselNext className="carousel-nav-button right-button" />
      </Carousel>
    </div>
  )
}
