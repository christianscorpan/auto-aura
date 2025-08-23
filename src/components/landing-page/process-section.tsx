
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    step: "1",
    title: "Fortæl om din bil",
    description: "For at kunne give et retvisende tilbud på din bil, skal du udfylde vores formular med informationer om din bil. Det tager ikke mere end 2 minutter at udfylde formularen.",
  },
  {
    step: "2",
    title: "Accepter købsaftalen",
    description: "Når vi afgiver et tilbud på din brugte bil, er det helt uforpligtende. Vælger du at at sige ja modtaget du en købsaftale, som du skal skrive under.",
  },
  {
    step: "3",
    title: "Afhentning af bilen",
    description: "Når vi har modtaget den underskrevne købsaftale, henter vi bilen gratis uanset hvor den står i Danmark. Når bilen afhentes af os, overføres købssummen.",
  },
]

export function ProcessSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Vores fremgangsmåde ved køb af brugte biler</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sælg din bil på 3 simple trin.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3 lg:gap-12">
          {steps.map((item) => (
            <div key={item.step} className="grid gap-4 relative">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-full bg-primary text-primary-foreground w-12 h-12 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
