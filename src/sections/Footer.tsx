import { Heart, ExternalLink, MapPin, Github } from 'lucide-react'
import SectionTransition from '../components/SectionTransition'
import { PluViewLogo, InstitutoCultivarIcon, GrupoProgressoIcon } from '../components/Icons'

const navLinks = [
  { href: '#about', label: 'Nossa História' },
  { href: '#features', label: 'Funcionalidades' },
  { href: '#gallery', label: 'Galeria' },
  { href: '#partners', label: 'Parceiros' },
  { href: '#team', label: 'Equipe' },
  { href: '#contact', label: 'Contato' },
]

const institutionLinks = [
  { href: 'https://institutocultivar.com.br/', label: 'Instituto Cultivar Progresso', icon: InstitutoCultivarIcon },
  { href: 'https://www.grupoprogresso.agr.br/', label: 'Grupo Progresso', icon: GrupoProgressoIcon },
  { href: 'https://github.com/FhSoftwareSolutions', label: 'Nossa Organização', icon: Github },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-12 sm:pt-16 pb-6 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Transition from CTA */}
      <SectionTransition position="top" variant="curve" />

      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-2 mb-3 group"
            >
              <div className="w-9 h-9 group-hover:scale-105 transition-transform">
                <PluViewLogo className="w-full h-full" />
              </div>
              <span className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Plu<span style={{ color: 'var(--accent)' }}>View</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
              Monitoramento climático inteligente para o agronegócio brasileiro.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <MapPin className="w-3 h-3" />
              <span>Pompeia, SP — Brasil</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm" style={{ color: 'var(--text-primary)' }}>
              Navegação
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institution */}
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm" style={{ color: 'var(--text-primary)' }}>
              Links
            </h4>
            <ul className="space-y-2">
              {institutionLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm group transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {link.icon && <link.icon className="w-3 h-3" />}
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: 'var(--border-color)' }} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 text-center sm:text-left">
          <p className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
            © {currentYear} PluView
          </p>

          <p className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
            Desenvolvido com{' '}
            <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline text-red-500 mx-0.5" fill="currentColor" />{' '}
            por{' '}
            <a
              href="https://www.linkedin.com/in/lucas-gon%C3%A7alvessz/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-opacity hover:opacity-80"
              style={{ color: 'var(--accent)' }}
            >
              Lucas Gonçalves
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
