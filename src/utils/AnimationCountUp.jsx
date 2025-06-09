"use client";
import { animate, useInView, useIsomorphicLayoutEffect } from "motion/react";
import { useRef } from "react";

export default function AnimationCountUp({ from, to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!inView) return;

    element.textContent = String(from);

    const controls = animate(from, to, {
      duration: 1.7,
      delay: .25,
      ease: "easeOut",
      onUpdate(value) {
        element.textContent = value.toFixed(0);
      },
    });

    return () => {
      controls.stop();
    };
  }, [ref, inView]);

  return <span ref={ref} />;
}
