import { useEffect } from "react";

/** Keep depth transforms inside reveal wrappers so entrance motion stays independent. */
export function useDepthMotion(dependency: string) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]"));
    const cleanups = elements.map((element) => {
      let frame = 0;
      const reset = () => {
        cancelAnimationFrame(frame);
        element.style.removeProperty("--depth-x");
        element.style.removeProperty("--depth-y");
      };
      const move = (event: PointerEvent) => {
        if (reducedMotion.matches || !finePointer.matches || event.pointerType === "touch") return;
        const bounds = element.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          element.style.setProperty("--depth-x", `${(-y * 3).toFixed(2)}deg`);
          element.style.setProperty("--depth-y", `${(x * 4).toFixed(2)}deg`);
        });
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      element.addEventListener("blur", reset, true);
      reducedMotion.addEventListener("change", reset);
      return () => {
        reset();
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
        element.removeEventListener("blur", reset, true);
        reducedMotion.removeEventListener("change", reset);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [dependency]);
}