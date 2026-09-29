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
          </div>
        </header>

        <section className={styles.story} aria-labelledby="about-project">
          <div className={styles.contentWidth}>
            <Heading as="h2" id="about-project">Why Fluence.Wpf</Heading>
            <p>My other long-term project, <Link href="https://github.com/PSAppDeployToolkit/PSAppDeployToolkit">PSAppDeployToolkit</Link>, aims to support all supported Windows and .NET versions so that deployment scripts remain functional across different environments. To do that, we need a reliable, modern UI framework that works consistently across those platforms. That is where Fluence.Wpf comes in.</p>
            <p>Fluence.Wpf grew out of a need for modern controls in WPF applications, something Microsoft has not provided without requiring an upgrade to .NET 10 or 11, or a switch to WinUI development. Neither option is practical in many large enterprise environments, where developers may need to build and maintain solutions on an organization's last supported version of Windows LTSC. Newer .NET versions can break internal applications, and there may not be enough budget for newer hardware. Fluence.Wpf fills this gap by offering modern, consistent, and reliable UI components for WPF applications, without dependencies on downloaded libraries or ongoing updates. It is free to use and has no licensing complexities or restrictions.</p>

          </div>
        </section>

        <section className={styles.project} aria-labelledby="about-source">
          <div className={styles.contentWidth}>
            <Heading as="h2" id="about-source">Source and licensing</Heading>
            <p>Fluence.Wpf is available on <Link href="https://github.com/sintaxasn/Fluence.Wpf">GitHub</Link>. Copyright © 2026 Dan Cunningham. The control library, PowerShell module, and Fluence-owned documentation and assets use the <Link href="https://github.com/sintaxasn/Fluence.Wpf/blob/main/LICENSE">BSD 3-Clause license</Link>.</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
