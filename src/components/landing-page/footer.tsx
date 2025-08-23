
import { Facebook, Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-headline">AUTO AURA</h3>
          <p className="text-sm text-muted-foreground">
            Eksperter i køb og salg af brugte biler. Vi gør bilhandel nemt, hurtigt og gennemskueligt.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Åbningstider</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Mandag-fredag: 09.00 – 18.00</li>
            <li>Lørdag og Søndag: 10.00-18.00</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Information</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">Vilkår og betingelser</Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">Persondatapolitik</Link>
            </li>
             <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">Cookies</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Kontakt</h4>
           <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Email: <a href="mailto:kontakt@autoaura.dk" className="hover:text-primary">kontakt@autoaura.dk</a></li>
            <li>Telefon: <a href="tel:+4512345678" className="hover:text-primary">+45 12 34 56 78</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="container px-4 md:px-6 py-4 text-center text-sm text-muted-foreground">
          Copyright © {new Date().getFullYear()} Auto Aura. Alle rettigheder forbeholdes.
        </div>
      </div>
    </footer>
  )
}
