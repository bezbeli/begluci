import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";

interface InteractiveCarouselProps {
  fade?: boolean;
  arrows?: boolean;
}

const InteractiveCarousel: React.FC<InteractiveCarouselProps> = ({ fade, arrows }) => {
  const [images, setImages] = useState<string[]>([]);
  const plugins = fade ? [Fade(), Autoplay({ delay: 5000 })] : [Autoplay({ delay: 3000 })];

  useEffect(() => {
    const imagePaths = Array.from({ length: 12 }, (_, i) => `/images/${i + 1}.jpg`);
    setImages(imagePaths);
  }, []);

  return (
    <Carousel className="slider" plugins={plugins} opts={{ loop: true }}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img src={image} alt={`Carousel image ${index + 1}`} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {arrows && (
        <>
          <CarouselPrevious className="bg-transparent text-white/70" variant={"outline"} />
          <CarouselNext className="bg-transparent text-white/70" variant={"outline"} />
        </>
      )}
    </Carousel>
  );
};

export default InteractiveCarousel;
