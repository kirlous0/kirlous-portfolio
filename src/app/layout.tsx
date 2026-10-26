import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kirlous Wael — Web Developer',
  description: 'Independent web developer building thoughtful digital experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
