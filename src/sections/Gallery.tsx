import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Building2, Users2, Beaker } from 'lucide-react'
import SectionTransition from '../components/SectionTransition'

const galleryItems = [
  {
    src: '/imgs/foto_ex_projeto.jpg',
    title: 'Estação em Campo',
    location: 'Fazenda Progresso, Piauí',
    description: 'Primeira instalação de teste em ambiente real, monitorando precipitação na região de fronteira agrícola.',
    icon: MapPin,
  },
  {
    src: '/imgs/foto_ex_grupo_formal.jpg',
    title: 'Apresentação Institucional',
    location: 'Instituto Cultivar Progresso',
    description: 'Demonstração da solução para parceiros e investidores durante o Dia de Campo anual.',
    icon: Building2,
  },
  {
    src: '/imgs/foto_ex_grupo_informal.jpg',
    title: 'Equipe de Desenvolvimento',
    location: 'Pompeia, São Paulo',
    description: 'Os 7 desenvolvedores que transformaram a ideia em realidade durante meses de trabalho.',
    icon: Users2,
  },
]

const locations = [
  {
    title: 'Sede do Projeto',
    place: 'Pompeia, São Paulo',
    description: 'Desenvolvimento e montagem',
  },
  {
    title: 'Teste em Campo',
    place: 'Fazenda Progresso, Piauí',
    description: 'Validação em ambiente real',
  },
  {
    title: 'Parceiro Institucional',
    place: 'Instituto Cultivar Progresso',
    description: 'Apoio técnico e estrutural',
  },
]

export default function Gallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="gallery" className="section-flow relative" style={{ background: 'var(--bg-primary)' }}>
      {/* Transition from Features */}
      <SectionTransition position="top" variant="curve" />

      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div
        className="ambient-orb w-[500px] h-[500px] bottom-0 -left-64"
        style={{ background: 'var(--tertiary)' }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Beaker className="w-4 h-4" style={{ color: 'var(--tertiary)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Prova de Conceito — Instituto Cultivar Progresso
            </span>
          </div>

          <span className="text-sm font-medium tracking-widest uppercase mb-3 block" style={{ color: 'var(--tertiary)' }}>
            Galeria
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--text-primary)' }}>Registros do </span>
            <span className="gradient-text">projeto</span>
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Momentos que marcaram o desenvolvimento e validação em campo
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group"
            >
              <div className="card rounded-2xl overflow-hidden h-full">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover img-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-sm mb-1" style={{ color: 'var(--accent)' }}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 sm:p-5">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6"
        >
          {locations.map((loc) => (
            <div
              key={loc.title}
              className="card rounded-xl p-4 sm:p-6 text-center"
            >
              <h4 className="text-[10px] sm:text-xs uppercase tracking-wider mb-1 sm:mb-2" style={{ color: 'var(--text-muted)' }}>
                {loc.title}
              </h4>
              <p className="font-display text-base sm:text-lg font-semibold mb-0.5 sm:mb-1" style={{ color: 'var(--text-primary)' }}>
                {loc.place}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {loc.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Transition to Team */}
      <SectionTransition position="bottom" variant="curve" />
    </section>
  )
}
