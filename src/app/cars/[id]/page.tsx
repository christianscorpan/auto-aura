
import { cars } from '@/lib/cars';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Gauge, Calendar, Car, Wrench, Palette } from 'lucide-react';
import { LeaseFormSection } from '@/components/lease-form-section';
import { Footer } from '@/components/landing-page/footer';

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const car = cars.find((c) => c.id === params.id);

  if (!car) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
       <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Image Gallery */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <Image 
                src={car.image} 
                alt={`Image of ${car.name}`} 
                fill 
                className="object-cover"
                data-ai-hint={car.hint} 
              />
            </div>

            {/* Car Details */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold font-headline">{car.name}</h1>
              <p className="text-lg text-muted-foreground">{car.shortDescription}</p>
              <div className="text-3xl font-bold text-primary">{car.leasePrice}</div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-primary" />
                  <span>{car.specs.mileage}</span>
                </div>
                 <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{car.specs.year}</span>
                </div>
                 <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-primary" />
                  <span>{car.specs.transmission}</span>
                </div>
                 <div className="flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-primary" />
                  <span>{car.specs.engine}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-primary" />
                  <span>{car.specs.color}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features and Description */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">Features</h2>
            <div className="flex flex-wrap gap-4 mb-10">
              {car.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-lg py-1 px-4">{feature}</Badge>
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">{car.longDescription}</p>
          </div>
          
          <LeaseFormSection carName={car.name} />

        </div>
       </main>
      <Footer />
    </div>
  );
}

// Generate static paths for all cars
export async function generateStaticParams() {
  return cars.map((car) => ({
    id: car.id,
  }));
}
