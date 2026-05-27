'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  if (pathname && (pathname.startsWith('/get-started') || pathname.startsWith('/request-info'))) {
    return null;
  }

  return (
    <footer style={{
      padding: '2rem 4vw',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.7rem',
      opacity: 0.4
    }}>
      <span>© 2026 METRINA</span>
      <span>DESIGNED BY METRINA</span>
    </footer>
  );
};

export default Footer;
