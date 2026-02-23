import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Lightbulb, Users, Rocket, TrendingDown, Clock, AlertTriangle, CheckCircle2, Leaf } from 'lucide-react'
import { useEffect } from 'react'
import SectionTransition from '../components/SectionTransition'

function AnimatedCounter({ value, inView }: { value: number; inView: boolean }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    if (inView) {
      const animation = animate(count, value, { duration: 2, ease: 'easeOut' })
      return animation.stop
    }
  }, [count, value, inView])

  return <motion.span>{rounded}</motion.span>
}

const journeySteps = [
  {
    icon: Lightbulb,
    title: 'A Ideia',
    description: 'Levar monitoramento climático inteligente ao campo de forma acessível, autossustentável e conectada.',
  },
  {
    icon: Users,
    title: 'A Equipe',
    description: '7 talentos em hardware, software, dados e gestão unidos para criar uma solução IoT completa.',
  },
  {
    icon: Rocket,
    title: 'O Resultado',
    description: 'Estação autônoma que coleta 5 variáveis climáticas em tempo real com energia 100% solar.',
  },
]

const problems = [
  { icon: Clock, text: 'Coleta manual de dados climáticos' },
  { icon: AlertTriangle, text: 'Falta de informações em tempo real' },
  { icon: TrendingDown, text: 'Alto custo operacional no campo' },
]

const solutions = [
  { icon: CheckCircle2, text: '5 variáveis climáticas monitoradas' },
  { icon: CheckCircle2, text: 'Energia solar 100% autossustentável' },
  { icon: CheckCircle2, text: 'Dados em tempo real via IoT' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="section-flow relative" style={{ background: 'var(--bg-primary)' }}>
      {/* Transition from Hero */}
      <SectionTransition position="top" variant="curve" />

      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="ambient-orb w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2"
        style={{ background: 'var(--accent)' }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-sm font-medium tracking-widest uppercase mb-3 block" style={{ color: 'var(--accent)' }}>
            Nossa História
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--text-primary)' }}>Do problema à </span>
            <span className="gradient-text">solução</span>
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Uma jornada de inovação para transformar a agricultura de precisão no Brasil
          </p>
        </motion.div>

        {/* Context Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-12 sm:mb-16"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-soft)' }}>
              <Leaf className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Por que o PluView existe?
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                O PluView leva <strong style={{ color: 'var(--accent)' }}>monitoramento climático inteligente</strong> ao campo de forma <strong style={{ color: 'var(--accent)' }}>acessível e autossustentável</strong>. Coletamos <strong style={{ color: 'var(--accent)' }}>5 variáveis climáticas em tempo real</strong> via IoT, permitindo decisões agrícolas precisas — eliminando deslocamentos, reduzindo custos e otimizando o uso de recursos hídricos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { value: '5', label: 'variáveis coletadas', accent: true },
              { value: '100%', label: 'autossustentável', accent: true },
              { value: '24/7', label: 'tempo real', accent: true },
              { value: 'IoT', label: 'conectividade', accent: true },
            ].map((stat) => (
              <div key={stat.label} className="card rounded-xl p-4 text-center">
                <div
                  className={`font-display text-xl sm:text-2xl md:text-3xl font-bold mb-1 ${stat.accent ? 'gradient-text' : ''}`}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="card rounded-2xl p-6 sm:p-8 relative group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" style={{ background: 'var(--accent-soft)' }}>
                  <step.icon className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                </div>
                <span className="text-4xl font-display font-bold" style={{ color: 'var(--border-strong)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Problem vs Solution */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card rounded-2xl p-6 sm:p-8"
            style={{ borderColor: 'rgba(248, 81, 73, 0.3)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(248, 81, 73, 0.1)' }}>
                <AlertTriangle className="w-5 h-5" style={{ color: 'var(--danger)' }} />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                O Problema
              </h3>
            </div>
            <ul className="space-y-4">
              {problems.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(248, 81, 73, 0.1)' }}>
                    <item.icon className="w-4 h-4" style={{ color: 'var(--danger)' }} />
                  </div>
                  <span className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card rounded-2xl p-6 sm:p-8"
            style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                A Solução
              </h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-soft)' }}>
                    <item.icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  </div>
                  <span className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-3 gap-3 sm:gap-6"
        >
          {[
            { value: 5, suffix: '', label: 'Variáveis climáticas' },
            { value: 24, suffix: '/7', label: 'Monitoramento' },
            { value: 100, suffix: '%', label: 'Energia solar' },
          ].map((stat) => (
            <div key={stat.label} className="card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <div className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter value={stat.value} inView={inView} />
                <span style={{ color: 'var(--text-muted)' }}>{stat.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Transition to Features */}
      <SectionTransition position="bottom" variant="curve" />
    </section>
  )
}
