import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

interface InteractiveCarouselProps {
  images: number[];
  fade?: boolean;
  arrows?: boolean;
}

const InteractiveCarousel: React.FC<InteractiveCarouselProps> = ({ fade, arrows = true, images }) => {
  return (
    <Carousel
      plugins={[WheelGesturesPlugin({ forceWheelAxis: "y" })]}
      opts={{ containScroll: "trimSnaps", loop: false, dragFree: false }}
    >
      <CarouselContent>
        <CarouselItem className="text-white w-full aspect-video bg-black flex justify-center items-center">
          dva
        </CarouselItem>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img
              className="h-screen md:h-auto w-full md:aspect-auto object-cover"
              src={`/images/${image}.jpg`}
              alt={`Carousel image ${index + 1}`}
            />
          </CarouselItem>
        ))}
        <CarouselItem className="text-white w-full aspect-video bg-black flex justify-center items-center">
          dva
        </CarouselItem>
      </CarouselContent>
      {arrows && (
        <>
          <CarouselPrevious
            className="bg-transparent text-white/90 hover:text-white hover:bg-transparent"
            variant={"ghost"}
          />
          <CarouselNext
            className="bg-transparent text-white/90 hover:text-white hover:bg-transparent"
            variant={"ghost"}
          />
        </>
      )}
    </Carousel>
  );
};

export default InteractiveCarousel;
