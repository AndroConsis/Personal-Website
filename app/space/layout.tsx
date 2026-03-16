import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Space Explorer',
  description:
    'Navigate the Archive in 3D space. Dock at stations to explore the profile, projects, skills, and contact information of Prateek Rathore.',
  openGraph: {
    title: 'Space Explorer | Prateek Rathore',
    description:
      'Navigate the Archive in 3D space. Dock at stations to explore the profile, projects, skills, and contact information.',
  },
  twitter: {
    title: 'Space Explorer | Prateek Rathore',
    description: 'Navigate the Archive in 3D space. Dock at stations to explore.',
  },
};

export default function SpaceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
