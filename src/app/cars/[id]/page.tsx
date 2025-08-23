
import { cars } from '@/lib/cars';
import { notFound } from 'next/navigation';
import { CarDetailPageClient } from '@/components/car-detail-page';

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const car = cars.find((c) => c.id === params.id);

  if (!car) {
    notFound();
  }

  return <CarDetailPageClient car={car} />;
}

// Generate static paths for all cars
export async function generateStaticParams() {
  return cars.map((car) => ({
    id: car.id,
  }));
}
