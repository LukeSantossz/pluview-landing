import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Navigation } from 'lucide-react'

// Coordenadas reais
const ORIGIN: [number, number] = [-22.11, -50.17] // Pompeia, SP
const DESTINATION: [number, number] = [-7.53, -42.53] // Piauí
const CENTER: [number, number] = [-14.5, -46.5] // Centro do Brasil

// Calcular distância (Haversine)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

const distance = calculateDistance(ORIGIN[0], ORIGIN[1], DESTINATION[0], DESTINATION[1])

// Ícones customizados com cores do tema
const createOriginIcon = () => L.divIcon({
  className: 'custom-marker-origin',
  html: `
    <div class="marker-container">
      <div class="marker-pulse" style="background: var(--accent);"></div>
      <div class="marker-dot" style="background: var(--accent);"></div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
})

const createDestinationIcon = () => L.divIcon({
  className: 'custom-marker-dest',
  html: `
    <div class="marker-container">
      <div class="marker-pulse" style="background: var(--secondary);"></div>
      <div class="marker-dot" style="background: var(--secondary);"></div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
})

// Componente para animar a linha
function AnimatedRoute({ isDark }: { isDark: boolean }) {
  const map = useMap()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Ajustar bounds para mostrar os dois pontos
    const bounds = L.latLngBounds([ORIGIN, DESTINATION])
    map.fitBounds(bounds, { padding: [50, 50] })

    // Animar a linha
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 1) return 0
        return p + 0.015
      })
    }, 50)

    return () => clearInterval(interval)
  }, [map])

  // Criar pontos intermediários para a curva
  const curvePoints: [number, number][] = []
  const steps = 50
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const controlLat = (ORIGIN[0] + DESTINATION[0]) / 2
    const controlLon = (ORIGIN[1] + DESTINATION[1]) / 2 - 3

    const lat = (1 - t) ** 2 * ORIGIN[0] + 2 * (1 - t) * t * controlLat + t ** 2 * DESTINATION[0]
    const lon = (1 - t) ** 2 * ORIGIN[1] + 2 * (1 - t) * t * controlLon + t ** 2 * DESTINATION[1]
    curvePoints.push([lat, lon])
  }

  const animatedIndex = Math.floor(progress * curvePoints.length)
  const travelPoint = curvePoints[Math.min(animatedIndex, curvePoints.length - 1)]

  return (
    <>
      {/* Linha tracejada de fundo */}
      <Polyline
        positions={curvePoints}
        pathOptions={{
          color: isDark ? '#374151' : '#d1d5db',
          weight: 3,
          dashArray: '8, 8',
          opacity: 0.6,
        }}
      />
      {/* Linha principal */}
      <Polyline
        positions={curvePoints}
        pathOptions={{
          color: isDark ? '#10b981' : '#059669',
          weight: 4,
          opacity: 0.9,
        }}
      />
      {/* Ponto viajante */}
      {travelPoint && (
        <Marker
          position={travelPoint}
          icon={L.divIcon({
            className: 'travel-dot',
            html: `<div class="travel-dot-inner"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          })}
        />
      )}
    </>
  )
}

export default function AnimatedMap() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [mapReady, setMapReady] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Detectar tema
    const checkTheme = () => {
      setIsDark(!document.documentElement.classList.contains('light'))
    }
    checkTheme()

    // Observer para mudanças de tema
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (inView) {
      setTimeout(() => setMapReady(true), 200)
    }
  }, [inView])

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto px-4 sm:px-0">
      {/* CSS para marcadores e tema */}
      <style>{`
        @keyframes pulse-marker {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.8); opacity: 0; }
        }
        .marker-container {
          position: relative;
          width: 36px;
          height: 36px;
        }
        .marker-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          animation: pulse-marker 2s ease-out infinite;
        }
        .marker-dot {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .travel-dot-inner {
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 12px 4px rgba(255,255,255,0.5);
        }
        .leaflet-container {
          background: var(--bg-secondary) !important;
          font-family: inherit;
          border-radius: 1rem;
        }
        .leaflet-control-attribution {
          display: none !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          border-radius: 0.5rem !important;
          overflow: hidden;
          box-shadow: 0 2px 8px var(--shadow) !important;
        }
        .leaflet-control-zoom a {
          background: var(--bg-card) !important;
          color: var(--text-primary) !important;
          border: 1px solid var(--border-color) !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 30px !important;
          font-size: 16px !important;
        }
        .leaflet-control-zoom a:hover {
          background: var(--bg-elevated) !important;
          color: var(--accent) !important;
        }
        .leaflet-control-zoom-in {
          border-radius: 0.5rem 0.5rem 0 0 !important;
        }
        .leaflet-control-zoom-out {
          border-radius: 0 0 0.5rem 0.5rem !important;
        }
        @media (max-width: 640px) {
          .leaflet-control-zoom {
            margin: 8px !important;
          }
          .leaflet-control-zoom a {
            width: 28px !important;
            height: 28px !important;
            line-height: 26px !important;
            font-size: 14px !important;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden card"
      >
        {mapReady && (
          <MapContainer
            key={isDark ? 'dark' : 'light'}
            center={CENTER}
            zoom={4}
            className="w-full h-full"
            zoomControl={true}
            scrollWheelZoom={true}
            dragging={true}
          >
            <TileLayer url={tileUrl} attribution="" />
            <AnimatedRoute isDark={isDark} />
            <Marker position={ORIGIN} icon={createOriginIcon()} />
            <Marker position={DESTINATION} icon={createDestinationIcon()} />
          </MapContainer>
        )}

        {/* Loading */}
        {!mapReady && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
          </div>
        )}

        {/* Label origem - responsivo */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={inView && mapReady ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="absolute left-2 sm:left-3 bottom-14 sm:bottom-16 glass rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg z-[1000]"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--accent)' }}
            >
              <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>CITAP</p>
              <p className="text-[8px] sm:text-xs leading-tight" style={{ color: 'var(--text-muted)' }}>Fatec Pompeia, SP</p>
            </div>
          </div>
        </motion.div>

        {/* Label destino - responsivo */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={inView && mapReady ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="absolute right-2 sm:right-3 top-12 sm:top-16 glass rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg z-[1000]"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--secondary)' }}
            >
              <Navigation className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>Fazenda Progresso</p>
              <p className="text-[8px] sm:text-xs leading-tight" style={{ color: 'var(--text-muted)' }}>Piauí</p>
            </div>
          </div>
        </motion.div>

        {/* Distância - responsivo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView && mapReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg z-[1000]"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" style={{ background: 'var(--accent)' }} />
              <span className="text-[8px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>Sede</span>
            </div>
            <span className="text-[10px] sm:text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              ~{distance.toLocaleString('pt-BR')} km
            </span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" style={{ background: 'var(--secondary)' }} />
              <span className="text-[8px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>Campo</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Legenda */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.1 }}
        className="text-center text-[10px] sm:text-sm mt-3 sm:mt-4"
        style={{ color: 'var(--text-muted)' }}
      >
        Da sede ao campo: validação em ambiente real no nordeste brasileiro
      </motion.p>
    </div>
  )
}
