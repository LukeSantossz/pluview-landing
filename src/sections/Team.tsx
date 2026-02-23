import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Linkedin, ExternalLink, Users } from 'lucide-react'
import SectionTransition from '../components/SectionTransition'

interface TeamMember {
  name: string
  role: string
  linkedin: string
  isLead?: boolean
}

const teamMembers: TeamMember[] = [
  {
    name: 'João Vinnycius',
    role: 'Coordenador',
    linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-vinnycius-matos-monteiro-ferreira-83b452286/',
    isLead: true,
  },
  {
    name: 'Lucas Gonçalves',
    role: 'Dados & Web',
    linkedin: 'https://www.linkedin.com/in/lucas-gon%C3%A7alvessz/',
    isLead: true,
  },
  {
    name: 'Gustavo Hono',
    role: 'Hardware & BD',
    linkedin: 'https://www.linkedin.com/in/gustavo-hono-a778b22b1/',
  },
  {
    name: 'Luís Otávio',
    role: 'Hardware',
    linkedin: 'https://www.linkedin.com/in/lu%C3%ADs-ot%C3%A1vio-jassi-rodrigues-72b6402b6/',
  },
  {
    name: 'Jonah Kunihiro',
    role: 'Gestão',
    linkedin: 'https://www.linkedin.com/in/jonah-nishimura-kunihiro-52920a2b6/',
  },
  {
    name: 'Andreas Berti',
    role: 'Documentação',
    linkedin: 'https://www.linkedin.com/in/andreas-trisoglio-berti-18238a303/',
  },
  {
    name: 'Mateus Robers',
    role: 'Software',
    linkedin: 'https://www.linkedin.com/in/mateus-robers-amaral-4672262b6/',
  },
]

const mentors: TeamMember[] = [
  {
    name: 'Stephen Kunihiro',
    role: 'Orientador',
    linkedin: 'https://www.linkedin.com/in/stephen-kunihiro-b5249525/',
  },
  {
    name: 'Hannes Fischer',
    role: 'Orientador',
    linkedin: 'https://www.linkedin.com/in/hannesfischer/',
  },
  {
    name: 'Reinaldo Bernardi',
    role: 'Orientador',
    linkedin: '',
  },
]

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function getGradient(index: number): string {
  const gradients = [
    'linear-gradient(135deg, #10b981, #06b6d4)',
    'linear-gradient(135deg, #06b6d4, #8b5cf6)',
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
    'linear-gradient(135deg, #f59e0b, #ef4444)',
    'linear-gradient(135deg, #10b981, #22c55e)',
    'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    'linear-gradient(135deg, #ec4899, #f43f5e)',
  ]
  return gradients[index % gradients.length]
}

function MemberCard({ member, index, delay }: { member: TeamMember; index: number; delay: number }) {
  const initials = getInitials(member.name)
  const gradient = getGradient(index)

  return (
    <motion.a
      href={member.linkedin || undefined}
      target={member.linkedin ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`group block ${!member.linkedin ? 'pointer-events-none' : 'cursor-pointer'}`}
    >
      <div
        className="team-card card rounded-xl sm:rounded-2xl p-5 sm:p-6 h-full flex flex-col items-center text-center"
        style={member.isLead ? { borderColor: 'rgba(16, 185, 129, 0.3)' } : {}}
      >
        {/* Avatar */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-3 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: gradient }}
          >
            <span className="text-white font-display font-bold text-base sm:text-lg">
              {initials}
            </span>
          </div>

          {/* LinkedIn overlay on hover */}
          {member.linkedin && (
            <div className="absolute inset-0 bg-[#0077b5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <h3
          className="font-display text-sm sm:text-base font-semibold mb-0.5 group-hover:text-[var(--accent)] transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          {member.name}
        </h3>
        <p className="text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {member.role}
        </p>

        {/* Link indicator */}
        {member.linkedin && (
          <div className="mt-2 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>
            <ExternalLink className="w-3 h-3" />
          </div>
        )}
      </div>
    </motion.a>
  )
}

export default function Team() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="team" className="section-flow relative" style={{ background: 'var(--bg-base)' }}>
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div
        className="ambient-orb w-[400px] h-[400px] top-1/4 -left-48"
        style={{ background: 'var(--accent)' }}
      />
      <div
        className="ambient-orb w-[350px] h-[350px] bottom-1/4 -right-40"
        style={{ background: 'var(--tertiary)' }}
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
            <span style={{ color: 'var(--text-primary)' }}>Quem faz </span>
            <span className="gradient-text">acontecer</span>
          </h2>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <Users className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Nossa Equipe
            </span>
          </div>

          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Talentos que transformaram uma ideia em realidade
          </p>
        </motion.div>

        {/* Developers Section */}
        <div className="mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6 sm:mb-8"
          >
            <div className="h-px w-16 sm:w-24" style={{ background: 'var(--border-color)' }} />
            <span className="text-xs sm:text-sm uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Desenvolvedores
            </span>
            <div className="h-px w-16 sm:w-24" style={{ background: 'var(--border-color)' }} />
          </motion.div>

          {/* First row - 4 members centered */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4 max-w-3xl mx-auto">
            {teamMembers.slice(0, 4).map((member, i) => (
              <MemberCard
                key={member.name}
                member={member}
                index={i}
                delay={0.05 + i * 0.05}
              />
            ))}
          </div>

          {/* Second row - 3 members centered */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto">
            {teamMembers.slice(4).map((member, i) => (
              <MemberCard
                key={member.name}
                member={member}
                index={i + 4}
                delay={0.25 + i * 0.05}
              />
            ))}
          </div>
        </div>

        {/* Mentors Section */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-6 sm:mb-8"
          >
            <div className="h-px w-16 sm:w-24" style={{ background: 'var(--border-color)' }} />
            <span className="text-xs sm:text-sm uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Orientadores
            </span>
            <div className="h-px w-16 sm:w-24" style={{ background: 'var(--border-color)' }} />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto">
            {mentors.map((mentor, i) => (
              <MemberCard
                key={mentor.name}
                member={mentor}
                index={i + 7}
                delay={0.4 + i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transition to CTA */}
      <SectionTransition position="bottom" variant="curve" />
    </section>
  )
}
