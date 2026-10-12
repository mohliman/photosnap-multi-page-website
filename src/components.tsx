import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import logo from '../starter-code/assets/shared/desktop/logo.svg?raw';
import { features, type Story } from './data';
import s from './App.module.css';

// The challenge explicitly specifies anchors without real destinations for these CTAs.
export function DemoLink({ children, className = '', label }: { children: ReactNode; className?: string; label?: string }) {
  return <a href="#" className={className} aria-label={label} onClick={event => event.preventDefault()}>{children}</a>;
}

export function ArrowLink({ children, to, light = false }: { children: ReactNode; to?: string; light?: boolean }) {
  const content = <>{children}<img src="/shared/desktop/arrow.svg" width="43" height="14" alt="" /></>;
  const className = `${s.arrowLink} ${light ? s.lightArrow : ''}`;
  return to ? <Link className={className} to={to}>{content}</Link> : <DemoLink className={className}>{content}</DemoLink>;
}

function Logo({ light = false }: { light?: boolean }) {
  return <Link to="/" className={s.logo} aria-label="Photosnap home"><span aria-hidden="true" dangerouslySetInnerHTML={{ __html: light ? logo.replace('fill="#000"', 'fill="#fff"') : logo }} /></Link>;
}

const navigation = [['Stories', '/stories'], ['Features', '/features'], ['Pricing', '/pricing']] as const;

export function Header({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname, setOpen]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKey); desktop.removeEventListener('change', onResize); };
  }, [open, setOpen]);
  return <header className={s.header}>
    <div className={s.headerInner}>
      <Logo />
      <button className={s.menuToggle} ref={toggle} type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
        <img src={`/shared/mobile/${open ? 'close' : 'menu'}.svg`} width="20" height="20" alt="" />
      </button>
      <nav id="primary-navigation" className={`${s.navigation} ${open ? s.navigationOpen : ''}`} aria-label="Primary">
        <div className={s.navLinks}>{navigation.map(([name, path]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? s.activeNav : ''}>{name}</NavLink>)}</div>
        <DemoLink className={s.button}>Get an invite</DemoLink>
      </nav>
    </div>
    {open && <button className={s.backdrop} aria-label="Close navigation" tabIndex={-1} onClick={() => { setOpen(false); toggle.current?.focus(); }} />}
  </header>;
}

export function Footer() {
  return <footer className={s.footer}>
    <div className={s.footerInner}>
      <Logo light />
      <nav className={s.footerNav} aria-label="Footer"><Link to="/">Home</Link>{navigation.map(([name, path]) => <Link key={path} to={path}>{name}</Link>)}</nav>
      <div className={s.socials}>{['facebook', 'youtube', 'twitter', 'pinterest', 'instagram'].map(name => <a key={name} href={`https://${name === 'youtube' ? 'www.youtube' : name}.com/`} target="_blank" rel="noreferrer" aria-label={`${name.charAt(0).toUpperCase() + name.slice(1)} (opens in a new tab)`}><img src={`/shared/desktop/${name}.svg`} width="20" height="20" alt="" /></a>)}</div>
      <div className={s.footerInvite}><ArrowLink light>Get an invite</ArrowLink></div>
      <p className={s.copyright}>Copyright 2019. All Rights Reserved</p>
    </div>
  </footer>;
}

export function ResponsiveImage({ section, name, alt, className = '', eager = false }: { section: string; name: string; alt: string; className?: string; eager?: boolean }) {
  return <picture className={className}>
    <source media="(max-width: 767px)" srcSet={`/${section}/mobile/${name}.jpg`} />
    <source media="(max-width: 1023px)" srcSet={`/${section}/tablet/${name}.jpg`} />
    <img src={`/${section}/desktop/${name}.jpg`} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} />
  </picture>;
}

export function SplitSection({ title, children, image, alt, section = 'home', dark = false, reverse = false, hero = false, homeHero = false }: { title: string; children: ReactNode; image: string; alt: string; section?: string; dark?: boolean; reverse?: boolean; hero?: boolean; homeHero?: boolean }) {
  const Heading = hero || homeHero ? 'h1' : 'h2';
  return <section className={`${s.split} ${dark ? s.darkSplit : ''} ${reverse ? s.reverseSplit : ''} ${hero ? s.pageHero : ''} ${homeHero ? s.homeHero : ''}`}>
    <div className={s.splitText}><div className={s.splitCopy}><Heading>{title}</Heading>{children}</div></div>
    <ResponsiveImage className={s.splitImage} section={section} name={image} alt={alt} eager={hero || homeHero} />
  </section>;
}

export function StoryGrid({ items, dates = false }: { items: Story[]; dates?: boolean }) {
  return <section className={s.storyGrid} aria-label="Photo stories">{items.map(story => <DemoLink key={story.image} className={s.storyCard} label={`Read ${story.title} by ${story.author}`}>
    <picture><source media="(max-width: 767px)" srcSet={`/stories/mobile/${story.image}.jpg`} /><img src={`/stories/desktop/${story.image}.jpg`} alt={story.alt} loading="lazy" width="360" height="500" /></picture>
    <div className={s.storyCopy}>{dates && <time dateTime={story.dateTime}>{story.date}</time>}<h3>{story.title}</h3><p>by {story.author}</p><span className={`${s.arrowLink} ${s.lightArrow}`}>Read story<img src="/shared/desktop/arrow.svg" width="43" height="14" alt="" /></span></div>
  </DemoLink>)}</section>;
}

export function FeatureGrid({ all = false }: { all?: boolean }) {
  return <section className={`${s.featureGrid} ${all ? s.allFeatures : ''}`} aria-label="Photosnap features">{(all ? features : features.slice(0, 3)).map(feature => <article key={feature.icon} className={s.feature}>
    <div className={s.featureIcon}><img src={`/features/desktop/${feature.icon}.svg`} alt="" /></div><h3>{feature.title}</h3><p>{feature.text}</p>
  </article>)}</section>;
}

export function BetaBanner() {
  return <section className={s.beta}>
    <ResponsiveImage className={s.betaImage} section="shared" name="bg-beta" alt="" />
    <div className={s.betaInner}><h2>We’re in Beta.<br />Get your invite today!</h2><ArrowLink light>Get an invite</ArrowLink></div>
  </section>;
}

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    // Wait for the navigation disclosure to remove inert before moving focus.
    if (open || previousPath.current === location.pathname) return;
    previousPath.current = location.pathname;
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [location.pathname, open]);
  return <>
    <a href="#main-content" className={s.skipLink}>Skip to content</a>
    <Header open={open} setOpen={setOpen} />
    <main id="main-content" ref={main} tabIndex={-1} inert={open}>{children}</main>
    <div inert={open}><Footer /></div>
  </>;
}
