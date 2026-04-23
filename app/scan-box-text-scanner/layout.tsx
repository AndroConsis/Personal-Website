import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ScanBox OCR: Text Scanner — Your Missing iPhone Feature',
  description:
    'Frame only the text you want with a resizable scan box, tap once, and it\'s on your clipboard. 13 languages, 100% on-device. No account, no internet, no data collected.',
  keywords: [
    'ScanBox',
    'ScanBox OCR',
    'text scanner',
    'scan box',
    'iPhone text scanner',
    'OCR app',
    'copy text from camera',
    'iOS text recognition',
    'multilingual OCR',
  ],
  openGraph: {
    type: 'website',
    title: 'ScanBox OCR: Text Scanner — Your Missing iPhone Feature',
    description:
      'Frame only the text you want, tap once, and it\'s on your clipboard. 13 languages, 100% on-device. No account, no internet.',
    url: 'https://www.prateekrathore.com/scan-box-text-scanner/',
  },
  twitter: {
    card: 'summary',
    title: 'ScanBox OCR: Text Scanner — Your Missing iPhone Feature',
    description:
      'Frame only the text you want, tap once, and it\'s on your clipboard. 13 languages, 100% on-device. No account required.',
  },
  alternates: {
    canonical: 'https://www.prateekrathore.com/scan-box-text-scanner/',
  },
};

export default function ScanBoxLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
