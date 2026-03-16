import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'iPhone Text Scanner — Scan Only What You Frame',
  description:
    'Point your iPhone at any text, frame only what you need with the resizable scan box, and copy it instantly. 100% on-device. No account, no internet, no data collected.',
  keywords: [
    'text scanner',
    'scan box',
    'iPhone text scanner',
    'OCR app',
    'copy text from camera',
    'iOS text recognition',
  ],
  openGraph: {
    type: 'website',
    title: 'iPhone Text Scanner — Scan Only What You Frame',
    description:
      'Point your iPhone at any text, frame only what you need with the resizable scan box, and copy it instantly. 100% on-device. No account, no internet.',
    url: 'https://www.prateekrathore.com/scan-box-text-scanner/',
  },
  twitter: {
    card: 'summary',
    title: 'iPhone Text Scanner — Scan Only What You Frame',
    description:
      'Point your iPhone at any text, frame only what you need, and copy instantly. 100% on-device. No account required.',
  },
  alternates: {
    canonical: 'https://www.prateekrathore.com/scan-box-text-scanner/',
  },
};

export default function ScanBoxLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
