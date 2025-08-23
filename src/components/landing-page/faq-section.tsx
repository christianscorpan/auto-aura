
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Hvordan får jeg vurderet min bil hos AUTO AURA?",
    answer: "Du skal blot indtaste din bils registreringsnummer, kilometerstand og dine kontaktoplysninger i vores formular. Inden for 24 timer modtager du en gratis og uforpligtende vurdering fra os.",
  },
  {
    question: "Hvad sker der, når jeg accepterer tilbuddet på min bil?",
    answer: "Når du accepterer vores tilbud, sender vi en digital købsaftale, som du skal underskrive. Herefter aftaler vi afhentning af bilen, hvilket er gratis i hele Danmark. Pengene overføres til dig, så snart vi henter bilen.",
  },
  {
    question: "Køber AUTO AURA alle typer biler?",
    answer: "Ja, vi er interesserede i biler af alle mærker, modeller, årgange og i enhver stand. Vi vurderer hver bil individuelt for at give dig det bedst mulige tilbud.",
  },
  {
    question: "Hvordan foregår betalingen for min solgte bil?",
    answer: "Betalingen sker som en straksoverførsel til din bankkonto i det øjeblik, vi afhenter bilen. Det er en sikker og hurtig proces.",
  },
  {
    question: "Hvad koster det at få min bil vurderet af AUTO AURA?",
    answer: "Det er helt gratis at få din bil vurderet. Vores tilbud er også 100% uforpligtende, så du kan frit beslutte, om du vil sælge din bil til os eller ej.",
  },
]

export function FaqSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ofte stillede spørgsmål</h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
