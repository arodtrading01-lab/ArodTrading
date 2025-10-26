import './globals.css';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Global Commodity Platform',
  description: 'Trade any physical commodity with trust.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="container">
            <Nav />
            {children}
            <div className="text-sm opacity-70 mt-10">© Global Commodity Platform</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
