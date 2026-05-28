import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Leaf, Heart, Sparkles, Users } from 'lucide-react'

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sage-light/40 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Nuestra Historia</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Más de 5 años dedicados a crear productos de aromaterapia que 
            transforman espacios y mejoran vidas.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Esencia Natural nació de la pasión por el bienestar y la conexión con la 
              naturaleza. Fundada en 2019 en Santiago de Chile, comenzamos como un pequeño 
              emprendimiento familiar con la misión de llevar los beneficios de la 
              aromaterapia a cada hogar.
            </p>
            <p>
              Creemos firmemente que los aromas tienen el poder de transformar nuestro 
              estado de ánimo, mejorar nuestra calidad de sueño y crear ambientes que 
              nutren el alma. Por eso, cada uno de nuestros productos está elaborado 
              con ingredientes 100% naturales y procesos artesanales que respetan 
              tanto las tradiciones como el medio ambiente.
            </p>
            <p>
              Hoy, somos una comunidad de más de 1000 clientes que han descubierto 
              el poder sanador de nuestros aceites esenciales, sprays aromáticos y 
              difusores artesanales. Cada producto que sale de nuestras manos lleva 
              consigo nuestra dedicación y amor por lo que hacemos.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Nuestros Valores</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Leaf className="h-8 w-8" />,
                title: '100% Natural',
                description:
                  'Utilizamos únicamente ingredientes naturales y orgánicos, sin químicos ni aditivos sintéticos.',
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: 'Artesanal',
                description:
                  'Cada producto es elaborado a mano con técnicas tradicionales y atención al detalle.',
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: 'Bienestar',
                description:
                  'Nuestro objetivo es mejorar tu calidad de vida a través del poder de los aromas.',
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: 'Comunidad',
                description:
                  'Valoramos la conexión con nuestros clientes y su retroalimentación.',
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {value.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Nuestro Equipo</h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              {
                name: 'Carolina Muñoz',
                role: 'Fundadora y Aromaterapeuta',
                bio: 'Certificada en aromaterapia holística con más de 10 años de experiencia.',
              },
              {
                name: 'Diego Soto',
                role: 'Producción y Calidad',
                bio: 'Experto en formulación de productos naturales y control de calidad.',
              },
              {
                name: 'Valentina Reyes',
                role: 'Atención al Cliente',
                bio: 'Apasionada por el bienestar y el servicio excepcional al cliente.',
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-sage-light/50" />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
