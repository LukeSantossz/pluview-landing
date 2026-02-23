import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { PluViewLogo } from './Icons'

const navLinks = [
  { href: '#about', label: 'Sobre' },
  { href: '#features', label: 'Funcionalidades' },
  { href: '#gallery', label: 'Galeria' },
  { href: '#partners', label: 'Parceiros' },
  { href: '#team', label: 'Equipe' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 glass' : 'py-4 sm:py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform">
                <PluViewLogo className="w-full h-full" />
              </div>
              <span className="font-display text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Plu<span style={{ color: 'var(--accent)' }}>View</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:text-[var(--accent)] hover:bg-[var(--accent-soft)]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm font-medium rounded-full text-white transition-all hover:opacity-90"
                style={{ background: 'var(--accent)' }}
              >
                Contato
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0"
              style={{ background: 'var(--overlay)' }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 sm:w-80 p-6 pt-20"
              style={{
                background: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border-color)'
              }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 font-semibold rounded-xl transition-all hover:text-[var(--accent)] hover:bg-[var(--accent-soft)]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 px-6 py-3 text-white font-semibold text-center rounded-xl"
                  style={{ background: 'var(--accent)' }}
                >
                  Entrar em Contato
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
