import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-[#10100F] text-[#F0EFEA] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-sm font-mono uppercase tracking-widest text-[#74736E] mb-4">404</p>
          <h1 className="text-4xl font-medium mb-4">Page Not Found</h1>
          <p className="text-[#A09F99] mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 text-sm text-[#10100F] bg-[#F0EFEA] px-6 py-3 hover:bg-[#C6C1B5] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
