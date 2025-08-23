
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [
  {
    name: "Mikkel S.",
    location: "Esbjerg",
    title: "Fantastisk kundeservice",
    quote: "Jeg vidste ikke, hvor jeg skulle starte, da jeg skulle sælge min bil, men Auto Aura gjorde det utroligt nemt. Deres kundeservice var helt i top, og jeg følte mig godt behandlet gennem hele processen. En fantastisk oplevelse!",
  },
  {
    name: "Katrine L.",
    location: "Aalborg",
    title: "Stressfri oplevelse",
    quote: "At sælge min bil var så nemt med Auto Aura. De tog sig af alt papirarbejdet og gjorde hele processen stressfri. Jeg vil helt sikkert anbefale dem til venner og familie!",
  },
  {
    name: "Jonas E.",
    location: "Odense",
    title: "Professionel service",
    quote: "Enestående service! Fra start til slut håndterede teamet alt professionelt. Jeg fik en god pris for min bil og undgik stressen ved privat salg. Auto Aura er vejen frem!",
  },
  {
    name: "Sofia P.",
    location: "København",
    title: "Fair og gennemsigtigt tilbud",
    quote: "Jeg blev overrasket over, hvor gennemsigtigt og fair tilbuddet var. Teamet guidede mig gennem hvert trin, og jeg følte mig sikker på, at jeg fik en god handel. Det har aldrig været så nemt at sælge min bil!",
  },
]

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Hvad vores kunder siger</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Mere end 50.000 tilfredse kunder har brugt vores service.
            </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-secondary border-0 flex flex-col">
              <CardHeader>
                <CardTitle>{testimonial.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="mt-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person portrait" />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
