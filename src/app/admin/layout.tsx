import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — Kirlous Wael',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
