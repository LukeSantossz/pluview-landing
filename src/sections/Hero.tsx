import { motion } from 'framer-motion'
import { ChevronDown, Droplets } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/imgs/foto_ex_projeto.jpg"
        >
          <source src="/vids/vid_ex_projeto.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm" style={{ color: 'var(--text-secondary)' }}>
            <Droplets className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            Inovação IoT para o Agronegócio
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6"
        >
          <span style={{ color: 'var(--text-primary)' }}>Plu</span>
          <span className="gradient-text">View</span>
        </motion.h1>

        {/* Subtitle - Marketing Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Onde os dados encontram o campo.</span>
          <br className="hidden sm:block" />{' '}
          Monitoramento climático autônomo, inteligente e 100% sustentável.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a href="#about" className="btn-primary w-full sm:w-auto">
            Conhecer o Projeto
          </a>
          <a href="#team" className="btn-secondary w-full sm:w-auto">
            Nossa Equipe
          </a>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: '5', label: 'Variáveis' },
            { value: '24/7', label: 'Tempo Real' },
            { value: '100%', label: 'Autônomo' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="text-xs uppercase tracking-widest hidden sm:block">Explorar</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  )
}
