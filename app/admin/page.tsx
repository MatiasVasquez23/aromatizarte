'use client'

import { useProducts } from '@/lib/products-context'
import { formatPrice } from '@/lib/store'
import {
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { products } = useProducts()

  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const featuredProducts = products.filter((p) => p.featured).length

  const stats = [
    {
      label: 'Total Productos',
      value: totalProducts.toString(),
      icon: Package,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      label: 'Valor en Stock',
      value: formatPrice(totalValue),
      icon: DollarSign,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      label: 'Unidades en Stock',
      value: totalStock.toString(),
      icon: TrendingUp,
      change: '-3%',
      changeType: 'negative' as const,
    },
    {
      label: 'Productos Destacados',
      value: featuredProducts.toString(),
      icon: ShoppingCart,
      change: '+2',
      changeType: 'positive' as const,
    },
  ]

  const recentProducts = products.slice(0, 5)

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Bienvenido al panel de administración de Esencia Natural
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </span>
              <span
                className={`flex items-center text-xs font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Products */}
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">Productos Recientes</h2>
            <Link
              href="/admin/productos"
              className="text-sm text-primary hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="divide-y">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4"
              >
                <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-sage-light/30" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {product.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(product.price)}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.stock} unidades
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border bg-card">
          <div className="border-b p-4">
            <h2 className="font-semibold">Acciones Rápidas</h2>
          </div>
          <div className="grid gap-3 p-4">
            <Link
              href="/admin/productos/nuevo"
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Agregar Producto</p>
                <p className="text-sm text-muted-foreground">
                  Crear un nuevo producto en la tienda
                </p>
              </div>
            </Link>
            <Link
              href="/admin/pedidos"
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Ver Pedidos</p>
                <p className="text-sm text-muted-foreground">
                  Gestionar pedidos pendientes
                </p>
              </div>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Ver Tienda</p>
                <p className="text-sm text-muted-foreground">
                  Visitar la tienda como cliente
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="rounded-xl border bg-card lg:col-span-2">
          <div className="border-b p-4">
            <h2 className="font-semibold">Distribución por Categoría</h2>
          </div>
          <div className="grid gap-4 p-4 sm:grid-cols-5">
            {['sprays', 'aceites', 'difusores', 'esencias', 'kits'].map((cat) => {
              const count = products.filter((p) => p.category === cat).length
              const percentage = Math.round((count / totalProducts) * 100) || 0
              return (
                <div key={cat} className="text-center">
                  <div className="mx-auto mb-2 h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-sm font-medium capitalize">{cat}</p>
                  <p className="text-xs text-muted-foreground">
                    {count} productos ({percentage}%)
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
