import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <Layout title="About" description="Why Fluence.Wpf was created and who maintains it.">
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.contentWidth}>
            <Heading as="h1">About <span>Fluence.Wpf</span></Heading>
            <p>Fluent design for teams building and maintaining WPF applications.</p>
          </div>
        </header>

        <section className={styles.story} aria-labelledby="about-project">
          <div className={styles.contentWidth}>
            <Heading as="h2" id="about-project">Why it exists</Heading>
            <p>Fluence.Wpf grew from work on <Link href="https://github.com/PSAppDeployToolkit/PSAppDeployToolkit">PSAppDeployToolkit</Link>, where desktop interfaces need to work across a range of Windows environments. WPF remains useful in those environments, but teams also want controls and window surfaces that feel at home on current Windows.</p>
            <p>The library brings Fluent styled controls, themes, and window chrome to WPF projects targeting .NET Framework 4.7.2, .NET 8, and .NET 10. The companion PowerShell module provides dialogs, forms, progress, and windows for scripts.</p>
            <div className={styles.storyLinks}>
              <Link to="/docs/csharp">Explore the C# library <span aria-hidden="true">→</span></Link>
              <Link to="/docs/powershell">Explore the PowerShell module <span aria-hidden="true">→</span></Link>
            </div>

          </div>
        </section>

        <section className={styles.project} aria-labelledby="about-source">
          <div className={styles.contentWidth}>
            <Heading as="h2" id="about-source">Source and licensing</Heading>
            <p>Dan Cunningham maintains the project on <Link href="https://github.com/sintaxasn/Fluence.Wpf">GitHub</Link>. The control library, PowerShell module, and Fluence-owned documentation and assets use the <Link href="https://github.com/sintaxasn/Fluence.Wpf/blob/main/LICENSE">BSD 3-Clause license</Link>.</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
