import { CarSaleForm } from '@/components/car-sale-form';
import { Car } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 py-10 sm:p-8">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Car className="h-10 w-10 text-primary" />
            <h1 className="text-5xl font-bold font-headline text-foreground">Auto Aura</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Get a great offer for your car in just a few simple steps.
          </p>
        </div>
        <CarSaleForm />
      </div>
    </main>
  );
}
