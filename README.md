# Prevención Digital

Una aplicación web interactiva que presenta un programa de teatro educativo sobre ciberseguridad y prevención de riesgos digitales. Desarrollado para el Colegio Nacional y el Departamento de Cibercrimen de la Policía del Chaco.

## 🎭 Sobre el Proyecto

Este proyecto es una experiencia multimedia que combina teatro, tecnología y educación para concienciar sobre los peligros del mundo digital. A través de obras interactivas, explora temas como:

- **Identidad Digital**: Cómo construimos nuestra presencia en línea
- **Grooming**: Manipulación y abuso en entornos digitales
- **Cibercrimen**: Consecuencias del delito informático
- **Prevención**: Herramientas y estrategias para mantenerse seguro

## 🚀 Tecnologías Utilizadas

- **Framework**: Next.js 16.0.0
- **Lenguaje**: TypeScript
- **UI**: React 19 con componentes personalizados
- **Estilos**: Tailwind CSS con diseño retro/cyberpunk
- **Iconos**: Lucide React
- **Gestor de Paquetes**: pnpm

## 📋 Requisitos Previos

- Node.js >= 20.9.0
- pnpm (recomendado) o npm

## 🛠️ Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/prevencion-digital.git
cd prevencion-digital
```

### 2. Instalar dependencias
```bash
# Con pnpm (recomendado)
pnpm install

# O con npm
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
# Con pnpm
pnpm dev

# O con npm
npm run dev
```

### 4. Desplegar a GitHub Pages
```bash
# Desplegar automáticamente
pnpm run deploy

# O manualmente:
pnpm build
npx gh-pages -d out
```

### 5. Ver el sitio desplegado
Después del despliegue, tu sitio estará disponible en:  
`https://tu-usuario.github.io/prevencion-digital/`

## 📦 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm run deploy` - Construye y despliega a GitHub Pages
- `pnpm start` - Inicia el servidor de producción (después de build)
- `pnpm lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
prevencion-digital/
├── app/                    # Páginas de Next.js (App Router)
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── theater-program.tsx # Componente principal del programa
│   ├── ui/               # Componentes de UI reutilizables
│   └── theme-provider.tsx # Proveedor de tema
├── hooks/                 # Hooks personalizados
├── lib/                   # Utilidades y configuraciones
├── public/                # Archivos estáticos
└── styles/                # Estilos adicionales
```

## 🎨 Características

- **Interfaz Retro-Cyberpunk**: Diseño inspirado en terminales antiguos con efectos visuales modernos
- **Timeline Interactiva**: Muestra el progreso del programa en tiempo real
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **Estados Dinámicos**: Los eventos cambian de estado según la hora actual
- **Animaciones**: Efectos visuales para mejorar la experiencia

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

**Colegio Nacional**  
**Departamento de Cibercrimen - Policía del Chaco**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**⚠️ Advertencia de Contenido**: Esta aplicación contiene temas sensibles relacionados con grooming y cibercrimen. Se recomienda discreción y está destinada a fines educativos.</content>
<parameter name="filePath">/home/juan/Descargas/prevención digital/README.md