"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { SplashScreen } from "@/components/splash-screen";

const subscribeToMount = () => () => undefined;
const getClientMountSnapshot = () => true;
const getServerMountSnapshot = () => false;

/**
 * Wraps the page content with a first-visit splash screen.
 * Uses sessionStorage so splash only shows once per browser tab.
 *
 * The hydration-safe pattern: always render content on server (no splash),
 * then on the client mount check sessionStorage and overlay splash if needed.
 */
export function SplashWrapper({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    subscribeToMount,
    getClientMountSnapshot,
    getServerMountSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);
  const showSplash = mounted && !dismissed && sessionStorage.getItem("hanabel_splash_seen") === null;

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("hanabel_splash_seen", "1");
    setDismissed(true);
  }, []);

  return (
    <>
      {/* Splash overlay — only on client after mount */}
      {mounted && showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Main content — always rendered (SSR-safe), hidden while splash is active */}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.5s ease 0.1s",
          pointerEvents: showSplash ? "none" : "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}
