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
  return (
    <>
      {/*
       * Mark JS as available before first paint.
       * This blocking inline script runs synchronously before
       * any CSS is evaluated, so motion styles scoped under
       * html.js-ready only apply when JS is confirmed working.
       * No-JS users see all content immediately (progressive enhancement).
       */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add('js-ready')`,
        }}
      />
      {children}
    </>
  );
}
