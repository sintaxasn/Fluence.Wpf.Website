// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';
import docsTransform from './plugins/docs-transform.mjs';

const repository = 'https://github.com/sintaxasn/Fluence.Wpf';
const websiteRepository = 'https://github.com/sintaxasn/Fluence.Wpf.Website';
const siteUrl = process.env.FLUENCE_SITE_URL || 'https://fluencewpf.com';
const baseUrl = process.env.FLUENCE_BASE_URL || '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Fluence.Wpf',
    tagline: 'Beautiful controls for WPF applications, without the Windows App SDK dependency.',
    url: siteUrl,
    baseUrl,
    favicon: 'Fluence_Icon.ico',
    trailingSlash: false,
    organizationName: 'sintaxasn',
    projectName: 'Fluence.Wpf.Website',
    onBrokenLinks: 'throw',
    onBrokenAnchors: 'throw',
    markdown: {
        format: 'md',
        hooks: {
            onBrokenMarkdownLinks: 'throw',
            onBrokenMarkdownImages: 'throw',
        },
    },
    i18n: { defaultLocale: 'en', locales: ['en'] },
    staticDirectories: ['static', '../assets'],
    customFields: {
        repository,
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    path: '../docs',
                    routeBasePath: 'docs',
                    sidebarPath: './sidebars.js',
                    // A custom list replaces the Docusaurus default, so the first four entries restore it.
                    // They keep `_`-prefixed files and folders, such as maintainer notes, off the site.
                    exclude: [
                        '**/_*.{js,jsx,ts,tsx,md,mdx}',
                        '**/_*/**',
                        '**/*.test.{js,jsx,ts,tsx}',
                        '**/__tests__/**',
                        '**/_internal/**',
                        '**/plans/**',
                        'release.md',
                        'roadmap.md',
                        '**/release.md',
                        '**/roadmap.md',
                    ],
                    //   editUrl: ({ docPath }) => `${websiteRepository}/edit/main/docs/${docPath}`,
                    beforeDefaultRemarkPlugins: [[docsTransform, { repository }]],
                },
                blog: false,
                gtag: { trackingID: 'G-MXRX78P686' },
                theme: { customCss: './src/css/custom.css' },
            },
        ],
    ],
    themes: [
        ['@easyops-cn/docusaurus-search-local', {
            hashed: true,
            docsDir: '../docs',
            docsRouteBasePath: '/docs',
            indexBlog: false,
        }],
    ],
    themeConfig: {
        docs: { sidebar: { autoCollapseCategories: true, hideable: true } },
        image: 'Fluence_Lockup_Stacked_Light.png',
        colorMode: { defaultMode: 'light', respectPrefersColorScheme: true, disableSwitch: false },
        navbar: {
            logo: {
                alt: 'Fluence.Wpf',
                src: 'Fluence_Icon.svg',
            },
            items: [
                { to: '/features', label: 'Features', position: 'left' },
                { type: 'docSidebar', sidebarId: 'controls', label: 'Controls', position: 'left' },
                { type: 'docSidebar', sidebarId: 'csharp', label: 'C# Library', position: 'left' },
                { type: 'docSidebar', sidebarId: 'powershell', label: 'PowerShell', position: 'left' },
                { to: '/about', label: 'About', position: 'left' },
                { href: repository, label: 'GitHub', className: 'fluence-github-link', position: 'right' },
                { type: 'search', position: 'right' },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Documentation', items: [
                        { label: 'Controls', to: '/docs/controls' },
                        { label: 'C# Library', to: '/docs/csharp' },
                        { label: 'PowerShell', to: '/docs/powershell' },
                    ]
                },
                {
                    title: 'Project', items: [
                        { label: 'Features', to: '/features' },
                        { label: 'About', to: '/about' },
                        { label: 'GitHub', href: repository },
                        { label: 'License', href: `${repository}/blob/main/LICENSE` },
                    ]
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Dan Cunningham`,
        },
        prism: {
            additionalLanguages: ['csharp', 'powershell'],
            theme: prismThemes.oneDark,
            darkTheme: prismThemes.oneDark,
        },
    },
};

export default config;
