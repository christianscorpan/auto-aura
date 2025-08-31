
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { cars } from '@/lib/cars';
import { Footer } from '@/components/landing-page/footer';
import { Header } from '@/components/landing-page/header';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function Home() {
  return (
    <main className="flex-grow bg-background">
      <section className="w-full min-h-screen flex flex-col justify-between bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <Header />
        <div className="absolute inset-x-0 bottom-0 top-auto h-2/3 sm:h-2/3 md:inset-0 md:h-full overflow-hidden">
            <Image
                src="/mercedes-amg.png"
                alt="Mercedes AMG"
                fill
                className="object-contain md:object-cover opacity-50 [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.2))] scale-[1.8] sm:scale-[1.8] translate-x-[33%] md:scale-[0.625] md:translate-x-[22rem] md:translate-y-[6rem]"
                priority
                data-ai-hint="luxury car"
            />
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="pt-28 md:pt-36 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter mb-4 animate-fade-in-down">
                    AUTO AURA
                </h1>
                <p className="text-xl md:text-2xl text-blue-300/80 max-w-3xl mx-auto mb-2 animate-fade-in-up animation-delay-300">
                    Lease Your Dream Car
                </p>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-300">
                    Get your dream car leased and get rid of your old car. Explore our exclusive collection of luxury vehicles.
                </p>
            </div>
            <div className="pb-12 text-center">
                <Link href="/showroom">
                    <Button variant="outline" size="lg" className="animate-fade-in-up animation-delay-300 bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white">
                        Explore Showroom
                    </Button>
                </Link>
            </div>
        </div>
      </section>

      <section id="latest" className="w-full flex flex-col justify-start">
        <div className="container px-4 md:px-6 flex flex-col justify-center pt-24 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Latest Cars</h2>
            <Link href="/showroom">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>

          {/* Mobile: vertical list (latest only) */}
          <div className="md:hidden space-y-4">
            {cars.slice(0, 3).map((car) => (
              <div key={car.id} className="p-1">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
                  <Link href={`/cars/${car.id}`} className="block">
                    <div className="relative aspect-video">
                      <Image
                        src="/unknown-car.png"
                        alt={`Image of ${car.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={car.hint}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold font-headline">{car.name}</h3>
                      <p className="text-muted-foreground mt-2">{car.shortDescription}</p>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-lg font-semibold text-primary">{car.leasePrice}</p>
                        <Button variant="ghost" className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet: horizontal carousel (latest only) */}
          <div className="hidden md:block">
            <Carousel 
              opts={{ align: 'start', loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {cars.slice(0, 6).map((car) => (
                  <CarouselItem key={car.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col">
                        <Link href={`/cars/${car.id}`} className="block h-full flex flex-col">
                          <div className="relative aspect-video">
                            <Image
                              src="/unknown-car.png"
                              alt={`Image of ${car.name}`}
                              fill
                              className="object-cover"
                              data-ai-hint={car.hint}
                            />
                          </div>
                          <CardContent className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold font-headline">{car.name}</h3>
                            <p className="text-muted-foreground mt-2 flex-grow">{car.shortDescription}</p>
                            <div className="flex justify-between items-center mt-4">
                              <p className="text-lg font-semibold text-primary">{car.leasePrice}</p>
                              <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                View Details <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>
        <Footer />
      </section>
    </main>
  );
}
