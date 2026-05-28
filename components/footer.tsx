import Link from 'next/link'
import { Instagram, Facebook, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                A
              </div>
              <span className="text-lg font-semibold">Aromatizarte - Aromaterapia Natural</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Productos naturales elaborados artesanalmente
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@esencia.cl"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Enlaces
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/tienda', label: 'Tienda' },
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Categorías
            </h4>
            <ul className="space-y-2">
              {['Sprays', 'Aceites', 'Difusores', 'Esencias', 'Kits'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/tienda?category=${cat.toLowerCase()}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contacto@aromatizarte.cl</li>
              <li>+56 9 1234 5678</li>
              <li>Santiago, Chile</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aromatizarte. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
