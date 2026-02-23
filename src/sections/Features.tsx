import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  CloudRain,
  Radio,
  Sun,
  BarChart3,
  Bell,
  Shield,
  Zap,
  Globe
} from 'lucide-react'
import SectionTransition from '../components/SectionTransition'

const features = [
  {
    icon: CloudRain,
    title: 'Monitoramento Preciso',
    description: 'Sensores calibrados para coleta de dados climáticos confiáveis em tempo real.',
    highlight: true,
  },
  {
    icon: Radio,
    title: 'Conectividade IoT',
    description: 'Transmissão de dados para a nuvem mesmo em locais remotos sem infraestrutura.',
    highlight: true,
  },
  {
    icon: Sun,
    title: 'Energia Solar',
    description: 'Alimentação 100% solar e autônoma, sem dependência de rede elétrica.',
    highlight: true,
  },
  {
    icon: BarChart3,
    title: 'Dashboard Intuitivo',
    description: 'Visualização interativa com gráficos, histórico e análise de tendências.',
  },
  {
    icon: Bell,
    title: 'Alertas Inteligentes',
    description: 'Notificações automáticas para eventos climáticos críticos.',
  },
  {
    icon: Shield,
    title: 'Alta Durabilidade',
    description: 'Estrutura resistente projetada para ambientes rurais extremos.',
  },
  {
    icon: Zap,
    title: 'Baixo Consumo',
    description: 'Eletrônica otimizada para máxima eficiência energética.',
  },
  {
    icon: Globe,
    title: 'Acesso Remoto',
    description: 'Acompanhe seus dados de qualquer lugar, a qualquer momento.',
  },
]

export default function Features() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="features" className="section-flow relative" style={{ background: 'var(--bg-base)' }}>
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div
        className="ambient-orb w-[500px] h-[500px] top-1/2 -right-64 -translate-y-1/2"
        style={{ background: 'var(--secondary)' }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span style={{ color: 'var(--text-primary)' }}>Tecnologia </span>
            <span className="gradient-text-subtle">integrada</span>
          </h2>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <Radio className="w-4 h-4" style={{ color: 'var(--secondary)' }} />
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Funcionalidades
            </span>
          </div>

          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Soluções completas para monitoramento climático na agricultura de precisão
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group"
            >
              <div
                className="card rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 h-full"
                style={feature.highlight ? { borderColor: 'rgba(16, 185, 129, 0.3)', background: 'var(--accent-soft)' } : {}}
              >
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 transition-all group-hover:scale-110"
                  style={{ background: feature.highlight ? 'var(--accent)' : 'var(--accent-soft)' }}
                >
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: feature.highlight ? 'white' : 'var(--accent)' }} />
                </div>
                <h3 className="font-display text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transition to Gallery */}
      <SectionTransition position="bottom" variant="curve" />
    </section>
  )
}
