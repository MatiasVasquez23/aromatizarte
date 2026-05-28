'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProducts } from '@/lib/products-context'
import { categories, type Product } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NuevoProductoPage() {
  const router = useRouter()
  const { addProduct } = useProducts()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'sprays' as Product['category'],
    stock: '',
    featured: false,
    image: '/products/placeholder.jpg',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    addProduct({
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      featured: formData.featured,
      image: formData.image,
    })

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/admin/productos')
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/productos"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a productos
        </Link>
        <h1 className="text-2xl font-bold md:text-3xl">Nuevo Producto</h1>
        <p className="mt-1 text-muted-foreground">
          Agrega un nuevo producto al catálogo
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
        <div className="rounded-xl border bg-card p-6">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium"
              >
                Nombre del producto
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej: Spray de Lavanda"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium"
              >
                Descripción
              </label>
              <textarea
                id="description"
                required
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Describe el producto..."
              />
            </div>

            {/* Price and Stock */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Precio (CLP)
                </label>
                <input
                  id="price"
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="9990"
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="25"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-sm font-medium"
              >
                Categoría
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Product['category'],
                  })
                }
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {categories
                  .filter((c) => c.id !== 'all')
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                id="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Marcar como producto destacado
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <Button type="submit" className="gap-2" disabled={isLoading}>
              <Save className="h-4 w-4" />
              {isLoading ? 'Guardando...' : 'Guardar Producto'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/productos">Cancelar</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
