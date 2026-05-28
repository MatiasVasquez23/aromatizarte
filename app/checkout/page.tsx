'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
  CardTitle,
} from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Separator } from '@/components/ui/separator'

import {
  ArrowLeft,
  CreditCard,
  Check,
  Lock,
  Truck,
  ShieldCheck,
} from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()

  const { items, totalPrice, clearCart } = useCart()

  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const [step, setStep] = useState<'shipping' | 'payment'>(
    'shipping'
  )

  const [purchasedItems, setPurchasedItems] = useState<any[]>([])
  const [purchaseTotal, setPurchaseTotal] = useState(0)

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
          <h1 className="text-2xl font-bold">
            Tu carrito está vacío
          </h1>

          <p className="mt-2 text-muted-foreground">
            Agrega productos antes de continuar con el pago
          </p>

          <Link href="/tienda">
            <Button className="mt-6">
              Ver Productos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isComplete) {
    const orderNumber = `ARO-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`

    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-4xl border-green-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>

              <CardTitle className="text-4xl font-bold">
                ¡Pago completado!
              </CardTitle>

              <CardDescription className="text-lg">
                Tu pedido ha sido procesado con éxito.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* INFO ORDEN */}
              <div className="rounded-xl border bg-muted/20 p-6">
                <h2 className="mb-4 text-2xl font-semibold">
                  Información del Pedido
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Número de Orden
                    </p>

                    <p className="font-bold">
                      {orderNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Cliente
                    </p>

                    <p>
                      {shippingData.firstName}{' '}
                      {shippingData.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Correo
                    </p>

                    <p>{shippingData.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Teléfono
                    </p>

                    <p>{shippingData.phone}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground">
                      Dirección
                    </p>

                    <p>
                      {shippingData.address},{' '}
                      {shippingData.city},{' '}
                      {shippingData.region}
                    </p>
                  </div>
                </div>
              </div>

              {/* PRODUCTOS */}
              <div>
                <h2 className="mb-4 text-2xl font-semibold">
                  Productos Comprados
                </h2>

                <div className="space-y-4">
                  {purchasedItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between rounded-xl border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-20 overflow-hidden rounded-lg bg-sage-light/30">
                          <img
                            src={item.product.images?.[0]}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-semibold">
                            {item.product.name}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Cantidad: {item.quantity}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Precio Unitario:{' '}
                            {formatPrice(
                              item.product.price
                            )}
                          </p>
                        </div>
                      </div>

                      <p className="text-xl font-bold">
                        {formatPrice(
                          item.product.price *
                            item.quantity
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RESUMEN */}
              <div className="rounded-xl border p-6">
                <h2 className="mb-4 text-2xl font-semibold">
                  Resumen de Pago
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>

                    <span>
                      {formatPrice(purchaseTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Envío</span>

                    <span>
                      {purchaseTotal > 30000
                        ? 'Gratis'
                        : formatPrice(3990)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-3xl font-bold">
                    <span>Total Pagado</span>

                    <span>
                      {formatPrice(
                        purchaseTotal +
                          (purchaseTotal > 30000
                            ? 0
                            : 3990)
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* MÉTODO DE PAGO */}
              <div className="rounded-xl border p-6">
                <h2 className="mb-4 text-2xl font-semibold">
                  Método de Pago
                </h2>

                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5" />

                  <span>
                    Tarjeta terminada en{' '}
                    {paymentData.cardNumber.slice(-4)}
                  </span>
                </div>
              </div>

              {/* BOTONES */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  className="w-full"
                  onClick={() => window.print()}
                >
                  Descargar Recibo
                </Button>

                <Link
                  href="/tienda"
                  className="w-full"
                >
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

  const handlePaymentSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault()

    setIsProcessing(true)

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    )

    const clonedItems = JSON.parse(
      JSON.stringify(items)
    )

    setPurchasedItems(clonedItems)

    const calculatedTotal = clonedItems.reduce(
      (acc: number, item: any) =>
        acc +
        item.product.price * item.quantity,
      0
    )

    setPurchaseTotal(calculatedTotal)

    setIsProcessing(false)

    setIsComplete(true)
  }

  const formatCardNumber = (value: string) => {
    const v = value
      .replace(/\s+/g, '')
      .replace(/[^0-9]/gi, '')

    const matches = v.match(/\d{4,16}/g)

    const match =
      (matches && matches[0]) || ''

    const parts = []

    for (
      let i = 0, len = match.length;
      i < len;
      i += 4
    ) {
      parts.push(
        match.substring(i, i + 4)
      )
    }

    return parts.length
      ? parts.join(' ')
      : value
  }

  const formatExpiry = (value: string) => {
    const v = value
      .replace(/\s+/g, '')
      .replace(/[^0-9]/gi, '')

    if (v.length >= 2) {
      return (
        v.substring(0, 2) +
        '/' +
        v.substring(2, 4)
      )
    }

    return v
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/tienda"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la tienda
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              A
            </div>

            <span className="text-lg font-semibold">
              Aromatizarte
            </span>
          </Link>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            Pago Seguro
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto mb-8 max-w-3xl">
          <div className="flex items-center justify-center gap-4">
            <div
              className={`flex items-center gap-2 ${
                step === 'shipping'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  step === 'shipping'
                    ? 'bg-primary text-primary-foreground'
                    : step === 'payment'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted'
                }`}
              >
                {step !== 'shipping' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  '1'
                )}
              </div>

              <span className="hidden text-sm font-medium sm:inline">
                Envío
              </span>
            </div>

            <div className="h-px w-12 bg-border" />

            <div
              className={`flex items-center gap-2 ${
                step === 'payment'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  step === 'payment'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                2
              </div>

              <span className="hidden text-sm font-medium sm:inline">
                Pago
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}