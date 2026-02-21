'use client';
import { usePathname } from 'next/navigation';
import SharedHeader from './SharedHeader';
import MainTabs from './MainTabs';

export default function HeaderAndTabs() {
  const pathname = usePathname();
  const isWorkDetail = pathname.startsWith('/n/works/') && pathname !== '/n/works';

  if (isWorkDetail) return null;

  return (
    <>
      <SharedHeader />
      <MainTabs />
    </>
  );
}
