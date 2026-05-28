// Product and Cart Store
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'sprays' | 'aceites' | 'difusores' | 'esencias' | 'kits'
  image: string
  stock: number
  featured: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

// Mock Products Data
export const products: Product[] = [
  {
    id: '1',
    name: 'Spray Lavanda Relajante',
    description: 'Spray de aromaterapia con aceite esencial de lavanda para promover la calma y relajación.',
    price: 12990,
    category: 'sprays',
    image: '/products/spray-lavanda.jpg',
    stock: 25,
    featured: true,
  },
  {
    id: '2',
    name: 'Aceite Esencial de Eucalipto',
    description: 'Aceite puro de eucalipto ideal para difusores y masajes terapéuticos.',
    price: 8990,
    category: 'aceites',
    image: '/products/aceite-eucalipto.jpg',
    stock: 40,
    featured: true,
  },
  {
    id: '3',
    name: 'Difusor Cerámico Zen',
    description: 'Difusor artesanal de cerámica con diseño minimalista para tu hogar.',
    price: 24990,
    category: 'difusores',
    image: '/products/difusor-ceramico.jpg',
    stock: 15,
    featured: true,
  },
  {
    id: '4',
    name: 'Esencia de Menta',
    description: 'Esencia concentrada de menta para energizar y refrescar cualquier espacio.',
    price: 6990,
    category: 'esencias',
    image: '/products/esencia-menta.jpg',
    stock: 50,
    featured: false,
  },
  {
    id: '5',
    name: 'Kit Iniciación Aromaterapia',
    description: 'Kit completo con 4 aceites esenciales, difusor y guía de uso.',
    price: 45990,
    category: 'kits',
    image: '/products/kit-iniciacion.jpg',
    stock: 10,
    featured: true,
  },
  {
    id: '6',
    name: 'Spray Citrus Energizante',
    description: 'Mezcla de cítricos para activar tu energía y mejorar el ánimo.',
    price: 11990,
    category: 'sprays',
    image: '/products/spray-citrus.jpg',
    stock: 30,
    featured: false,
  },
  {
    id: '7',
    name: 'Aceite de Rosa Mosqueta',
    description: 'Aceite premium de rosa mosqueta para cuidado facial y corporal.',
    price: 15990,
    category: 'aceites',
    image: '/products/aceite-rosa.jpg',
    stock: 20,
    featured: true,
  },
  {
    id: '8',
    name: 'Difusor Eléctrico Premium',
    description: 'Difusor ultrasónico con luz LED y temporizador programable.',
    price: 34990,
    category: 'difusores',
    image: '/products/difusor-electrico.jpg',
    stock: 12,
    featured: false,
  },
  {
    id: '9',
    name: 'Esencia de Canela',
    description: 'Esencia cálida de canela perfecta para crear ambientes acogedores.',
    price: 7490,
    category: 'esencias',
    image: '/products/esencia-canela.jpg',
    stock: 35,
    featured: false,
  },
  {
    id: '10',
    name: 'Kit Relax Nocturno',
    description: 'Set especial con lavanda, manzanilla y difusor para el descanso.',
    price: 52990,
    category: 'kits',
    image: '/products/kit-relax.jpg',
    stock: 8,
    featured: true,
  },
  {
    id: '11',
    name: 'Spray Romero Concentración',
    description: 'Spray con romero y limón para mejorar la concentración y memoria.',
    price: 13490,
    category: 'sprays',
    image: '/products/spray-romero.jpg',
    stock: 22,
    featured: false,
  },
  {
    id: '12',
    name: 'Aceite de Árbol de Té',
    description: 'Aceite esencial antibacteriano y purificante de árbol de té.',
    price: 9990,
    category: 'aceites',
    image: '/products/aceite-teatree.jpg',
    stock: 45,
    featured: false,
  },
]

export const categories = [
  { id: 'all', name: 'Todos', icon: 'grid' },
  { id: 'sprays', name: 'Sprays', icon: 'spray' },
  { id: 'aceites', name: 'Aceites', icon: 'droplet' },
  { id: 'difusores', name: 'Difusores', icon: 'wind' },
  { id: 'esencias', name: 'Esencias', icon: 'flower' },
  { id: 'kits', name: 'Kits', icon: 'package' },
]

// Format price in CLP
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price)
}
