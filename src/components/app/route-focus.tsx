"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function RouteFocus() {
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      const mainContent = document.getElementById("main-content");

      if (!mainContent) {
        return;
      }

      if (!mainContent.hasAttribute("tabindex")) {
        mainContent.setAttribute("tabindex", "-1");
      }

      mainContent.focus();
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [pathname]);

  return null;
}
