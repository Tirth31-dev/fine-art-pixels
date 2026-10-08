import { useEffect, useRef } from "react";
import type Lenis from "lenis";

const scrollEasing = (progress: number) => Math.min(1, 1.001 - 2 ** (-10 * progress));

/** Keep native touch scrolling and dialog scrolling; ease desktop wheel and anchors. */
export function useSmoothScroll(paused: boolean) {
  const instance = useRef<Lenis | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) instance.current?.stop();
    else instance.current?.start();
  }, [paused]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let version = 0;

    const configure = async () => {
      const currentVersion = ++version;
      instance.current?.destroy();
      instance.current = null;
      if (motion.matches) return;

      const { default: Lenis } = await import("lenis");
      if (disposed || motion.matches || currentVersion !== version) return;

      const lenis = new Lenis({
        autoRaf: true,
        duration: 1.2,
        easing: scrollEasing,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -64, force: true, duration: 1.35, easing: scrollEasing },
        prevent: (node) => node.getAttribute("role") === "dialog",
      });
      instance.current = lenis;
      if (pausedRef.current) lenis.stop();
    };

    void configure();
    motion.addEventListener("change", configure);
    return () => {
      disposed = true;
      version++;
      motion.removeEventListener("change", configure);
      instance.current?.destroy();
      instance.current = null;
    };
  }, []);
}
