import {useEffect, useRef, useState} from 'react';
import type {CSSProperties} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ThemedImage from '@theme/ThemedImage';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import powershellLight from '@site/../docs/powershell/images/xaml-window-light.png';
import powershellDark from '@site/../docs/powershell/images/xaml-window-dark.png';
import styles from './features.module.css';

type FeatureGroup = {
  title: string;
  description: string;
  points: readonly string[];
  light: string;
  dark: string;
  alt: string;
  wallpaper?: boolean;
  animation?: {light: string; dark: string};
  href: string;
  link: string;
};

const featureGroups: FeatureGroup[] = [
  {
    title: 'Controls and interaction states',
    description: 'Build with Fluent styled WPF controls for actions, forms, navigation, and feedback.',
    points: ['Buttons, pickers, tabs, navigation, flyouts, and dialogs', 'Hover, focus, checked, and disabled appearances', 'Automation peers for supported custom controls'],
    light: '/images/features/controls-light.png',
    dark: '/images/features/controls-dark.png',
    animation: {light: '/images/features/controls-light.gif', dark: '/images/features/controls-dark.gif'},
    alt: 'A Fluence dialog with buttons, a moving progress bar, and selection controls',
    href: '/docs/controls',
    link: 'Browse controls',
  },
  {
    title: 'Themes',
    description: 'Switch the same dialog between light, dark, and high contrast appearances at runtime.',
    points: ['Theme-aware brushes update at runtime', 'High contrast uses live Windows system colors', 'DynamicResource and ThemeResource support app-authored styles'],
    light: '/images/features/themes-light.png',
    dark: '/images/features/themes-dark.png',
    animation: {light: '/images/features/themes-light.gif', dark: '/images/features/themes-dark.gif'},
    alt: 'A Fluence dialog cycles through light, dark, and high contrast appearances',
    href: '/docs/theming',
    link: 'Explore theming',
  },
  {
    title: 'Accent colors',
    description: 'Apply a custom accent while keeping the dialog in the selected light or dark appearance.',
    points: ['Red, orange, yellow, light green, dark green, dark blue, light blue, purple, and pink', 'Accent-aware controls update together', 'Switch back to the Windows system accent when needed'],
    light: '/images/features/accents-light.png',
    dark: '/images/features/accents-dark.png',
    animation: {light: '/images/features/accents-light.gif', dark: '/images/features/accents-dark.gif'},
    alt: 'A Fluence dialog cycles through nine accent colors',
    href: '/docs/theming',
    link: 'Choose an accent',
  },
  {
    title: 'Windows and backdrops',
    description: 'FluenceWindow brings the title bar, caption controls, and backdrop policy into a WPF window.',
    points: ['Title-area content and navigation requests', 'Compare a solid window, Mica, and Acrylic', 'Fallback rendering when a requested effect is unavailable'],
    light: '/images/features/backdrops-light.png',
    dark: '/images/features/backdrops-dark.png',
    animation: {light: '/images/features/backdrops-light.gif', dark: '/images/features/backdrops-dark.gif'},
    alt: 'A Fluence window cycles through solid, Mica, and Acrylic backdrops',
    wallpaper: true,
    href: '/docs/how-to/window-and-title-bar',
    link: 'Configure a window',
  },
  {
    title: 'Dialogs for PowerShell',
    description: 'The companion module brings messages, input forms, progress, and hosted windows to scripts.',
    points: ['Windows PowerShell 5.1 and PowerShell 7.4 or later', 'The same light, dark, and accent experience', 'Runnable examples and a command reference'],
    light: powershellLight,
    dark: powershellDark,
    alt: 'PowerShell hosted window with Fluence controls',
    href: '/docs/powershell',
    link: 'Explore the PowerShell module',
  },
];

function FeatureVisual({group}: {group: FeatureGroup}) {
  const lightImage = useBaseUrl(group.light);
  const darkImage = useBaseUrl(group.dark);
  const lightAnimation = useBaseUrl(group.animation?.light ?? group.light);
  const darkAnimation = useBaseUrl(group.animation?.dark ?? group.dark);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!group.animation) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPlaying(!preference.matches);
    const followMotionPreference = () => setPlaying(!preference.matches);
    preference.addEventListener('change', followMotionPreference);
    return () => preference.removeEventListener('change', followMotionPreference);
  }, [group.animation]);

  return (
    <div className={styles.featureVisual}>
      {group.animation && playing && !failed ?
        <ThemedImage className={styles.groupImage} alt={group.alt} sources={{light: lightAnimation, dark: darkAnimation}} loading="lazy" onError={() => setFailed(true)} /> :
        <ThemedImage className={styles.groupImage} alt={group.alt} sources={{light: lightImage, dark: darkImage}} loading="lazy" />}
    </div>
  );
}

export default function FeaturesPage() {
  const pageRef = useRef<HTMLElement>(null);
  const backdropWallpaper = useBaseUrl('/images/features/backdrops-coronascape.webp');

  useEffect(() => {
    const page = pageRef.current;
    if (!page || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;

    const panels = Array.from(page.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15) return;
        const panel = entry.target as HTMLElement;
        panel.dataset.visible = 'true';
        observer.unobserve(panel);
      });
    }, {threshold: 0.15});
    panels.forEach((panel) => {
      const bounds = panel.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) panel.dataset.visible = 'true';
      else observer.observe(panel);
    });
    page.dataset.motionReady = 'true';

    const revealAll = () => {
      if (!preference.matches) return;
      panels.forEach((panel) => { panel.dataset.visible = 'true'; });
      observer.disconnect();
      delete page.dataset.motionReady;
    };
    const revealFocused = (event: FocusEvent) => {
      const panel = (event.target as Element | null)?.closest<HTMLElement>('[data-reveal]');
      if (!panel) return;
      panel.dataset.instant = 'true';
      panel.dataset.visible = 'true';
      observer.unobserve(panel);
    };
    const revealHashTarget = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      try {
        const panel = document.getElementById(decodeURIComponent(hash))?.closest<HTMLElement>('[data-reveal]');
        if (!panel) return;
        panel.dataset.instant = 'true';
        panel.dataset.visible = 'true';
        observer.unobserve(panel);
      } catch {
        // Ignore malformed fragments and keep the page visible.
      }
    };
    page.addEventListener('focusin', revealFocused);
    window.addEventListener('hashchange', revealHashTarget);
    preference.addEventListener('change', revealAll);
    revealHashTarget();
    return () => {
      observer.disconnect();
      page.removeEventListener('focusin', revealFocused);
      window.removeEventListener('hashchange', revealHashTarget);
      preference.removeEventListener('change', revealAll);
      delete page.dataset.motionReady;
    };
  }, []);

  return (
    <Layout title="Features" description="Explore Fluence.Wpf controls, themes, accent colors, window backdrops, C# APIs, and PowerShell dialogs.">
      <main ref={pageRef} className={styles.page}>
        <header className={styles.header}>
          <div className={styles.contentWidth}>
            <Heading as="h1">Features</Heading>
            <p>Fluent controls and theming for WPF applications, with a companion PowerShell module for desktop dialogs and windows.</p>
          </div>
        </header>
        <div className={styles.groupList}>
          {featureGroups.map((group, index) => (
            <section key={group.title} className={`${styles.groupSection} ${index % 2 === 1 ? styles.groupReverse : ''} ${group.wallpaper ? styles.backdropSection : ''}`} style={group.wallpaper ? {'--backdrop-wallpaper': `url("${backdropWallpaper}")`} as CSSProperties : undefined} aria-labelledby={`feature-${index}`} data-reveal="section">
              <div className={styles.contentWidth}>
                <div className={styles.groupCopy}>
                  <Heading as="h2" id={`feature-${index}`}>{group.title}</Heading>
                  <p className={styles.groupDescription}>{group.description}</p>
                  <ul className={styles.pointList}>
                    {group.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  <Link className={styles.groupLink} to={group.href}>{group.link} <span aria-hidden="true">→</span></Link>
                </div>
                {group.animation ? <FeatureVisual group={group} /> : <ThemedImage className={styles.groupImage} alt={group.alt} sources={{light: group.light, dark: group.dark}} loading="lazy" />}
              </div>
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
}
