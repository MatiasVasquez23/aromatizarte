'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, CreditCard, Check, Lock, Truck, ShieldCheck } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirm'>('shipping')
  
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  })

  const shippingCost = totalPrice > 30000 ? 0 : 3990
  const finalTotal = totalPrice + shippingCost

  if (items.length === 0 && !isComplete) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
          <p className="mt-2 text-muted-foreground">
            Agrega productos antes de continuar con el pago
          </p>
          <Link href="/tienda">
            <Button className="mt-6">Ver Productos</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Pago completado
              </CardTitle>
              <CardDescription>
                Tu pedido ha sido procesado con éxito.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Pagado</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="rounded-xl border p-6">
                <h2 className="mb-4 text-xl font-semibold">Método de Pago</h2>
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5" />
                  <span>Tarjeta terminada en {paymentData.cardNumber.slice(-4)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="w-full" onClick={() => window.print()}>
                  Descargar Recibo
                </Button>
                <Link href="/tienda" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => clearCart()}
                  >
                    Seguir Comprando
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const handleShippingSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setIsComplete(true)
    clearCart()
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/tienda" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Volver a la tienda
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              A
            </div>
            <span className="text-lg font-semibold">Aromatizarte</span>
          </Link>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            Pago Seguro
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mx-auto mb-8 max-w-3xl">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step === 'shipping' ? 'bg-primary text-primary-foreground' : step === 'payment' ? 'bg-primary/20 text-primary' : 'bg-muted'}`}>
                {step !== 'shipping' ? <Check className="h-4 w-4" /> : '1'}
              </div>
              <span className="hidden text-sm font-medium sm:inline">Envío</span>
            </div>
            <div className="h-px w-12 bg-border" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                2
              </div>
              <span className="hidden text-sm font-medium sm:inline">Pago</span>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
          {/* Form Section */}
          <div className="lg:col-span-3">
            {step === 'shipping' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Información de Envío
                  </CardTitle>
                  <CardDescription>
                    Ingresa tus datos para el envío
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          required
                          value={shippingData.firstName}
                          onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                          placeholder="Juan"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          required
                          value={shippingData.lastName}
                          onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                          placeholder="Pérez"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={shippingData.email}
                          onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                          placeholder="juan@ejemplo.cl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={shippingData.phone}
                          onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                          placeholder="+56 9 1234 5678"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input
                        id="address"
                        required
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        placeholder="Av. Providencia 1234, Depto 56"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          required
                          value={shippingData.city}
                          onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                          placeholder="Santiago"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="region">Región</Label>
                        <Select 
                          value={shippingData.region} 
                          onValueChange={(value) => setShippingData({ ...shippingData, region: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="metropolitana">Metropolitana</SelectItem>
                            <SelectItem value="valparaiso">Valparaíso</SelectItem>
                            <SelectItem value="biobio">Biobío</SelectItem>
                            <SelectItem value="araucania">La Araucanía</SelectItem>
                            <SelectItem value="loslagos">Los Lagos</SelectItem>
                            <SelectItem value="otra">Otra región</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Código Postal</Label>
                        <Input
                          id="postalCode"
                          value={shippingData.postalCode}
                          onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                          placeholder="7500000"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Continuar al Pago
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Información de Pago
                  </CardTitle>
                  <CardDescription>
                    Ingresa los datos de tu tarjeta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          required
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({ ...paymentData, cardNumber: formatCardNumber(e.target.value) })}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="pr-12"
                        />
                        <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                      <Input
                        id="cardName"
                        required
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value.toUpperCase() })}
                        placeholder="JUAN PÉREZ"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Fecha de Expiración</Label>
                        <Input
                          id="expiry"
                          required
                          value={paymentData.expiry}
                          onChange={(e) => setPaymentData({ ...paymentData, expiry: formatExpiry(e.target.value) })}
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          required
                          type="password"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <span>Tus datos están protegidos con encriptación SSL de 256 bits</span>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setStep('shipping')}
                      >
                        Volver
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1" 
                        size="lg"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Procesando...
                          </>
                        ) : (
                          <>Pagar {formatPrice(finalTotal)}</>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
                <CardDescription>
                  {items.length} {items.length === 1 ? 'producto' : 'productos'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-64 space-y-3 overflow-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="h-16 w-16 flex-shrink-0 rounded-md bg-sage-light/30" />
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-medium leading-tight">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Cant: {item.quantity}</p>
                        <p className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className={shippingCost === 0 ? 'text-primary' : ''}>
                      {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Envío gratis en compras sobre $30.000
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>

                <div className="space-y-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>Envío estimado: 3-5 días hábiles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Garantía de satisfacción de 30 días</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
