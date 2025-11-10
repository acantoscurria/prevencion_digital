"use client"

import React, { useState } from "react"
import { Clock, Shield, X } from "lucide-react"

// Datos de las obras reales
const obras = [
  {
    id: 1,
    titulo: "PERFIL RESTRINGIDO",
    duracion: "20 min",
    hora: "10:30",
    director: "Profesor Gonzalo Ezequiel Rajoy",
    curso: "4° y 5° año – Turno Mañana",
    sinopsis: "Revela que detrás de la pantalla nada es lo que parece. Es el reflejo de una realidad oculta tras cada perfil: el grooming —abuso de menores—.",
    elenco: [
      "Caravaca Julieta Belén",
      "Carlen Ernestina",
      "Castillo Delgado Avril",
      "Diejtiazchuk Sofía",
      "Fernández Aguirre Malena",
      "Fernández Xiomara",
      "González Sebastián",
      "Guillen Franco Fabián",
      "Itonaga Luciana",
      "Medina Nieva Jazmín",
      "Montiel Luciana Anahí",
      "Mosqueda Valentina",
      "Sosa Juan Ignacio",
      "Soto Celeste Juliana",
      "Spotorno Ana Carolina",
      "Wyss Sophia",
    ],
  },
  {
    id: 2,
    titulo: "CONECT@DOS",
    duracion: "20 min",
    hora: "10:50",
    director: "Profesora Silvia Inés Gamboa",
    curso: "4° año – 4ta división – Turno Tarde",
    sinopsis: "Muestra el lado más oscuro de las redes: una joven engañada, un profesor impune y una comunidad que despierta ante la ausencia de Amparo.",
    elenco: [
      "Aguirre Amparo",
      "Vargas Julián",
      "Caballero Sebas",
      "Barrios Zoe",
      "Barreto Camila",
      "Martins Melina",
      "Vallejos Nicolás",
      "Haurat Ariadna",
      "Larre Juan Cruz",
      "Sánchez Lautaro",
      "Morales Luciano",
      "Durán Benjamín",
      "Aguirre Lucía",
      "Barrios Thiago",
      "Rabossi Alan",
      "Chaparro Alejandro",
      "Córdoba Lara",
      "Córdoba Mía",
      "Córdoba Pía",
      "Franco Valentina",
      "Galarza Kiara",
      "Leonard González",
      "Ludueña Coronel",
      "Obes Morena",
      "Ramírez Julieta",
      "Samaniego Luz",
      "Sánchez Nicol",
      "Valenzuela Facundo",
      "Contreras Evangelina",
    ],
  },
]

// Modal para mostrar elenco
function ElencoModal({
  isOpen,
  onClose,
  obra,
}: {
  isOpen: boolean
  onClose: () => void
  obra: typeof obras[0] | null
}) {
  if (!isOpen || !obra) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg border-2 border-primary bg-background p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-primary hover:text-destructive transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="mb-2 text-2xl font-bold text-primary uppercase">{obra.titulo}</h2>
        <p className="mb-4 text-sm text-muted-foreground">{obra.curso}</p>
        <p className="mb-6 italic text-muted-foreground">Dirección: {obra.director}</p>

        <h3 className="mb-4 text-lg font-bold text-primary uppercase">Elenco:</h3>
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {obra.elenco.map((actor, idx) => (
            <li key={idx} className="text-sm text-foreground">
              • {actor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function TheaterProgram() {
  const [selectedObra, setSelectedObra] = useState<typeof obras[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const openElenco = (obra: typeof obras[0]) => {
    setSelectedObra(obra)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedObra(null)
  }

  const getPrefix = () => {
    if (typeof process === "undefined") return ""
    return process.env.NEXT_PUBLIC_BASE_PATH
      ? `/${process.env.NEXT_PUBLIC_BASE_PATH.replace(/^\/|\/$/g, "")}`
      : ""
  }

  const prefix = getPrefix()

  return (
    <div className="min-h-screen bg-background text-foreground scanline">
      {/* Header con logos reorganizados */}
      <header className="border-b border-primary/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          {/* Logos en grid responsivo */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 flex-wrap">
            <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-primary border-glow rounded-lg flex items-center justify-center bg-background/50 overflow-hidden hover:border-primary/80 transition-all">
              <img
                src={`${prefix}/images/logo_nacional.jpg`}
                alt="Logo Nacional"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-primary border-glow rounded-lg flex items-center justify-center bg-background/50 overflow-hidden hover:border-primary/80 transition-all">
              <img
                src={`${prefix}/images/poli_chaco.jpeg`}
                alt="Policía del Chaco"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-primary border-glow rounded-lg flex items-center justify-center bg-background/50 overflow-hidden hover:border-primary/80 transition-all">
              <img
                src={`${prefix}/images/Cibercrimen.png`}
                alt="Cibercrimen"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
          </div>

          {/* Reloj y título */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary border border-primary/50 px-4 py-2 rounded-sm border-glow w-fit mx-auto">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg md:text-xl">
                {currentTime.toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-primary text-shadow-glow">
              PREVENCIÓN DIGITAL EN ESCENA
            </h1>

            <div className="space-y-1">
              <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wide">
                13 de noviembre • Teatro Guido Miranda
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Comienza a las 10:30 hs | Finaliza a las 11:10 hs (aproximadamente)
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Encabezado */}
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 uppercase">
              Programa de Obras
            </h2>
            <p className="text-muted-foreground">
              Dos obras de teatro que abordan la ciberseguridad y la protección en línea
            </p>
          </div>

          {/* Obras en grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {obras.map((obra) => (
              <div
                key={obra.id}
                className="border-2 border-primary/30 rounded-lg p-6 bg-card/50 hover:border-primary/60 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                {/* Hora */}
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-mono font-bold text-primary">{obra.hora}</span>
                  <span className="text-xs text-muted-foreground">({obra.duracion})</span>
                </div>

                {/* Título */}
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 uppercase">
                  {obra.titulo}
                </h3>

                {/* Información */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Curso:</span> {obra.curso}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Dirección:</span>{" "}
                    {obra.director}
                  </p>
                </div>

                {/* Sinopsis */}
                <p className="text-sm md:text-base text-muted-foreground italic mb-6 leading-relaxed">
                  "{obra.sinopsis}"
                </p>

                {/* Botón Ver Elenco */}
                <button
                  onClick={() => openElenco(obra)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-2 rounded-sm font-semibold text-sm uppercase border border-primary border-glow"
                >
                  Ver Elenco
                </button>
              </div>
            ))}
          </div>

          {/* Advertencia */}
          <div className="mt-12 border border-destructive/50 rounded-lg p-6 bg-destructive/5">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-base font-bold text-destructive mb-2 uppercase">
                  Aclaraciones antes de la función
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>No filmar ni tomar fotografías durante la obra.</li>
                  <li>No comer ni beber dentro de la sala.</li>
                  <li>Mantener silencio y evitar el uso de celulares durante la función.</li>
                  <li>
                    Recordar que esta es una obra con un mensaje <strong>social y educativo</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pie de página */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary">█</span> MANTENTE SEGURO EN LÍNEA{" "}
              <span className="text-primary">█</span>
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              Para más información sobre ciberseguridad: www.argentina.gob.ar/aaip
            </p>
          </div>
        </div>
      </main>

      {/* Modal de elenco */}
      <ElencoModal isOpen={isModalOpen} onClose={closeModal} obra={selectedObra} />
    </div>
  )
}
