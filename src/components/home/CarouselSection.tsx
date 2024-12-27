import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { highlights } from "./carousel/carouselData";
import { CarouselCard } from "./carousel/CarouselCard";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CarouselSection = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-4"
          >
            À la Une
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Découvrez les dernières actualités, événements et formations
          </motion.p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {highlights.map((highlight, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 h-full">
                  <CarouselCard highlight={highlight} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16 h-12 w-12 border-2 border-primary/20 bg-white/80 hover:bg-white">
              <ChevronLeft className="h-6 w-6 text-primary" />
            </CarouselPrevious>
            <CarouselNext className="hidden md:flex -right-12 lg:-right-16 h-12 w-12 border-2 border-primary/20 bg-white/80 hover:bg-white">
              <ChevronRight className="h-6 w-6 text-primary" />
            </CarouselNext>
          </Carousel>

          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {highlights.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  current === index ? "bg-primary w-4" : "bg-primary/20"
                )}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};