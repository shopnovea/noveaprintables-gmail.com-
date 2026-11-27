"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 400);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <style>{`
        .novea-back-to-top {
          display: none;
          position: fixed;
          right: 16px;
          bottom: calc(100px + env(safe-area-inset-bottom, 0px));
          z-index: 40;
          width: 48px;
          height: 48px;
          border: 1px solid #fff;
          border-radius: 50%;
          background: #67485c;
          color: #fff;
          box-shadow: 0 3px 12px rgba(0,0,0,.2);
          cursor: pointer;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 767px) {
          .novea-back-to-top { display: flex; }
        }
        .novea-back-to-top:focus-visible { outline: 3px solid #b68ba7; outline-offset: 3px; }
      `}</style>
      {visible && (
        <button type="button" className="novea-back-to-top" aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </button>
      )}
    </>
  );
}
