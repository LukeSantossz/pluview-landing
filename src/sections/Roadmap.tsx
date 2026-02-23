import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Rocket, Server, Plug, BarChart3 } from 'lucide-react'
import SectionTransition from '../components/SectionTransition'

const roadmapItems = [
  {
    icon: Server,
    phase: 'Escalabilidade',
    title: 'Infraestrutura Multi-Estação',
    description: 'Arquitetura robusta para integrar múltiplas estações de monitoramento em uma única plataforma centralizada.',
    highlight: false,
  },
  {
    icon: Plug,
    phase: 'Integração',
    title: 'API de Conectividade',
    description: 'Interface padronizada para conexão com diferentes modelos de estações meteorológicas e sensores do mercado.',
    highlight: false,
  },
  {
    icon: BarChart3,
    phase: 'Inteligência',
    title: 'Análise Preditiva',
    description: 'Transformar dados climáticos em insights acionáveis para otimização da produção agrícola.',
    highlight: true,
  },
]

export default function Roadmap() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-flow relative" style={{ background: 'var(--bg-base)' }}>
      {/* Transition from Gallery */}
      <SectionTransition position="top" variant="curve" />

      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div
        className="ambient-orb w-[500px] h-[500px] top-0 right-0 -translate-y-1/2"
        style={{ background: 'var(--secondary)' }}
      />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span style={{ color: 'var(--text-primary)' }}>Próximos </span>
            <span className="gradient-text-subtle">passos</span>
          </h2>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <Rocket className="w-4 h-4" style={{ color: 'var(--secondary)' }} />
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Em Constante Evolução
            </span>
          </div>

          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Nossa jornada de inovação continua com foco em escalabilidade e inteligência de dados
          </p>
        </motion.div>

        {/* Roadmap Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group"
            >
              <div
                className="card rounded-2xl p-6 sm:p-8 h-full relative overflow-hidden"
                style={item.highlight ? { borderColor: 'rgba(6, 182, 212, 0.3)' } : {}}
              >
                {/* Phase indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: item.highlight ? 'var(--secondary-soft)' : 'var(--accent-soft)' }}
                  >
                    <item.icon
                      className="w-5 h-5"
                      style={{ color: item.highlight ? 'var(--secondary)' : 'var(--accent)' }}
                    />
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: item.highlight ? 'var(--secondary)' : 'var(--accent)' }}
                  >
                    {item.phase}
                  </span>
                </div>

                <h3
                  className="font-display text-lg sm:text-xl font-bold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>

                {/* Highlight glow effect */}
                {item.highlight && (
                  <div
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
                    style={{ background: 'var(--secondary)' }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm mt-8"
          style={{ color: 'var(--text-muted)' }}
        >
          Desenvolvendo o futuro da agricultura de precisão no Brasil
        </motion.p>
      </div>

      {/* Transition to Partners */}
      <SectionTransition position="bottom" variant="curve" />
    </section>
  )
}
