import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Prateek Rathore — Engineering Manager available for strategic technical consultations, leadership opportunities, and architecture reviews.',
  openGraph: {
    title: 'Contact | Prateek Rathore',
    description:
      'Get in touch with Prateek Rathore — available for technical consultations, leadership opportunities, and architecture reviews.',
  },
  twitter: {
    title: 'Contact | Prateek Rathore',
    description:
      'Get in touch with Prateek Rathore — available for technical consultations, leadership opportunities, and architecture reviews.',
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
