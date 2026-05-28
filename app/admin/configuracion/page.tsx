'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Save, Store, Bell, Shield, Palette } from 'lucide-react'

export default function ConfiguracionPage() {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    storeName: 'Esencia Natural',
    storeEmail: 'contacto@esencia.cl',
    storePhone: '+56 9 1234 5678',
    currency: 'CLP',
    notifications: {
      newOrders: true,
      lowStock: true,
      newsletter: false,
    },
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Configuración</h1>
        <p className="mt-1 text-muted-foreground">
          Administra la configuración de tu tienda
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Store Settings */}
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Información de la Tienda</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Nombre de la tienda
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) =>
                  setSettings({ ...settings, storeName: e.target.value })
                }
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                value={settings.storeEmail}
                onChange={(e) =>
                  setSettings({ ...settings, storeEmail: e.target.value })
                }
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Teléfono
              </label>
              <input
                type="tel"
                value={settings.storePhone}
                onChange={(e) =>
                  setSettings({ ...settings, storePhone: e.target.value })
                }
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Moneda</label>
              <select
                value={settings.currency}
                onChange={(e) =>
                  setSettings({ ...settings, currency: e.target.value })
                }
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="CLP">CLP - Peso Chileno</option>
                <option value="USD">USD - Dólar Estadounidense</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Notificaciones</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                key: 'newOrders',
                label: 'Nuevos pedidos',
                description: 'Recibe notificaciones cuando lleguen nuevos pedidos',
              },
              {
                key: 'lowStock',
                label: 'Stock bajo',
                description: 'Alerta cuando el stock de un producto sea bajo',
              },
              {
                key: 'newsletter',
                label: 'Newsletter',
                description: 'Nuevos suscriptores al boletín',
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={
                      settings.notifications[
                        item.key as keyof typeof settings.notifications
                      ]
                    }
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          [item.key]: e.target.checked,
                        },
                      })
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Cuenta</h2>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-lg font-semibold text-primary">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Preview */}
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Tema</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-primary p-4">
              <div className="h-8 w-8 rounded-full bg-sage" />
              <span className="text-xs font-medium">Verde Salvia</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-lg border p-4 opacity-50">
              <div className="h-8 w-8 rounded-full bg-lavender" />
              <span className="text-xs font-medium">Lavanda</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-lg border p-4 opacity-50">
              <div className="h-8 w-8 rounded-full bg-peach" />
              <span className="text-xs font-medium">Durazno</span>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full gap-2" disabled={isSaving}>
          <Save className="h-4 w-4" />
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </div>
  )
}
