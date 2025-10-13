"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Birdeye from "@/assets/Birdeye.png";

const partners = [
  { name: "Birdeye", img: Birdeye },
  { name: "USDC", img: "/Partners/USDC.png" },
  { name: "USDT", img: "/Partners/USDT.png" },
  { name: "Solana", img: "/Partners/Solana.png" },
  { name: "Doge", img: "/Partners/Doge.png" },
  { name: "Golem", img: "/Partners/Golem.png" },
  { name: "Jupiter", img: "/Partners/Jupiter.jpeg" },
  { name: "Raydium", img: "/Partners/Raydium.jpg" },
]

export default function Partners() {
  const plugin = React.useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  )

  return (
    <section className="w-full pt-4 bg-black text-white border-t border-slate-800/30 rounded-2xl mt-3">
      <h2 className="text-center text-2xl font-bold mb-3">Partners</h2>

      <div className="max-w-6xl mx-auto px-1 bg-mai border border-slate-100/10  py-2 rounded-l">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {partners.map((partner, i) => (
              <CarouselItem
                key={i}
                className="pl-2 basis-1/3 "
              >
                <Card className="bg-[#0e0e0e] border border-gray-800 hover:border-gray-600 transition-all rounded-2xl overflow-hidden">
                  <CardContent className="flex items-center justify-center h-20 p-0">
                    <img
                      src={partner.img}
                      alt={partner.name}
                      className="max-h-full w-auto object-contain"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Optional Navigation Buttons */}
          <div className="hidden md:flex justify-center gap-3 mt-1">
            <CarouselPrevious  />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
