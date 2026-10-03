import {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import statusLight from '@site/../docs/screenshots/gallery/status-light.png';
import statusDark from '@site/../docs/screenshots/gallery/status-dark.png';
import styles from './index.module.css';

const benefits = [
  {title: 'Controls for everyday work', description: 'Build forms, navigation, dialogs, and feedback with Fluent styled WPF controls.'},
  {title: 'One theme across the app', description: 'Use light, dark, or high contrast, with the Windows accent or a custom color.'},
  {title: 'Windows that fit the system', description: 'Add a Fluent title bar and request Mica or Acrylic where Windows supports it.'},
  {title: 'WPF across three targets', description: 'Use the same library on .NET Framework 4.7.2, .NET 8 for Windows, or .NET 10 for Windows.'},
];

function Arrow() {
  return <span aria-hidden="true">→</span>;
}
export default function Home() {
  const lightLockup = useBaseUrl('/images/Fluence_Lockup_SideBySide_Dark.svg');
  const darkLockup = useBaseUrl('/images/Fluence_Lockup_SideBySide_Light.svg');
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
    <Layout title="Fluence.Wpf" description="Fluent controls, themes, and window chrome for WPF, plus a companion PowerShell module for dialogs and windows.">
      <main ref={pageRef} className={styles.page}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroLogoBanner}>
            <img className={`${styles.heroLockup} ${styles.heroLockupLight}`} src={lightLockup} alt="Fluence.Wpf" />
            <img className={`${styles.heroLockup} ${styles.heroLockupDark}`} src={darkLockup} alt="Fluence.Wpf" />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Heading as="h1" id="hero-title" className={styles.heroTitle}>
                <span className={styles.heroTitleAccent}>Fluent design</span><span className={styles.heroTitleNeutral}>&nbsp;for&nbsp;</span><span className={styles.heroTitleAccent}>WPF</span>
              </Heading>
              <p className={styles.heroLead}>Bring Windows 11 style controls, themes, and window chrome to the WPF apps you already build. Use the companion PowerShell module when a script needs a desktop UI.</p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryAction} to="/docs/csharp">Start with C# <Arrow /></Link>
                <Link className={styles.secondaryAction} to="/docs/powershell">Start with PowerShell <Arrow /></Link>
              </div>
              <p className={styles.heroMeta}>Windows 10 version 1809+ <span aria-hidden="true">·</span> BSD 3-Clause</p>
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
              <div><span className={styles.kicker}>WHAT YOU CAN BUILD</span><Heading as="h2" id="benefits-title">A familiar WPF workflow. A Fluent interface.</Heading></div>
              <p>Keep your XAML, bindings, and commands while updating the controls and surfaces people use every day.</p>
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
        <section className={styles.paths} aria-labelledby="paths-title" data-reveal="section">
          <div className={styles.contentWidth}>
            <span className={styles.kicker}>CHOOSE YOUR PATH</span>
            <Heading as="h2" id="paths-title">Start with a working example.</Heading>
            <div className={styles.pathGrid}>
              <article className={styles.pathCard}>
                <span className={styles.pathLabel}>C# LIBRARY</span>
                <Heading as="h3">Build a Fluent WPF window</Heading>
                <p>Set up the theme, open a window, and add your first controls in the basic walkthrough.</p>
                <Link className={styles.textLink} to="/docs/csharp/usage">Follow the C# walkthrough <Arrow /></Link>
              </article>
              <article className={styles.pathCard}>
                <span className={styles.pathLabel}>POWERSHELL MODULE</span>
                <Heading as="h3">Show a dialog from a script</Heading>
                <p>Import the module, show a message, and read validated input from a form.</p>
                <Link className={styles.textLink} to="/docs/powershell/usage">Follow the PowerShell guide <Arrow /></Link>
              </article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
