import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FeaturedProducts } from '@/components/featured-products'
import { Button } from '@/components/ui/button'
import { 
  Leaf, 
  Sparkles, 
  Heart, 
  Recycle, 
  ArrowRight,
  Moon,
  Sun,
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sage-light/40 to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Aromaterapia Natural Chilena
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Reconecta con tu{' '}
              <span className="text-primary">bienestar</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed md:text-xl">
              Aceites esenciales y productos de aromaterapia elaborados artesanalmente 
              con plantas nativas, para aliviar el estrés y reconectar con tus sentidos.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/tienda">
                  Ver Catálogo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tienda?category=kits">Kits de Inicio</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sage-light/50 blur-3xl" />
      </section>

      {/* Features Strip */}
      <section className="border-y bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: <Leaf className="h-6 w-6" />, label: '100% Natural' },
              { icon: <Sparkles className="h-6 w-6" />, label: 'Artesanal' },
              { icon: <Recycle className="h-6 w-6" />, label: 'Sustentable' },
              { icon: <Heart className="h-6 w-6" />, label: 'Bienestar' },
            ].map((feature) => (
              <div key={feature.label} className="flex items-center gap-3">
                <span className="text-primary">{feature.icon}</span>
                <span className="font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Nuestras Categorías</h2>
            <p className="mt-3 text-muted-foreground">
              Encuentra el producto perfecto para cada momento
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Sprays', desc: 'Ambientadores naturales', color: 'from-sky/40 to-sky/20' },
              { name: 'Aceites', desc: 'Esencias puras', color: 'from-peach/40 to-peach/20' },
              { name: 'Difusores', desc: 'Para tu hogar', color: 'from-lavender/40 to-lavender/20' },
              { name: 'Kits', desc: 'Sets completos', color: 'from-sage-light/60 to-sage-light/30' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/tienda?category=${cat.name.toLowerCase()}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.color} p-8 transition-transform hover:scale-[1.02]`}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold">{cat.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Ver productos
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Experience Banner */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Leaf className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">+5 años de experiencia</h2>
            <p className="mt-4 text-lg opacity-90 leading-relaxed">
              Creando productos de aromaterapia artesanales con amor y dedicación 
              para transformar tu bienestar
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
              <div>
                <p className="text-3xl font-bold">+1000</p>
                <p className="text-sm opacity-80">Clientes felices</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm opacity-80">Productos</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm opacity-80">Natural</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Beneficios de la Aromaterapia</h2>
            <p className="mt-3 text-muted-foreground">
              Descubre cómo nuestros productos pueden mejorar tu calidad de vida
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Heart className="h-10 w-10" />,
                title: 'Alivio del Estrés',
                description: 'Reduce la ansiedad y el estrés con aromas relajantes como lavanda y manzanilla. Ideal para el final del día.',
                color: 'bg-lavender/30 text-purple-700',
              },
              {
                icon: <Moon className="h-10 w-10" />,
                title: 'Mejor Descanso',
                description: 'Mejora la calidad de tu sueño con esencias que promueven la relajación profunda y un descanso reparador.',
                color: 'bg-sky/30 text-blue-700',
              },
              {
                icon: <Sun className="h-10 w-10" />,
                title: 'Energía Natural',
                description: 'Activa tu energía con cítricos y menta para empezar el día con vitalidad y concentración.',
                color: 'bg-peach/30 text-orange-700',
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className={`rounded-2xl p-8 ${benefit.color}`}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed opacity-80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Lo que dicen nuestros clientes</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'María García',
                text: 'Los aceites esenciales han cambiado mi rutina de relajación. La calidad es increíble.',
              },
              {
                name: 'Carlos Rodríguez',
                text: 'El difusor cerámico es hermoso y funciona perfecto. Mi casa siempre huele increíble.',
              },
              {
                name: 'Ana Martínez',
                text: 'El kit de inicio es perfecto para comenzar en el mundo de la aromaterapia. Muy recomendado.',
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="rounded-xl bg-card p-6 shadow-sm">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <p className="mt-4 font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Comienza tu viaje de bienestar
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Explora nuestra colección completa de productos y encuentra el aroma perfecto para ti.
            </p>
            <Button size="lg" className="mt-8 gap-2" asChild>
              <Link href="/tienda">
                Ir a la Tienda
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
