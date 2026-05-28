'use client'

import { useState } from 'react'
import { products, categories, type Product } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { 
  Leaf, 
  Sparkles, 
  Heart, 
  Recycle, 
  Battery, 
  Moon, 
  Sun,
  Grid3X3,
  Droplet,
  Wind,
  Flower2,
  Package,
  SprayCan
} from 'lucide-react'
import Link from 'next/link'

const categoryIcons: Record<string, React.ReactNode> = {
  all: <Grid3X3 className="h-4 w-4" />,
  sprays: <SprayCan className="h-4 w-4" />,
  aceites: <Droplet className="h-4 w-4" />,
  difusores: <Wind className="h-4 w-4" />,
  esencias: <Flower2 className="h-4 w-4" />,
  kits: <Package className="h-4 w-4" />,
}

export default function TiendaPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredProducts = products.filter((p) => p.featured)

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sage-light/40 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Leaf className="h-4 w-4" />
              100% Natural y Artesanal
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Reconecta con tu{' '}
              <span className="text-primary">bienestar</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed">
              Descubre nuestra colección de productos de aromaterapia, elaborados artesanalmente 
              con ingredientes naturales para transformar tu hogar en un santuario de paz.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#productos">Ver Catálogo</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tienda?category=kits">Kits de Inicio</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-sage-light/50 blur-3xl" />
      </section>

      {/* Features */}
      <section className="border-y bg-card py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {[
              { icon: <Leaf className="h-5 w-5" />, label: '100% Natural' },
              { icon: <Sparkles className="h-5 w-5" />, label: 'Artesanal' },
              { icon: <Recycle className="h-5 w-5" />, label: 'Sustentable' },
              { icon: <Heart className="h-5 w-5" />, label: 'Bienestar' },
            ].map((feature) => (
              <div key={feature.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="text-primary">{feature.icon}</span>
                {feature.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Productos Destacados</h2>
            <p className="mt-2 text-muted-foreground">
              Nuestros favoritos seleccionados para ti
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Banner */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Leaf className="h-8 w-8" />
            <span className="text-2xl font-bold md:text-3xl">+5 años</span>
          </div>
          <p className="mt-2 text-lg opacity-90">
            de experiencia creando bienestar para tu hogar
          </p>
        </div>
      </section>

      {/* All Products */}
      <section id="productos" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-center text-2xl font-bold md:text-3xl">
              Nuestra Tienda
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Explora todos nuestros productos
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                className="gap-2"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {categoryIcons[cat.id]}
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="mx-auto mb-8 max-w-md">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No se encontraron productos</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Beneficios de la Aromaterapia</h2>
            <p className="mt-2 text-muted-foreground">
              Descubre cómo nuestros productos pueden mejorar tu vida
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Heart className="h-8 w-8" />,
                title: 'Alivio del Estrés',
                description: 'Reduce la ansiedad y el estrés con aromas relajantes como lavanda y manzanilla.',
                color: 'bg-lavender/30 text-purple-700',
              },
              {
                icon: <Moon className="h-8 w-8" />,
                title: 'Mejor Descanso',
                description: 'Mejora la calidad de tu sueño con esencias que promueven la relajación profunda.',
                color: 'bg-sky/30 text-blue-700',
              },
              {
                icon: <Sun className="h-8 w-8" />,
                title: 'Energía Natural',
                description: 'Activa tu energía con cítricos y menta para empezar el día con vitalidad.',
                color: 'bg-peach/30 text-orange-700',
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className={`rounded-2xl p-8 ${benefit.color}`}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm opacity-80 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
