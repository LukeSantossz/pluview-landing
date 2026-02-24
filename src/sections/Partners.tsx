import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Handshake } from 'lucide-react'
import SectionTransition from '../components/SectionTransition'
import { useEffect, useRef, useState } from 'react'

interface Partner {
  name: string
  logo: string
  url: string
}

const partners: Partner[] = [
  {
    name: 'Grupo Progresso',
    logo: 'https://www.grupoprogresso.agr.br/logos/progresso_verde_horizontal.png',
    url: 'https://www.grupoprogresso.agr.br/',
  },
  {
    name: 'Instituto Cultivar Progresso',
    logo: 'https://institutocultivar.com.br/wp-content/uploads/2024/01/logo-icp.svg',
    url: 'https://institutocultivar.com.br/',
  },
  {
    name: 'Fundação Shunji Nishimura',
    logo: 'https://fsnt.org.br/wp-content/uploads/2025/02/Logo-FSNT-horizontal-01.jpg',
    url: 'https://fsnt.org.br/',
  },
  {
    name: 'CITAP',
    logo: 'https://citap.org.br/logos/Logo-CITAP-horizontal-colorido-positivo.png',
    url: 'https://citap.org.br/',
  },
  {
    name: 'LMPP',
    logo: '/imgs/logo-lmpp.jpg',
    url: 'https://lmpp.fatecpompeia.edu.br/',
  },
]

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="partner-logo-item flex-shrink-0"
      title={partner.name}
    >
      <div className="flex items-center justify-center p-6 sm:p-8 rounded-2xl bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <img
          src={partner.logo}
          alt={partner.name}
          className="h-12 sm:h-16 md:h-20 w-auto max-w-[180px] sm:max-w-[220px] object-contain opacity-80 hover:opacity-100 transition-opacity"
          draggable={false}
        />
      </div>
    </a>
  )
}

function InfiniteCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const speed = 0.5 // pixels per frame

    const animate = () => {
      if (!isHovered && scrollContainer) {
        scrollPosition += speed

        // Get the width of one set of items
        const singleSetWidth = scrollContainer.scrollWidth / 3

        // Reset position seamlessly when we've scrolled one full set
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0
        }

        scrollContainer.style.transform = `translateX(-${scrollPosition}px)`
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isHovered])

  // Triple the partners for seamless loop
  const triplePartners = [...partners, ...partners, ...partners]

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }}
      />

      {/* Scrolling content */}
      <div
        ref={scrollRef}
        className="flex gap-6 sm:gap-8 md:gap-10 py-4 will-change-transform"
        style={{ width: 'fit-content' }}
      >
        {triplePartners.map((partner, index) => (
          <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
        ))}
      </div>
    </div>
  )
}

export default function Partners() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="partners" className="section-flow relative" style={{ background: 'var(--bg-primary)' }}>
      {/* Transition from Roadmap */}
      <SectionTransition position="top" variant="curve" />

      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-15" />

      <div ref={ref} className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 max-w-6xl mx-auto px-4"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span style={{ color: 'var(--text-primary)' }}>Quem apoia o </span>
            <span className="gradient-text">PluView</span>
          </h2>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <Handshake className="w-4 h-4" style={{ color: 'var(--tertiary)' }} />
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Ninguém cresce sozinho
            </span>
          </div>

          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Instituições e organizações que acreditam no futuro da agricultura de precisão
          </p>
        </motion.div>

        {/* Infinite Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <InfiniteCarousel />
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-[10px] sm:text-xs md:text-sm mt-10 sm:mt-14 max-w-6xl mx-auto px-4"
          style={{ color: 'var(--text-muted)' }}
        >
          Obrigado a todos que tornam este projeto possível
        </motion.p>
      </div>

      {/* Transition to Team */}
      <SectionTransition position="bottom" variant="curve" />
    </section>
  )
}
