
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const pastSales = [
  {
    title: "BMW X3 3.0",
    location: "8000 Aarhus",
    image: "https://placehold.co/600x400.png",
    hint: "blue suv",
  },
  {
    title: "VW Beetle 2.0 TFSI",
    location: "7100 Vejle",
    image: "https://placehold.co/600x400.png",
    hint: "yellow beetle",
  },
  {
    title: "Peugeot 208 1.6",
    location: "6000 Kolding",
    image: "https://placehold.co/600x400.png",
    hint: "white hatchback",
  },
  {
    title: "Mercedes S63 AMG 4.0 V8",
    location: "8260 Viby J",
    image: "https://placehold.co/600x400.png",
    hint: "black sedan",
  },
]

export function PastSalesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Disse biler har vi tidligere købt</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Vi køber alle typer biler, fra familiebiler til luksussedaner.
            </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pastSales.map((car, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image src={car.image} alt={car.title} width={600} height={400} className="object-cover aspect-video" data-ai-hint={car.hint} />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold">{car.title}</h3>
                <p className="text-muted-foreground">{car.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
