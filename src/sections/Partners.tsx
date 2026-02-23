import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Handshake } from 'lucide-react'
import SectionTransition from '../components/SectionTransition'

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
    logo: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSIdcZOvxda5H5lfaYhly0TC-jUv_B-TSL0n4xSmeQWIyMPzUuwVCRRYckSlqKcOpCANp52gYwpqHt19zsSXfx87vGf8fPiZuHHQu722E6ma6bu2xu5H3bsilp4Rq0IDiBmMRVMWrMvVZ-FjYhysLfZOXGcG_XjwPNYwiUp1jlZbM6W0tlVMnGt=w16383',
    url: 'https://lmpp.fatecpompeia.edu.br/',
  },
]

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 mx-6 sm:mx-8 md:mx-12"
      title={partner.name}
    >
      <div
        className="flex items-center justify-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
        style={{
          minWidth: '160px',
          maxWidth: '220px',
          height: '90px',
        }}
      >
        <img
          src={partner.logo}
          alt={partner.name}
          className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-300"
          style={{ maxHeight: '55px' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = `<span class="font-display font-bold text-sm sm:text-base text-gray-500 group-hover:text-gray-800 transition-colors">${partner.name}</span>`
            }
          }}
        />
      </div>
    </a>
  )
}

export default function Partners() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners]

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <Handshake className="w-4 h-4" style={{ color: 'var(--tertiary)' }} />
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Ninguém cresce sozinho, nossos parceiros
            </span>
          </div>

          <span
            className="text-xs sm:text-sm font-medium tracking-widest uppercase mb-2 sm:mb-3 block"
            style={{ color: 'var(--tertiary)' }}
          >
            Colaboradores
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span style={{ color: 'var(--text-primary)' }}>Quem apoia o </span>
            <span className="gradient-text">PluView</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Instituições e organizações que acreditam no futuro da agricultura de precisão
          </p>
        </motion.div>

        {/* Infinite Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative overflow-hidden"
        >
          {/* Gradient masks for smooth edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, var(--bg-primary), transparent)',
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, var(--bg-primary), transparent)',
            }}
          />

          {/* Scrolling container */}
          <div className="flex animate-carousel hover:pause-animation">
            {duplicatedPartners.map((partner, index) => (
              <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
            ))}
          </div>
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
