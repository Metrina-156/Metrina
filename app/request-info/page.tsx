'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import RequestInfoForm from '../../components/RequestInfoForm';

export default function RequestInfoPage() {
  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: '#FAF7F2', color: '#1a1a1a' }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
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
          zIndex: 50,
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <Image
            src="/logo.png"
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
              lineHeight: 1,
            }}
          >
            METRINA
          </span>
        </div>

        {/* Return Home */}
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
            opacity: 0.7,
          }}
        >
          <span>Return Home</span>
          <ArrowRight size={16} />
        </Link>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main
        className="flex-1 flex flex-col justify-center items-center relative"
        style={{ padding: '4rem 6vw 6rem' }}
      >
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
              <div
                className="rounded-full animate-spin"
                style={{
                  width: '2rem',
                  height: '2rem',
                  border: '2px solid #008080',
                  borderTopColor: 'transparent',
                }}
              />
              <p
                style={{
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  opacity: 0.5,
                }}
              >
                Loading…
              </p>
            </div>
          }
        >
          <div className="w-full max-w-2xl mx-auto">
            <RequestInfoForm />
          </div>
        </Suspense>
      </main>
    </div>
  );
}
