import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Text Scanner — Scan Only What You Frame',
  description:
    'Point your iPhone at any text, frame only what you need with the resizable scan box, and copy it instantly. 100% on-device. No account, no internet, no data collected.',
};

export default function ScanBoxLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
