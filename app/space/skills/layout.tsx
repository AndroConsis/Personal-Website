import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technical arsenal: React, React Native, TypeScript, Node.js, Java, Spring Boot, AWS, GraphQL, SQL and more — expert-level skills of Prateek Rathore.',
  openGraph: {
    title: 'Skills | Prateek Rathore',
    description:
      'Technical arsenal: React, React Native, TypeScript, Node.js, Java, Spring Boot, AWS, and more.',
  },
  twitter: {
    title: 'Skills | Prateek Rathore',
    description:
      'Technical arsenal: React, React Native, TypeScript, Node.js, Java, Spring Boot, AWS, and more.',
  },
};

export default function SkillsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
