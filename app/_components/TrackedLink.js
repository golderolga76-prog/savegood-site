'use client';

import { track } from '@vercel/analytics';

export default function TrackedLink({ href, label, className, children }) {
  return (
    <a
      href={href}
      className={className}
      onClick={() =>
        track('primary_cta_click', {
          label: label || String(children),
          destination: href,
        })
      }
    >
      {children}
    </a>
  );
}
