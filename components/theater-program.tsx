"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Clock, Shield, X } from "lucide-react"

type Obra = {
  id: number
  titulo: string
  duracion: string
  hora: string
  director: string
  curso: string
  sinopsis: string
  elenco: string[]
  asistentes: string[]
}

type Status = "completed" | "in-progress" | "upcoming"

const EVENT_MONTH = 11 // 1-based (November)
const EVENT_DAY = 13
const EVENT_START_HOUR = 10
const EVENT_START_MINUTE = 30

const obras: Obra[] = [
  {
    id: 2,
    titulo: "CONECT@DOS",
    duracion: "20 min",
    hora: "10:50",
    director: "Profesora Silvia Inés Gamboa",
    curso: "4° año – 4ta división - Turno Tarde",
    sinopsis:
      "Muestra el lado más oscuro de las redes: una joven engañada, un profesor impune y una comunidad que despierta ante la ausencia de Amparo.",
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
    asistentes: ["Lucía López"],
  },
  {
    id: 1,
    titulo: "PERFIL RESTRINGIDO",
    duracion: "20 min",
    hora: "10:30",
    director: "Profesor Gonzalo Ezequiel Rajoy",
    curso: "4° año – 5ta división - Turno Mañana",
    sinopsis:
      "Revela que detrás de la pantalla nada es lo que parece. Es el reflejo de una realidad oculta tras cada perfil: el grooming —abuso de menores—.",
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
    asistentes: [
      "Barrios Luna Grisel",
      "Espinoza Daira Aramis",
      "Duarte Angelina Magalí",
    ],
  },
]

const bootSequence = [
  { text: "> Iniciando enlace con sistema PREVENCIÓN DIGITAL...", delay: 800 },
  { text: "> Abriendo canal cifrado con sala privada...", delay: 900 },
  { text: "> Verificando credenciales del elenco y equipo técnico...", delay: 850 },
  { text: "> Sincronizando horarios con protocolo de ciberseguridad...", delay: 880 },
  { text: "> Compilando programa interactivo para espectadores autorizados...", delay: 920 },
  { text: "> Acceso concedido. Cargando experiencia inmersiva...", delay: 1000 },
]

type TimelineItem = {
  data: Obra
  status: Status
}

function resolveAssetPrefix(): string {
  if (typeof process === "undefined") return ""
  const base = process.env.NEXT_PUBLIC_BASE_PATH
  if (!base) return ""
  return `/${base.replace(/^\/|\/$/g, "")}`
}

// Modal para mostrar elenco
function ElencoModal({
  isOpen,
  onClose,
  obra,
}: {
  isOpen: boolean
  onClose: () => void
  obra: Obra | null
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

        {obra.asistentes.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Asistentes y operadoras
            </h3>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {obra.asistentes.map((persona) => (
                <li key={persona} className="text-sm text-muted-foreground">
                  • {persona}
                </li>
              ))}
            </ul>
          </div>
        )}

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
  const [selectedObra, setSelectedObra] = useState<Obra | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [bootMessages, setBootMessages] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [isBooting, setIsBooting] = useState(true)

  const eventDayStart = useMemo(() => {
    const year = currentTime.getFullYear()
    return new Date(year, EVENT_MONTH - 1, EVENT_DAY, 0, 0, 0, 0)
  }, [currentTime])
  const eventDayEnd = useMemo(() => {
    const year = currentTime.getFullYear()
    return new Date(year, EVENT_MONTH - 1, EVENT_DAY + 1, 0, 0, 0, 0)
  }, [currentTime])
  const eventStart = useMemo(() => {
    const year = currentTime.getFullYear()
    return new Date(year, EVENT_MONTH - 1, EVENT_DAY, EVENT_START_HOUR, EVENT_START_MINUTE, 0, 0)
  }, [currentTime])
  const eventEndTime = useMemo(() => {
    const year = currentTime.getFullYear()
    return new Date(year, EVENT_MONTH - 1, EVENT_DAY, 12, 0, 0, 0)
  }, [currentTime])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let mounted = true
    let step = 0
    const timers: number[] = []

    const run = () => {
      if (!mounted) return
      if (step >= bootSequence.length) {
        setProgress(100)
        timers.push(window.setTimeout(() => {
          if (mounted) {
            setIsBooting(false)
          }
        }, 700))
        return
      }

      const entry = bootSequence[step]
      setBootMessages((prev) => [...prev, entry.text])
      setProgress(Math.min(95, Math.round(((step + 1) / (bootSequence.length + 1)) * 100)))
      step += 1
      timers.push(window.setTimeout(run, entry.delay))
    }

    timers.push(window.setTimeout(run, 350))

    return () => {
      mounted = false
      timers.forEach((id) => clearTimeout(id))
    }
  }, [])

  const isBeforeEventDay = currentTime < eventDayStart
  const isAfterEventDay = currentTime >= eventDayEnd
  const isEventOngoing = currentTime >= eventStart && currentTime < eventEndTime
  const isEventFinished = currentTime >= eventEndTime

  const countdown = useMemo(() => {
    const diffMs = eventStart.getTime() - currentTime.getTime()

    if (diffMs <= 0) {
      if (isEventFinished) {
        return {
          text: "La función ya finalizó. Gracias por acompañarnos.",
          className: "text-primary/80",
        }
      }

      return {
        text: "¡La función está en escena ahora mismo!",
        className: "text-red-400",
      }
    }

    const totalSeconds = Math.floor(diffMs / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)

    const segments: string[] = []
    if (days > 0) segments.push(`${days} día${days !== 1 ? "s" : ""}`)
    if (hours > 0) segments.push(`${hours} hora${hours !== 1 ? "s" : ""}`)
    if (minutes > 0) segments.push(`${minutes} minuto${minutes !== 1 ? "s" : ""}`)
    if (segments.length === 0) segments.push("menos de un minuto")

    const isUrgent = totalSeconds <= 3600

    return {
      text: `Faltan ${segments.join(", ")} para el inicio de la función.`,
      className: isUrgent ? "text-red-400" : "text-yellow-400",
    }
  }, [currentTime, eventStart, isAfterEventDay])

  // Simplified timeline: we only need to render obras and their duración.
  const timeline = useMemo(() => obras, [])

  const prefix = useMemo(resolveAssetPrefix, [])

  const openElenco = (obra: Obra) => {
    setSelectedObra(obra)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedObra(null)
  }


  return (
    <>
      {isBooting && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black">
          <div className="w-full max-w-xl px-6">
            <div className="rounded-lg border border-primary/60 bg-black/85 p-6 shadow-[0_0_25px_rgba(34,197,94,0.35)]">
              <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-primary">
                ▸ Accediendo a sala privada
              </p>
              <div className="max-h-48 overflow-hidden rounded-sm border border-primary/30 bg-black/70 p-4 font-mono text-xs text-green-400">
                {bootMessages.map((msg, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {msg}
                  </p>
                ))}
                <span className="animate-pulse text-green-300">▌</span>
              </div>
              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="h-full bg-primary transition-[width] duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`relative min-h-screen bg-background text-foreground scanline transition-opacity duration-500 ${
          isBooting ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={isBooting}
      >
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
                Comienza a las 10:30 hs | Finaliza a las 12:00 hs (aproximadamente)
              </p>
              <p className={`text-xs font-semibold uppercase md:text-sm ${countdown.className}`}>
                {countdown.text}
              </p>
              {isEventOngoing && (
                <p className="text-sm font-bold uppercase text-red-400">EN CURSO</p>
              )}
              {isEventFinished && (
                <p className="text-sm font-semibold uppercase text-primary/80">FINALIZADO</p>
              )}
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

          {/* Timeline vertical */}
          <div className="space-y-6">
            {[...timeline, { isBand: true } as any].map((item: any, index: number, arr: any[]) => {
              const isBand = item && item.isBand
              if (!isBand) {
                const obra: Obra = item
                return (
                  <div
                    key={obra.id}
                    className={`group relative border rounded-lg transition-all duration-300 border-primary/30 bg-card/40 hover:border-primary/50`}
                  >
                    {index < arr.length - 1 && (
                      <span className={`absolute left-[44px] md:left-[60px] top-full h-6 w-px bg-primary/40`} />
                    )}

                    <div className="grid grid-cols-[90px_1fr] gap-4 p-6 md:grid-cols-[120px_1fr_150px] md:gap-6">
                      {/* Duración */}
                      <div className="flex flex-col items-start">
                        <div className={`text-lg font-bold md:text-xl`}>{obra.duracion}</div>
                        <div className="text-xs text-muted-foreground">Duración</div>
                      </div>

                      {/* Contenido principal */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold uppercase text-primary md:text-xl">{obra.titulo}</h3>
                        <p className="text-sm italic leading-relaxed text-muted-foreground md:text-base">
                          {obra.sinopsis}
                        </p>
                        <div className="grid gap-2 text-xs text-muted-foreground md:grid-cols-2 md:text-sm">
                          <p>
                            <span className="font-semibold text-foreground">Curso:</span> {obra.curso}
                          </p>
                          <p>
                            <span className="font-semibold text-foreground">Dirección:</span> {obra.director}
                          </p>
                          <p className="md:col-span-2">
                            <span className="font-semibold text-foreground">Asistentes y operadoras:</span>{" "}
                            {obra.asistentes.join(", ")}
                          </p>
                        </div>
                      </div>

                      {/* Botón (desktop) */}
                      <div className="hidden flex-col items-end justify-between md:flex">
                        <button
                          onClick={() => openElenco(obra)}
                          className="mt-4 inline-flex items-center justify-center rounded-sm border border-primary px-4 py-2 text-xs font-semibold uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          Ver Elenco
                        </button>
                      </div>

                      {/* Botón (mobile) */}
                      <div className="col-span-2 flex flex-col gap-3 md:hidden">
                        <button
                          onClick={() => openElenco(obra)}
                          className="inline-flex items-center justify-center rounded-sm border border-primary px-4 py-2 text-xs font-semibold uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          Ver Elenco
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }

              // Band item
              return (
                <div
                  key="band-item"
                  className={`group relative border rounded-lg transition-all duration-300 border-primary/30 bg-card/40 hover:border-primary/50`}
                >
                  {index < arr.length - 1 && (
                    <span className={`absolute left-[44px] md:left-[60px] top-full h-6 w-px bg-primary/40`} />
                  )}

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary uppercase">BANDA EN VIVO: Los Patitos DeAdso</h3>
                    <ul className="mt-3 text-sm text-muted-foreground space-y-1">
                      <li>
                        <span className="font-semibold text-foreground">Voz 1:</span> Caravaca Julieta Belén
                      </li>
                      <li>
                        <span className="font-semibold text-foreground">Voz 2 y guitarra:</span> Benítez Candela
                      </li>
                      <li>
                        <span className="font-semibold text-foreground">Bajo:</span> Lavergne Pilar
                      </li>
                      <li>
                        <span className="font-semibold text-foreground">Teclado:</span> Giroldi Valentino
                      </li>
                    </ul>
                    <p className="mt-3 text-sm text-muted-foreground">A cargo del Profesor Adso Maidana.</p>
                  </div>
                </div>
              )
            })}
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
              Para más información sobre ciberseguridad:{" "}
              <a
                href="https://policia.chaco.gob.ar/"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline decoration-dotted underline-offset-2 hover:text-primary/80"
              >
                https://policia.chaco.gob.ar/
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Modal de elenco */}
      <ElencoModal isOpen={isModalOpen} onClose={closeModal} obra={selectedObra} />
      </div>
    </>
  )
}
