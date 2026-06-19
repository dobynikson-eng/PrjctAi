'use client';

// Module 4 — Recipe photo with a graceful fallback. If no photo is given, or the
// file fails to load, it shows a styled placeholder so the page never looks broken.
import { useState } from 'react';

export default function RecipeImage({ photo, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!photo || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-amber-100 to-rose-100 ${className}`}
      >
        <span className="text-5xl" aria-hidden="true">🍽️</span>
      </div>
    );
  }

  return (
    <img
      src={`/images/${photo}`}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
