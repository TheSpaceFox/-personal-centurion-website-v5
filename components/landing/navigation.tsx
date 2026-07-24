'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { CenturionLogo } from '@/components/centurion-logo'
import { LocaleSwitcher } from '@/components/landing/locale-switcher'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const t = useTranslations('nav')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: t('adrian'), href: '#adrian' },
    { name: t('capabilities'), href: '#features' },
    { name: t('remote'), href: '#remote' },
    { name: t('limitedEdition'), href: '#limited-edition' },
    { name: t('secureYours'), href: '#pricing' },
    { name: t('support'), href: 'https://help.1human1ai.com/' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? 'top-4 left-4 right-4' : 'top-0 left-0 right-0'
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]'
            : 'bg-transparent max-w-[1400px]'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? 'h-14' : 'h-20'
          }`}
        >
          <a href="#" className="group shrink-0 transition-opacity hover:opacity-80">
            <CenturionLogo size={isScrolled ? 'sm' : 'md'} />
          </a>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <LocaleSwitcher />
            <Link
              href="/whitepaper"
              className={`text-foreground/70 hover:text-foreground transition-all duration-500 ${isScrolled ? 'text-xs' : 'text-sm'}`}
            >
              {t('whitepaper')}
            </Link>
            <Button
              size="sm"
              className={`bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 ${isScrolled ? 'px-4 h-8 text-xs' : 'px-6'}`}
              asChild
            >
              <a href="#pricing">{t('registerInterest')}</a>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LocaleSwitcher compact />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label={t('toggleMenu')}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : '0ms' }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div
            className={`space-y-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}
          >
            <LocaleSwitcher />
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 rounded-full h-14 text-base" asChild>
                <Link href="/whitepaper" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('whitepaper')}
                </Link>
              </Button>
              <Button
                className="flex-1 bg-foreground text-background rounded-full h-14 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
                asChild
              >
                <a href="#pricing">{t('registerInterest')}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
