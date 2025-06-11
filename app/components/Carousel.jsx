"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselPlugin() {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));

  const images = [
    "/images/project1.jpg",
    "/images/project2.jpg",
    "/images/project3.jpg",
    "/images/project4.jpg",
  ];

  return (
    <Carousel plugins={[plugin.current]} className="w-full p-0">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="basis-2/3">
            <div className="p-0 shadow-md">
              <CardContent className="flex w-full items-center justify-center p-0">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
