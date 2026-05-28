'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Leaf, User } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { user } = useAuth()

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/tienda', label: 'Catálogo' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            A
          </div>
          <span className="text-xl font-semibold tracking-tight">Aromatizarte</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                Admin
              </Button>
            </Link>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Tu Carrito</SheetTitle>
              </SheetHeader>
              <CartSidebar />
            </SheetContent>
          </Sheet>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t bg-background p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}

function CartSidebar() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const { formatPrice } = require('@/lib/store')

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12">
        <ShoppingCart className="h-12 w-12 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">Tu carrito está vacío</p>
        <Link href="/tienda">
          <Button>Ver Productos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 py-4">
      <div className="flex-1 space-y-4 overflow-auto">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3 rounded-lg border p-3">
            <div className="h-16 w-16 flex-shrink-0 rounded-md bg-sage-light/30" />
            <div className="flex flex-1 flex-col">
              <p className="text-sm font-medium leading-tight">{item.product.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatPrice(item.product.price)}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-destructive"
                  onClick={() => removeItem(item.product.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Link href="/checkout" className="w-full">
            <Button className="w-full">Finalizar Compra</Button>
          </Link>
          <Button variant="outline" className="w-full" onClick={clearCart}>
            Vaciar Carrito
          </Button>
        </div>
      </div>
    </div>
  )
}
