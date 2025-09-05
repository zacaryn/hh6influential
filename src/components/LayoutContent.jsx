'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';

function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default LayoutContent;
