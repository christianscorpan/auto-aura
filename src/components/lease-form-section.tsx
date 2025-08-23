
'use client';
import { CarSaleForm } from './car-sale-form';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

interface LeaseFormSectionProps {
  carName: string;
  showForm: boolean;
  onShowForm: () => void;
}

export function LeaseFormSection({ carName, showForm, onShowForm }: LeaseFormSectionProps) {
  return (
    <div id="lease-section" className="mt-16 py-16 text-center bg-background rounded-lg shadow-inner">
      <div className="container mx-auto px-4">
        {!showForm && (
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Lease Your <span className="text-primary">{carName}</span>?</h2>
                <p className="text-muted-foreground mb-8">
                    Let's get you behind the wheel. Start by telling us about your trade-in vehicle to get a personalized lease offer.
                </p>
                <Button size="lg" onClick={onShowForm} className="hidden md:inline-flex">
                    Start Lease & Trade-in Process
                    <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
            </div>
        )}
        <div id="trade-in-form" className={`transition-opacity duration-700 ease-in-out ${showForm ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0 overflow-hidden'}`}>
           {showForm && <CarSaleForm carName={carName} />}
        </div>
      </div>
    </div>
  );
}
