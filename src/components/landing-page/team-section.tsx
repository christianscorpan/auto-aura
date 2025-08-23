
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Janus Nielsen",
    role: "Salg",
    image: "https://placehold.co/400x400.png",
    hint: "male portrait"
  },
  {
    name: "Allan Heinrich",
    role: "Support",
    image: "https://placehold.co/400x400.png",
    hint: "male portrait"
  },
  {
    name: "Lars Jensen",
    role: "Teknik",
    image: "https://placehold.co/400x400.png",
    hint: "male portrait"
  },
]

export function TeamSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Mød vores dygtige team</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Eksperter med over 10 års erfaring i branchen.
            </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <Image
                  src={member.image}
                  alt={`Photo of ${member.name}`}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                  data-ai-hint={member.hint}
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
