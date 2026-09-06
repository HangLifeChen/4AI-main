import { useRef, useEffect } from "react";
import { useUser } from '@/stores';
function useGlowSpot( {color = "rgba(89,238,255,0.28)" } = {}) {
  const ref = useRef(null);
  const { userInfo } = useUser();
  useEffect(() => {
      if (!ref.current) return;
    const el = ref.current;
    if (!el) return;
    const glow = document.createElement("span");
    glow.className = "glow-effect";
    glow.style.position = "absolute";
    glow.style.width = "100%";
    glow.style.height = "200%";
    glow.style.pointerEvents = "none";
    glow.style.zIndex = "99999";
    glow.style.top = "50%";
    glow.style.left = "50%";
    glow.style.transform = "translate(-50%, -50%)";
    glow.style.background = `radial-gradient(circle, ${color} 0%, rgba(89,238,255,0) 60%)`;
     glow.style.mixBlendMode = "lighten"; // 可选，防止挡住文字
    glow.style.opacity = "0";
    glow.style.transition = "opacity 0.3s ease, transform 0.1s ease";

    el.style.position = "relative";
    el.style.overflow = "hidden";
    el.appendChild(glow);

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.top = `${y}%`;
      glow.style.left = `${x}%`;
      glow.style.opacity = "1";
    };
    const handleLeave = () => {
      glow.style.opacity = "0";
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      glow.remove();
    };
  }, [userInfo.id]);

  return ref;
}

export default useGlowSpot;
