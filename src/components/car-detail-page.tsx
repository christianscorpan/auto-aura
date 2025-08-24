
'use client';

import type { Car } from '@/lib/cars';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Gauge, Calendar, Car as CarIcon, Wrench, Palette, ArrowRight } from 'lucide-react';
import { LeaseFormSection } from '@/components/lease-form-section';
import { Footer } from '@/components/landing-page/footer';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function CarDetailPageClient({ car }: { car: Car }) {
  const [showForm, setShowForm] = useState(false);

  const handleScrollAndShow = () => {
    setShowForm(true);
    setTimeout(() => {
        document.getElementById('trade-in-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Prefer local unknown image if the car image is a placeholder
  const isPlaceholder = !car.image || car.image.includes('placehold.co');
  const [imgSrc, setImgSrc] = useState<string>(isPlaceholder ? '/unknown-car.png' : car.image);

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
       <main className="flex-grow pb-24 md:pb-0">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Image Gallery */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={imgSrc}
                alt={`Image of ${car.name}`}
                fill
                className="object-cover"
                data-ai-hint={car.hint}
                onError={() => {
                  if (imgSrc !== '/unknown-car.png') setImgSrc('/unknown-car.png');
                }}
                priority
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
                  <CarIcon className="w-5 h-5 text-primary" />
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
          
          <LeaseFormSection 
            carName={car.name} 
            showForm={showForm} 
            onShowForm={handleScrollAndShow} 
          />

        </div>
       </main>
      <Footer />
       {/* Mobile Fixed CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-4 flex items-center justify-between gap-4">
        <div>
          <p className="font-bold text-sm truncate">{car.name}</p>
          <p className="text-xs text-muted-foreground">Start your lease request</p>
        </div>
        <Button onClick={handleScrollAndShow} className="shrink-0">
          Start Leasing
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
