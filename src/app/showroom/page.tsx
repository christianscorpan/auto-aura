import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { cars } from '@/lib/cars';
import { Footer } from '@/components/landing-page/footer';
import { Header } from '@/components/landing-page/header';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function ShowroomPage() {
  return (
    <main className="flex-grow bg-background text-foreground">
      <section className="w-full min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 md:px-6 flex flex-col justify-start flex-grow pt-24">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Showroom</h1>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>

          {/* Mobile: vertical list */}
          <div className="md:hidden space-y-4">
            {cars.map((car) => (
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

          {/* Desktop/Tablet: horizontal carousel */}
          <div className="hidden md:block">
            <Carousel 
              opts={{ align: 'start', loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {cars.map((car) => (
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

