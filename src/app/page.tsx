
import { CarSaleForm } from '@/components/car-sale-form';
import { FeaturesSection } from '@/components/landing-page/features-section';
import { ProcessSection } from '@/components/landing-page/process-section';
import { TestimonialsSection } from '@/components/landing-page/testimonials-section';
import { PastSalesSection } from '@/components/landing-page/past-sales-section';
import { TeamSection } from '@/components/landing-page/team-section';
import { FaqSection } from '@/components/landing-page/faq-section';
import { Footer } from '@/components/landing-page/footer';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter mb-4 animate-fade-in-down">
                AUTO AURA
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-up">
                Sælg din bil hurtigt og trygt. Få et gratis og uforpligtende tilbud inden for 24 timer.
              </p>
            </div>
            <div className="w-full max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
               <CarSaleForm />
            </div>
          </div>
        </section>
        
        <FeaturesSection />
        <Separator className="my-12 md:my-24 w-4/5 mx-auto" />
        <ProcessSection />
        <Separator className="my-12 md:my-24 w-4/5 mx-auto" />
        <TestimonialsSection />
        <Separator className="my-12 md:my-24 w-4/5 mx-auto" />
        <PastSalesSection />
         <Separator className="my-12 md:my-24 w-4/5 mx-auto" />
        <TeamSection />
        <Separator className="my-12 md:my-24 w-4/5 mx-auto" />
        <FaqSection />

      </main>
      <Footer />
    </div>
  );
}
