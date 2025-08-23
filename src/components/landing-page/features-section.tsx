
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Gift } from "lucide-react"

const features = [
  {
    icon: <Gift className="w-8 h-8 text-primary" />,
    title: "Gratis og uforpligtende vurdering",
    description: "Få et tilbud på din bil uden binding. Det er 100% gratis og uforpligtende.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Hurtigt salg med betaling samme dag",
    description: "Vi sikrer en hurtig handel, hvor du modtager betalingen samme arbejdsdag, bilen afhentes.",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Modtag dit tilbud inden for 24 timer",
    description: "Indtast dine oplysninger og modtag et fair og konkurrencedygtigt tilbud inden for et døgn.",
  },
]

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
