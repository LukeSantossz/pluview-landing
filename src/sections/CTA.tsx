import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Calendar, Users } from 'lucide-react'
import { useState } from 'react'
import SectionTransition from '../components/SectionTransition'
import ContactForm from '../components/ContactForm'

export default function CTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <section id="contact" className="section-flow relative" style={{ background: 'var(--bg-primary)' }}>
      {/* Transition from Team */}
      <SectionTransition position="top" variant="curve" />

      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div
        className="ambient-orb w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'var(--accent)' }}
      />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
        >
          <span style={{ color: 'var(--text-primary)' }}>Interessado no </span>
          <span className="gradient-text">PluView</span>
          <span style={{ color: 'var(--text-primary)' }}>?</span>
        </motion.h2>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 sm:mb-6"
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
          <span className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>Projeto em desenvolvimento ativo</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          Entre em contato para saber mais sobre o projeto, parcerias ou oportunidades de investimento
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn-primary w-full sm:w-auto"
          >
            <Calendar className="w-5 h-5" />
            Agendar Conversa
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="#team"
            className="btn-secondary w-full sm:w-auto"
          >
            <Users className="w-5 h-5" />
            Conhecer a Equipe
          </a>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}
