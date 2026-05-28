'use client'

import { products, formatPrice } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Productos Destacados</h2>
            <p className="mt-2 text-muted-foreground">
              Los favoritos de nuestros clientes
            </p>
          </div>
          <Link href="/tienda">
            <Button variant="outline" className="gap-2">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
