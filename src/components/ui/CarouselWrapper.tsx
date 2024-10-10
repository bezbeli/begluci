import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";

const InteractiveCarousel = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const imagePaths = Array.from({ length: 12 }, (_, i) => `/images/${i + 1}.jpg`);
    setImages(imagePaths);
  }, []);

  return (
    <Carousel
      className="mb-12"
      plugins={[Fade(), Autoplay({ delay: 3000, stopOnFocusIn: true, stopOnInteraction: false })]}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img src={image} alt={`Carousel image ${index + 1}`} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default InteractiveCarousel;
