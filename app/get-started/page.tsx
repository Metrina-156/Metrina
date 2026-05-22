'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import InquiryForm from '../../components/InquiryForm';

function GetStartedContent() {
  const searchParams = useSearchParams();
  const pkgParam = searchParams.get('package') || undefined;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16">
      <InquiryForm initialPackage={pkgParam} />
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#008080]/20">
      {/* Editorial Header */}
      <header 
        style={{
          width: '100%',
          padding: '2rem 6vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(232, 224, 212, 0.4)',
          backgroundColor: 'rgba(250, 247, 242, 0.8)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}
      >
        {/* METRINA Brand Identifier (Left) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <Image 
            src="/vite.png" 
            alt="" 
            width={38} 
            height={38} 
            style={{ height: '38px', width: 'auto' }} 
            priority
          />
          <span
            className="serif"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: '800',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#008080',
              lineHeight: 1
            }}
          >
            METRINA
          </span>
        </div>

        {/* Return Home (Right) */}
        <Link 
          href="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-color)',
            opacity: 0.7
          }}
        >
          <ArrowLeft size={16} />
          <span>Return Home</span>
        </Link>
      </header>

      {/* Main onboarding workflow container */}
      <main className="flex-1 flex flex-col justify-center items-center relative py-12 md:py-16">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
            <div className="w-8 h-8 border-2 border-[#008080] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs uppercase tracking-widest text-[#1a1a1a]/60">Configuring scoping session...</p>
          </div>
        }>
          <GetStartedContent />
        </Suspense>
      </main>
    </div>
  );
}
