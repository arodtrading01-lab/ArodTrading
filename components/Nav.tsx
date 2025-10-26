'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const items = [
  ['/', 'Overview'],
  ['/marketplace', 'Marketplace'],
  ['/freight', 'Freight'],
  ['/petroport', 'PetroPort'],
  ['/fertilizer', 'Fertilizer'],
  ['/rescue', 'Rescue'],
  ['/pricing', 'Pricing'],
  ['/affiliate', 'Affiliate'],
  ['/rfq-feed', 'RFQ Feed'],
  ['/rfq-prime', 'RFQ Prime'],
  ['/lead-wallet', 'Lead Wallet'],
  ['/reveal-rules', 'Reveal Rules'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
  ['/privacy', 'Privacy'],
  ['/terms', 'Terms'],
  ['/progress', 'Progress'],
  ['/timeline', 'Timeline'],
  ['/modules', 'Modules'],
  ['/admin', 'Admin']
];

export default function Nav(){
  const pathname = usePathname();
  return (
    <nav className="nav flex flex-wrap gap-2 items-center mb-4">
      <strong>Global Commodity Platform</strong>
      <span className="opacity-50">|</span>
      {items.map(([href, label]) => (
        <Link key={href} href={href}
          className={clsx('px-3 py-2 rounded-md border border-white/10 bg-white/5', {
            'active text-black': pathname === href
          })}>
          {label}
        </Link>
      ))}
      <span className="ml-auto flex items-center gap-2">
        <SignedOut>
          <Link href="/sign-in" className="px-3 py-2 rounded-md border border-white/10 bg-white/5">Sign in</Link>
          <Link href="/sign-up" className="px-3 py-2 rounded-md border border-white/10 bg-white/5">Sign up</Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </span>
    </nav>
  );
}
