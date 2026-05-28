'use client'

import { Button } from '@/components/ui/button'
import { Search, MoreHorizontal, Mail, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { formatPrice } from '@/lib/store'

// Mock customers data
const mockCustomers = [
  {
    id: '1',
    name: 'María García',
    email: 'maria@example.com',
    orders: 5,
    totalSpent: 125970,
    lastOrder: '2024-01-15',
    joinDate: '2023-06-10',
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    orders: 3,
    totalSpent: 74970,
    lastOrder: '2024-01-14',
    joinDate: '2023-08-22',
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana@example.com',
    orders: 8,
    totalSpent: 245920,
    lastOrder: '2024-01-14',
    joinDate: '2023-03-15',
  },
  {
    id: '4',
    name: 'Pedro López',
    email: 'pedro@example.com',
    orders: 2,
    totalSpent: 34980,
    lastOrder: '2024-01-13',
    joinDate: '2023-11-05',
  },
  {
    id: '5',
    name: 'Laura Sánchez',
    email: 'laura@example.com',
    orders: 12,
    totalSpent: 389880,
    lastOrder: '2024-01-12',
    joinDate: '2023-01-20',
  },
]

export default function ClientesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalCustomers = mockCustomers.length
  const totalOrders = mockCustomers.reduce((sum, c) => sum + c.orders, 0)
  const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0)

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Clientes</h1>
        <p className="mt-1 text-muted-foreground">
          Visualiza y gestiona los clientes de la tienda
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-2xl font-bold">{totalCustomers}</p>
          <p className="text-sm text-muted-foreground">Total Clientes</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-2xl font-bold">{totalOrders}</p>
          <p className="text-sm text-muted-foreground">Total Pedidos</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
          <p className="text-sm text-muted-foreground">Ingresos Totales</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Cliente
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Pedidos
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Total Gastado
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Último Pedido
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Cliente desde
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{customer.orders}</td>
                  <td className="px-4 py-3 font-medium">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(customer.lastOrder).toLocaleDateString('es-CL')}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(customer.joinDate).toLocaleDateString('es-CL')}
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
                          <User className="mr-2 h-4 w-4" />
                          Ver perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar correo
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No se encontraron clientes</p>
          </div>
        )}
      </div>
    </div>
  )
}
