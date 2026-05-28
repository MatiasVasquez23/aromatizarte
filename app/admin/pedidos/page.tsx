'use client'

import { formatPrice } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  Search,
  MoreHorizontal,
  Eye,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'María García',
    email: 'maria@example.com',
    date: '2024-01-15',
    total: 45990,
    status: 'completed',
    items: 3,
  },
  {
    id: 'ORD-002',
    customer: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    date: '2024-01-14',
    total: 24990,
    status: 'pending',
    items: 1,
  },
  {
    id: 'ORD-003',
    customer: 'Ana Martínez',
    email: 'ana@example.com',
    date: '2024-01-14',
    total: 67980,
    status: 'processing',
    items: 4,
  },
  {
    id: 'ORD-004',
    customer: 'Pedro López',
    email: 'pedro@example.com',
    date: '2024-01-13',
    total: 12990,
    status: 'completed',
    items: 1,
  },
  {
    id: 'ORD-005',
    customer: 'Laura Sánchez',
    email: 'laura@example.com',
    date: '2024-01-12',
    total: 89970,
    status: 'cancelled',
    items: 5,
  },
]

const statusConfig = {
  pending: {
    label: 'Pendiente',
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-700',
  },
  processing: {
    label: 'Procesando',
    icon: Package,
    className: 'bg-blue-100 text-blue-700',
  },
  completed: {
    label: 'Completado',
    icon: CheckCircle,
    className: 'bg-green-100 text-green-700',
  },
  cancelled: {
    label: 'Cancelado',
    icon: XCircle,
    className: 'bg-red-100 text-red-700',
  },
}

export default function PedidosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Pedidos</h1>
        <p className="mt-1 text-muted-foreground">
          Gestiona los pedidos de la tienda
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Pedidos', value: mockOrders.length, color: 'text-foreground' },
          {
            label: 'Pendientes',
            value: mockOrders.filter((o) => o.status === 'pending').length,
            color: 'text-yellow-600',
          },
          {
            label: 'Procesando',
            value: mockOrders.filter((o) => o.status === 'processing').length,
            color: 'text-blue-600',
          },
          {
            label: 'Completados',
            value: mockOrders.filter((o) => o.status === 'completed').length,
            color: 'text-green-600',
          },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-4">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por cliente o ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="processing">Procesando</option>
          <option value="completed">Completado</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Pedido
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Cliente
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Estado
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig]
                return (
                  <tr key={order.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items} producto{order.items > 1 ? 's' : ''}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString('es-CL')}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                      >
                        <status.icon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No se encontraron pedidos</p>
          </div>
        )}
      </div>
    </div>
  )
}
