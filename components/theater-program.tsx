"use client"

import { useState, useEffect } from "react"
import { Clock, Shield, Wifi } from "lucide-react"

// Datos de las obras del programa
const theaterSchedule = [
  {
    id: 1,
    time: "18:00",
    title: "IDENTIDAD DIGITAL",
    description:
      "Una exploración sobre cómo construimos nuestra identidad en el mundo digital y los peligros de compartir información personal sin protección adecuada.",
    duration: "25 min",
    status: "completed" as const,
  },
  {
    id: 2,
    time: "18:30",
    title: "TRAS LA PANTALLA",
    description:
      "Historia basada en hechos reales sobre grooming. Un thriller que expone las tácticas de manipulación utilizadas por depredadores en línea.",
    duration: "40 min",
    status: "in-progress" as const,
  },
  {
    id: 3,
    time: "19:15",
    title: "INTERMEDIO",
    description: "Pausa y reflexión. Espacio para procesar lo visto y prepararse para el acto final.",
    duration: "15 min",
    status: "upcoming" as const,
  },
  {
    id: 4,
    time: "19:30",
    title: "CÓDIGO ROTO",
    description:
      "El desenlace. Una obra que muestra las consecuencias del cibercrimen y cómo la tecnología puede ser usada tanto para bien como para mal.",
    duration: "35 min",
    status: "upcoming" as const,
  },
  {
    id: 5,
    time: "20:10",
    title: "DIÁLOGO COMUNITARIO",
    description:
      "Conversación abierta con el elenco y expertos en ciberseguridad. Preguntas, recursos y herramientas para protegerse en línea.",
    duration: "20 min",
    status: "upcoming" as const,
  },
]

export default function TheaterProgram() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [scheduleStatus, setScheduleStatus] = useState(theaterSchedule)

  // Actualizar tiempo cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Calcular estado de cada obra basado en la hora actual
  useEffect(() => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes()

    const updatedSchedule = theaterSchedule.map((show) => {
      const [hours, minutes] = show.time.split(":").map(Number)
      const showTime = hours * 60 + minutes
      const durationMinutes = Number.parseInt(show.duration)

      let status: "completed" | "in-progress" | "upcoming"

      if (now < showTime) {
        status = "upcoming"
      } else if (now >= showTime && now < showTime + durationMinutes) {
        status = "in-progress"
      } else {
        status = "completed"
      }

      return { ...show, status }
    })

    setScheduleStatus(updatedSchedule)
  }, [currentTime])

  return (
    <div className="min-h-screen bg-background text-foreground scanline">
      {/* Header con logos y título */}
      <header className="border-b border-primary/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          {/* Espacio para logos */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-primary border-glow rounded-sm flex items-center justify-center bg-background/50 overflow-hidden">
                <img
                  src="/images/logo_nacional.jpg"
                  alt="Logo Nacional"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-primary border-glow rounded-sm flex items-center justify-center bg-background/50 overflow-hidden">
                <img
                  src="/images/poli_chaco.jpeg"
                  alt="Policía del Chaco"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>
            </div>

            {/* Reloj en tiempo real */}
            <div className="flex items-center gap-2 text-primary border border-primary/50 px-4 py-2 rounded-sm border-glow">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg md:text-xl">
                {currentTime.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>
          </div>

          {/* Título principal */}
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wifi className="w-5 h-5 text-destructive animate-pulse" />
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                {">"} Sistema activo
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary text-shadow-glow mb-2">PREVENCIÓN DIGITAL</h1>
            <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wide">
              Colegio Nacional & Dpto. Cibercrimen Policia del Chaco | Programa Interactivo
            </p>
          </div>
        </div>
      </header>

      {/* Timeline principal */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Encabezado de la tabla */}
          <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr_100px] gap-4 mb-6 text-xs md:text-sm text-muted-foreground uppercase tracking-wider pb-4 border-b border-primary/30">
            <div>Hora</div>
            <div>Evento</div>
            <div className="hidden md:block text-right">Estado</div>
          </div>

          {/* Lista de obras */}
          <div className="space-y-4">
            {scheduleStatus.map((show, index) => (
              <div
                key={show.id}
                className={`group relative ${
                  show.status === "in-progress"
                    ? "border-primary border-glow bg-primary/5"
                    : "border-border hover:border-primary/50"
                } border rounded-sm transition-all duration-300`}
              >
                {/* Línea de conexión del timeline */}
                {index < scheduleStatus.length - 1 && (
                  <div
                    className={`absolute left-[40px] md:left-[50px] top-full h-4 w-0.5 ${
                      show.status === "completed" ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}

                <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr_100px] gap-4 p-4 md:p-6">
                  {/* Tiempo */}
                  <div className="flex flex-col items-start">
                    <div
                      className={`text-lg md:text-xl font-bold mb-1 ${
                        show.status === "in-progress" ? "text-primary animate-pulse" : "text-foreground"
                      }`}
                    >
                      {show.time}
                    </div>
                    <div className="text-xs text-muted-foreground">{show.duration}</div>

                    {/* Indicador visual del timeline */}
                    <div className="relative mt-2">
                      <div
                        className={`w-3 h-3 rounded-full border-2 ${
                          show.status === "completed"
                            ? "bg-primary border-primary"
                            : show.status === "in-progress"
                              ? "bg-primary border-primary animate-pulse"
                              : "bg-background border-border"
                        }`}
                      />
                      {show.status === "in-progress" && (
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary animate-ping opacity-75" />
                      )}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="min-w-0">
                    <h3
                      className={`text-base md:text-lg font-bold mb-2 uppercase ${
                        show.status === "in-progress" ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {show.status === "in-progress" && "> "}
                      {show.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{show.description}</p>
                  </div>

                  {/* Estado (solo desktop) */}
                  <div className="hidden md:flex items-start justify-end">
                    <span
                      className={`text-xs uppercase tracking-wider px-3 py-1 rounded-sm border ${
                        show.status === "completed"
                          ? "border-primary/50 text-primary bg-primary/10"
                          : show.status === "in-progress"
                            ? "border-primary text-primary bg-primary/20 border-glow"
                            : "border-border text-muted-foreground"
                      }`}
                    >
                      {show.status === "completed" && "✓ Completo"}
                      {show.status === "in-progress" && "▶ En vivo"}
                      {show.status === "upcoming" && "○ Próximo"}
                    </span>
                  </div>

                  {/* Estado mobile */}
                  <div className="md:hidden col-span-2 flex justify-start mt-2">
                    <span
                      className={`text-xs uppercase tracking-wider px-3 py-1 rounded-sm border ${
                        show.status === "completed"
                          ? "border-primary/50 text-primary bg-primary/10"
                          : show.status === "in-progress"
                            ? "border-primary text-primary bg-primary/20 border-glow"
                            : "border-border text-muted-foreground"
                      }`}
                    >
                      {show.status === "completed" && "✓ Completo"}
                      {show.status === "in-progress" && "▶ En vivo"}
                      {show.status === "upcoming" && "○ Próximo"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje de advertencia */}
          <div className="mt-12 border border-destructive/50 rounded-sm p-4 md:p-6 bg-destructive/5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-sm md:text-base font-bold text-destructive mb-2 uppercase">
                  Advertencia de Contenido Sensible
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Esta obra contiene temas relacionados con grooming, cibercrimen y manipulación digital. Se recomienda
                  discreción. Recursos de apoyo disponibles al finalizar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/30 mt-12 py-6 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            <span className="text-primary">█</span> MANTENTE SEGURO EN LÍNEA <span className="text-primary">█</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Para más información sobre ciberseguridad: www.argentina.gob.ar/aaip
          </p>
        </div>
      </footer>
    </div>
  )
}
