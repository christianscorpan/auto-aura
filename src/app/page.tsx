import { CarSaleForm } from '@/components/car-sale-form';
import { Car } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 py-12 sm:p-16 md:p-24">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
            <Car className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-auto text-foreground">
            Auto Aura
          </h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-xl mx-auto">
            Get a competitive, no-obligation offer for your car in just a few simple steps.
          </p>
        </div>
        <CarSaleForm />
      </div>
    </main>
  );
}
