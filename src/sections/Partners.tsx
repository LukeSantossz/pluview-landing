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

export default function Partners() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="partners" className="section-flow relative" style={{ background: 'var(--bg-primary)' }}>
      {/* Transition from Roadmap */}
      <SectionTransition position="top" variant="curve" />

      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-15" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <Handshake className="w-4 h-4" style={{ color: 'var(--tertiary)' }} />
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Parcerias que fortalecem
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

        {/* Partners Logos - Large and prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16"
        >
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group relative"
              title={partner.name}
            >
              {/* Logo container with white background for visibility */}
              <div
                className="relative flex items-center justify-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
                style={{
                  minWidth: '140px',
                  maxWidth: '200px',
                  height: '80px',
                }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ maxHeight: '50px' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = `<span class="font-display font-bold text-sm sm:text-base text-gray-600 group-hover:text-gray-900 transition-colors">${partner.name}</span>`
                    }
                  }}
                />
              </div>

              {/* Tooltip on hover */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
              >
                {partner.name}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-[10px] sm:text-xs md:text-sm mt-12 sm:mt-16"
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
