'use client';

import MobileNav from '../../components/MobileNav';

export default function TasteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileNav />
      {children}
    </>
  );
} 