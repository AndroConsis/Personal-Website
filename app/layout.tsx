import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const BASE_URL = 'https://www.prateekrathore.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'The Archive | Prateek Rathore',
    template: '%s | Prateek Rathore',
  },
  description:
    'Prateek Rathore — React Native Engineering Manager based in Pune with 10+ years building scalable full-stack systems across Fintech, Healthcare, and Analytics.',
  keywords: [
    'Prateek Rathore',
    'Engineering Manager Pune',
    'React Native Engineering Manager',
    'Full-stack Developer',
    'React',
    'React Native',
    'TypeScript',
    'Node.js',
    'AndroConsis',
  ],
  authors: [{ name: 'Prateek Rathore', url: BASE_URL }],
  creator: 'Prateek Rathore',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'The Archive | Prateek Rathore',
    title: 'The Archive | Prateek Rathore',
    description:
      'Prateek Rathore — React Native Engineering Manager based in Pune with 10+ years building scalable full-stack systems across Fintech, Healthcare, and Analytics.',
  },
  twitter: {
    card: 'summary',
    title: 'The Archive | Prateek Rathore',
    description:
      'Prateek Rathore — React Native Engineering Manager based in Pune with 10+ years building scalable full-stack systems.',
    creator: '@AndroConsis',
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Prateek Rathore',
  url: BASE_URL,
  jobTitle: 'Engineering Manager',
  worksFor: { '@type': 'Organization', name: 'EXL Service' },
  address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
  sameAs: [
    'https://in.linkedin.com/in/prateek-rathore',
    'https://github.com/AndroConsis/',
    'https://socialprateek.com',
  ],
  email: 'p.rathore.2903@gmail.com',
  knowsAbout: [
    'React',
    'React Native',
    'TypeScript',
    'Node.js',
    'Java',
    'Spring Boot',
    'AWS',
    'Engineering Management',
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="antialiased selection:bg-emerald-500/30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="crt-overlay" />
        <div className="scanline" />
        {children}
      </body>
    </html>
  );
}
