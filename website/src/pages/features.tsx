import {useEffect, useRef, useState} from 'react';
import type {CSSProperties} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ThemedImage from '@theme/ThemedImage';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import powershellLight from '@site/../docs/powershell/images/xaml-window-light.png';
import powershellDark from '@site/../docs/powershell/images/xaml-window-dark.png';
import backdropGeometry from './backdrops.geometry.json';
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
    title: 'Controls that belong together',
    description: 'Give forms, navigation, and feedback a consistent Fluent appearance without changing how you build WPF interfaces.',
    points: ['Buttons, pickers, tabs, navigation, flyouts, and dialogs', 'States for pointer, keyboard focus, selection, and disabled controls', 'Automation peers for supported custom controls'],
    light: '/images/features/controls-light.png',
    dark: '/images/features/controls-dark.png',
    animation: {light: '/images/features/controls-light.gif', dark: '/images/features/controls-dark.gif'},
    alt: 'A Fluence dialog with buttons, a moving progress bar, and selection controls',
    href: '/docs/controls',
    link: 'Browse controls',
  },
  {
    title: 'Themes',
    description: 'Change appearance while a window is open. Theme resources update the controls together.',
    points: ['Light, dark, and Windows high contrast appearances', 'Theme-aware brushes update at runtime', 'DynamicResource and ThemeResource support app-authored styles'],
    light: '/images/features/themes-light.png',
    dark: '/images/features/themes-dark.png',
    animation: {light: '/images/features/themes-light.gif', dark: '/images/features/themes-dark.gif'},
    alt: 'A Fluence dialog cycles through light, dark, and high contrast appearances',
    href: '/docs/theming',
    link: 'Explore theming',
  },
  {
    title: 'Accent colors',
    description: 'Use the Windows accent or choose a color that fits your application. Accent-aware controls update together.',
    points: ['Use the system accent by default', 'Choose one custom color or separate light and dark colors', 'Return to the system accent at runtime'],
    light: '/images/features/accents-light.png',
    dark: '/images/features/accents-dark.png',
    animation: {light: '/images/features/accents-light.gif', dark: '/images/features/accents-dark.gif'},
    alt: 'A Fluence dialog cycles through nine accent colors',
    href: '/docs/theming',
    link: 'Choose an accent',
  },
  {
    title: 'Windows and backdrops',
    description: 'Make the window frame part of the experience with a Fluent title bar and system backdrop options.',
    points: ['Place application content in the title area', 'Request Mica or Acrylic on supported Windows builds', 'Use a solid surface when an effect is unavailable'],
    light: '/images/features/backdrops-light.png',
    dark: '/images/features/backdrops-dark.png',
    animation: {light: '/images/features/backdrops-light.gif', dark: '/images/features/backdrops-dark.gif'},
    alt: 'A Fluence window switches from Mica to Acrylic, then changes theme with Acrylic active',
    wallpaper: true,
    href: '/docs/how-to/window-and-title-bar',
    link: 'Configure a window',
  },
  {
    title: 'Dialogs for PowerShell',
    description: 'Give an interactive script a clear desktop interface with a small set of PowerShell commands.',
    points: ['Messages, validated input, progress, and custom windows', 'Windows PowerShell 5.1 and PowerShell 7.4 or later', 'Runnable examples and a command reference'],
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
  const backdropRef = useRef<HTMLElement>(null);
  const backdropWallpaper = useBaseUrl('/images/features/backdrops-realme-pad-2.jpg');

  useEffect(() => {
    const section = backdropRef.current;
    const visual = section?.querySelector<HTMLElement>(`.${styles.featureVisual}`);
    if (!section || !visual) return;

    const alignWallpaper = () => {
      const image = visual.querySelector<HTMLImageElement>('img');
      if (!image) return;

      const imageBounds = image.getBoundingClientRect();
      if (imageBounds.width <= 0 || imageBounds.height <= 0) return;

      const sectionBounds = section.getBoundingClientRect();
      const scale = imageBounds.width / backdropGeometry.frame.width;
      if (Math.abs(imageBounds.height - backdropGeometry.frame.height * scale) > 1) {
        delete section.dataset.wallpaperAligned;
        return;
      }
      const theme = document.documentElement.dataset.theme === 'dark' ? backdropGeometry.dark : backdropGeometry.light;
      const left = imageBounds.left - sectionBounds.left - (theme.captureX - backdropGeometry.wallpaper.imageDrawX) * scale;
      const top = imageBounds.top - sectionBounds.top - (theme.captureY - backdropGeometry.wallpaper.imageDrawY) * scale;
      const drawWidth = backdropGeometry.wallpaper.imageDrawWidth * scale;
      const drawHeight = backdropGeometry.wallpaper.imageDrawHeight * scale;
      if (left > 0 || top > 0 || left + drawWidth < sectionBounds.width || top + drawHeight < sectionBounds.height) {
        delete section.dataset.wallpaperAligned;
        return;
      }

      section.style.setProperty('--backdrop-draw-width', `${drawWidth}px`);
      section.style.setProperty('--backdrop-draw-height', `${drawHeight}px`);
      section.style.setProperty('--backdrop-draw-left', `${left}px`);
      section.style.setProperty('--backdrop-draw-top', `${top}px`);
      section.dataset.wallpaperAligned = 'true';
    };

    const resizeObserver = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(alignWallpaper);
    resizeObserver?.observe(section);
    resizeObserver?.observe(visual);
    const themeObserver = new MutationObserver(alignWallpaper);
    themeObserver.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
    visual.addEventListener('load', alignWallpaper, true);
    window.addEventListener('resize', alignWallpaper);
    alignWallpaper();

    return () => {
      resizeObserver?.disconnect();
      themeObserver.disconnect();
      visual.removeEventListener('load', alignWallpaper, true);
      window.removeEventListener('resize', alignWallpaper);
    };
  }, []);

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
            <p>Build a Fluent WPF interface with familiar XAML and C#. Give PowerShell scripts the same visual language through dialogs and windows.</p>
          </div>
        </header>
        <div className={styles.groupList}>
          {featureGroups.map((group, index) => (
            <section key={group.title} ref={group.wallpaper ? backdropRef : undefined} className={`${styles.groupSection} ${index % 2 === 1 ? styles.groupReverse : ''} ${group.animation ? styles.animationSection : ''} ${group.wallpaper ? styles.backdropSection : ''}`} style={group.wallpaper ? {'--backdrop-wallpaper': `url("${backdropWallpaper}")`} as CSSProperties : undefined} aria-labelledby={`feature-${index}`} data-reveal="section">
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
