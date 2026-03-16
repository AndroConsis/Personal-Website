import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'Engineering Manager with 10+ years of experience in full-stack development, scalable architecture, and team leadership across Fintech, Healthcare, and Analytics.',
  openGraph: {
    title: 'Profile | Prateek Rathore',
    description:
      'Engineering Manager with 10+ years of experience in full-stack development, scalable architecture, and team leadership.',
  },
  twitter: {
    title: 'Profile | Prateek Rathore',
    description:
      'Engineering Manager with 10+ years of experience in full-stack development, scalable architecture, and team leadership.',
  },
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
