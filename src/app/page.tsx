
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { cars } from '@/lib/cars';
import { Footer } from '@/components/landing-page/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
          <div className="container px-4 md:px-6 text-center">
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
        </section>

        <section id="cars" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <Card key={car.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
                  <Link href={`/cars/${car.id}`} className="block">
                    <div className="relative aspect-video">
                      <Image
                        src={car.image}
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
                        <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
