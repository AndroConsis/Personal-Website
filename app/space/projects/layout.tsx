import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Classified project manifest: PayPal EDQ, Rivian BI Dashboard, MakeMyTrip Holiday Ambassador, Kare Nurse App, and more — delivered by Prateek Rathore.',
  openGraph: {
    title: 'Projects | Prateek Rathore',
    description:
      'Classified project manifest: PayPal EDQ, Rivian BI Dashboard, MakeMyTrip Holiday Ambassador, and more.',
  },
  twitter: {
    title: 'Projects | Prateek Rathore',
    description:
      'Classified project manifest: PayPal EDQ, Rivian BI Dashboard, MakeMyTrip Holiday Ambassador, and more.',
  },
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
