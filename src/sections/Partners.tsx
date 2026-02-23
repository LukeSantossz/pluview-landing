import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Handshake, ExternalLink } from 'lucide-react'
import SectionTransition from '../components/SectionTransition'

interface Partner {
  name: string
  description: string
  logo: string
  url: string
  accentColor: string
  accentColorLight: string
}

const partners: Partner[] = [
  {
    name: 'Grupo Progresso',
    description: 'Líder em agronegócio sustentável no Piauí e Minas Gerais',
    logo: 'https://www.grupoprogresso.agr.br/logos/progresso_verde_horizontal.png',
    url: 'https://www.grupoprogresso.agr.br/',
    accentColor: '#2d5a27',
    accentColorLight: '#4a8c40',
  },
  {
    name: 'Instituto Cultivar Progresso',
    description: 'Desenvolvimento social e ambiental no Piauí',
    logo: 'https://institutocultivar.com.br/wp-content/uploads/2024/01/logo-icp.svg',
    url: 'https://institutocultivar.com.br/',
    accentColor: '#1e6b4f',
    accentColorLight: '#28a077',
  },
  {
    name: 'Fundação Shunji Nishimura',
    description: 'Ecossistema de educação e inovação tecnológica',
    logo: 'https://fsnt.org.br/wp-content/uploads/2025/02/Logo-FSNT-horizontal-01.jpg',
    url: 'https://fsnt.org.br/',
    accentColor: '#004b87',
    accentColorLight: '#0073c4',
  },
  {
    name: 'CITAP',
    description: 'Centro de Inovação Tecnológica da Alta Paulista',
    logo: 'https://citap.org.br/logos/Logo-CITAP-horizontal-colorido-positivo.png',
    url: 'https://citap.org.br/',
    accentColor: '#e63946',
    accentColorLight: '#ff6b6b',
  },
  {
    name: 'LMPP',
    description: 'Laboratório de Monitoramento e Proteção de Plantas',
    logo: 'https://lmpp.fatecpompeia.edu.br/images/logo-lmpp.png',
    url: 'https://lmpp.fatecpompeia.edu.br/',
    accentColor: '#1a5f2a',
    accentColorLight: '#28a745',
  },
]

function PartnerCard({ partner, index, inView }: { partner: Partner; index: number; inView: boolean }) {
  return (
    <motion.a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      className="group block"
    >
      <div
        className="relative rounded-xl sm:rounded-2xl p-4 sm:p-5 h-full flex flex-col items-center text-center overflow-hidden transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 20px var(--shadow)',
        }}
      >
        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${partner.accentColor}15 0%, transparent 50%, ${partner.accentColor}08 100%)`,
          }}
        />

        {/* Top accent line - appears on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          style={{ background: `linear-gradient(90deg, ${partner.accentColor}, ${partner.accentColorLight})` }}
        />

        {/* Logo Container */}
        <div className="relative z-10 w-full h-16 sm:h-20 mb-3 sm:mb-4 rounded-lg sm:rounded-xl flex items-center justify-center p-3 overflow-hidden bg-white transition-all duration-300 group-hover:shadow-lg">
          <img
            src={partner.logo}
            alt={`Logo ${partner.name}`}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = `<span class="font-display font-bold text-base sm:text-lg" style="color: ${partner.accentColor}">${partner.name}</span>`
              }
            }}
          />
        </div>

        {/* Info */}
        <h3
          className="relative z-10 font-display text-sm sm:text-base font-semibold mb-1 transition-colors duration-300"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="group-hover:hidden">{partner.name}</span>
          <span className="hidden group-hover:inline" style={{ color: partner.accentColor }}>
            {partner.name}
          </span>
        </h3>
        <p
          className="relative z-10 text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-3"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {partner.description}
        </p>

        {/* Link indicator */}
        <div
          className="relative z-10 flex items-center gap-1 text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 mt-auto transform translate-y-2 group-hover:translate-y-0"
          style={{ color: partner.accentColor }}
        >
          <span>Visitar site</span>
          <ExternalLink className="w-3 h-3" />
        </div>

        {/* Bottom glow effect */}
        <div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-300"
          style={{ background: partner.accentColor }}
        />
      </div>
    </motion.a>
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
      <div
        className="ambient-orb w-[400px] h-[400px] top-1/2 -left-48 -translate-y-1/2"
        style={{ background: 'var(--tertiary)' }}
      />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
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

        {/* Partners Grid - 2 cols mobile, 3 cols tablet, 5 cols desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {partners.map((partner, index) => (
            <PartnerCard key={partner.name} partner={partner} index={index} inView={inView} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-[10px] sm:text-xs md:text-sm mt-6 sm:mt-8"
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
