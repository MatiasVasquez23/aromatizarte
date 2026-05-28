'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'
import {
  Leaf,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
  { href: '/admin/configuracion', label: 'Configuración', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b bg-card px-4 md:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-semibold">Admin</span>
        </Link>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-30 hidden h-screen flex-col border-r bg-card transition-all md:flex',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-semibold">Esencia Natural</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/" className="mx-auto">
              <Leaf className="h-6 w-6 text-primary" />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', collapsed && 'hidden')}
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="border-t p-3">
          {!collapsed && (
            <div className="mb-3 rounded-lg bg-muted/50 p-3">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive',
              collapsed && 'justify-center'
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Cerrar Sesión</span>}
          </button>
        </div>

        {/* Expand Button (when collapsed) */}
        {collapsed && (
          <div className="border-t p-3">
            <Button
              variant="ghost"
              size="icon"
              className="w-full"
              onClick={() => setCollapsed(false)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        )}
      </aside>

      {/* Spacer for fixed sidebar */}
      <div className={cn('hidden md:block', collapsed ? 'w-16' : 'w-64')} />
      <div className="h-14 md:hidden" />
    </>
  )
}
