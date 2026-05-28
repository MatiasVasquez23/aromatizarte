'use client'

import { type Product, formatPrice } from '@/lib/store'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Droplets } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const categoryColors: Record<string, string> = {
    sprays: 'bg-sky/50 text-sky-dark',
    aceites: 'bg-peach/50 text-orange-700',
    difusores: 'bg-lavender/50 text-purple-700',
    esencias: 'bg-sage-light/50 text-sage-dark',
    kits: 'bg-cream text-amber-700',
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
      {/* Image Placeholder with Droplet Icon */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-sage-light/30 to-sage-light/60">
        <div className="absolute inset-0 flex items-center justify-center">
          <Droplets className="h-16 w-16 text-primary/40" />
        </div>
        {/* Category Badge */}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium capitalize ${
            categoryColors[product.category] || 'bg-muted text-muted-foreground'
          }`}
        >
          {product.category}
        </span>
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium leading-tight text-card-foreground">
          {product.name}
        </h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
        <Button
          className="mt-3 w-full gap-2"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-4 w-4" />
          Agregar
        </Button>
      </div>
    </div>
  )
}
