import {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import statusLight from '@site/../docs/screenshots/gallery/status-light.png';
import statusDark from '@site/../docs/screenshots/gallery/status-dark.png';
import styles from './index.module.css';

const benefits = [
  {title: '60+ documented UI types', description: 'Individual guides cover controls and related UI types for forms, navigation, dialogs, and feedback.'},
  {title: 'Themes that follow the user', description: 'Switch light, dark, and high contrast themes and use the Windows accent or a custom color.'},
  {title: 'Windows 10 and 11', description: 'Windows 10 version 1809 is the baseline. Windows 11 enables Mica and rounded corners where available.'},
  {title: 'BSD 3-Clause license', description: 'Use Fluence.Wpf in free or commercial products, subject to the license terms.'},
  {title: 'Three WPF targets', description: 'Build for .NET Framework 4.7.2, .NET 8 for Windows, or .NET 10 for Windows.'},
  {title: 'No Windows App SDK runtime', description: 'Use WPF and Windows APIs without adding a WinUI 3 runtime dependency.'},
];

function Arrow() {
  return <span aria-hidden="true">→</span>;
}
export default function Home() {
  const lightLockup = useBaseUrl('/images/heroimage_dark.png');
  const darkLockup = useBaseUrl('/images/heroimage_light.png');
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!page || !('IntersectionObserver' in window) || motionPreference.matches) return;

    const sections = Array.from(page.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15) return;
        const element = entry.target as HTMLElement;
        element.dataset.visible = 'true';
        observer.unobserve(element);
      });
    }, {threshold: 0.15});

    // Keep content visible when scripts are unavailable or before motion is activated.
    sections.forEach((section) => {
      const bounds = section.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        section.dataset.visible = 'true';
      } else {
        observer.observe(section);
      }
    });
    page.dataset.motionReady = 'true';

    const revealSection = (section: HTMLElement | null | undefined, instant = false) => {
      if (!section) return;
      if (instant) section.dataset.instant = 'true';
      section.dataset.visible = 'true';
      observer.unobserve(section);
    };
    const revealAncestors = (element: Element | null) => {
      let section = element?.closest<HTMLElement>('[data-reveal]');
      while (section && page.contains(section)) {
        revealSection(section, true);
        section = section.parentElement?.closest<HTMLElement>('[data-reveal]');
      }
    };
    const revealFocused = (event: FocusEvent) => {
      const target = event.target as Element | null;
      revealAncestors(target);
    };
    const revealHashTarget = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      try {
        revealAncestors(document.getElementById(decodeURIComponent(hash)));
      } catch {
        // A malformed fragment must not interrupt observer cleanup.
      }
    };
    const revealForReducedMotion = () => {
      if (!motionPreference.matches) return;
      sections.forEach((section) => revealSection(section, true));
      observer.disconnect();
      delete page.dataset.motionReady;
    };
    page.addEventListener('focusin', revealFocused);
    window.addEventListener('hashchange', revealHashTarget);
    motionPreference.addEventListener('change', revealForReducedMotion);
    revealHashTarget();

    return () => {
      observer.disconnect();
      page.removeEventListener('focusin', revealFocused);
      window.removeEventListener('hashchange', revealHashTarget);
      motionPreference.removeEventListener('change', revealForReducedMotion);
      delete page.dataset.motionReady;
    };
  }, []);

  return (
    <Layout title="Fluence.Wpf" description="Fluence.Wpf adds Windows 11 styling, controls, themes, and window chrome to WPF applications. A companion module provides PowerShell dialogs and windows.">
      <main ref={pageRef} className={styles.page}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroLogoBanner}>
            <img className={`${styles.heroLockup} ${styles.heroLockupLight}`} src={lightLockup} alt="Fluence.Wpf" />
            <img className={`${styles.heroLockup} ${styles.heroLockupDark}`} src={darkLockup} alt="Fluence.Wpf" />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Heading as="h1" id="hero-title" className={styles.heroTitle}>
                <span className={styles.heroTitleAccent}>WinUI 3</span><span className={styles.heroTitleNeutral}>&nbsp;but for&nbsp;</span><span className={styles.heroTitleAccent}>WPF</span>
              </Heading>
              <p className={styles.heroLead}>Get controls, themes, and window backdrops with the Win 11 look and feel, fully supported on .NET Framework 4.7.2 and above. There's even a module for PowerShell 5.1 and 7.4 and easy to use functions for dialogs.</p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryAction} to="/features">Explore features <Arrow /></Link>
                <Link className={styles.secondaryAction} to="/docs/controls">Browse controls <Arrow /></Link>
              </div>
              <p className={styles.heroMeta}>For .NET Framework 4.7.2, .NET 8, and .NET 10 <span aria-hidden="true">·</span> Windows 10 1809+</p>
            </div>
            <div className={styles.heroVisual}>
              <img src={statusLight} alt="Fluence.Wpf gallery showing status and progress controls in light theme" className={`${styles.heroScreenshot} ${styles.heroScreenshotLight}`} />
              <img src={statusDark} alt="Fluence.Wpf gallery showing status and progress controls in dark theme" className={`${styles.heroScreenshot} ${styles.heroScreenshotDark}`} />
            </div>
          </div>
          <div className={styles.heroRule} aria-hidden="true" />
        </section>

        <section className={styles.benefits} aria-labelledby="benefits-title" data-reveal="section">
          <div className={styles.contentWidth}>
            <div className={styles.benefitsHeading}>
              <div><span className={styles.kicker}>WHY FLUENCE</span><Heading as="h2" id="benefits-title">Built for real WPF projects.</Heading></div>
              <p>Modern controls and theming across current .NET and .NET Framework applications.</p>
            </div>
            <div className={styles.benefitGrid}>
              {benefits.map((benefit, index) => (
                <article className={styles.benefitCard} key={benefit.title}>
                  <span className={styles.benefitNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <Heading as="h3">{benefit.title}</Heading>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
            <Link className={styles.textLink} to="/features">Explore all features <Arrow /></Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
