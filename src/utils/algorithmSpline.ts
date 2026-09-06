import { useEffect } from "react";

export default function useFollowMouseRotation(objectRef: any, containerRef: any) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!objectRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();


      const bx = rect.left + rect.width / 2;
      const by = rect.top + rect.height / 2;
      const mx = e.clientX;
      const my = e.clientY;
      const maxAngle = Math.PI / 6;
      const r = 1;
      const distance_pow = ((mx - bx) * (mx - bx) + (my - by) * (my - by));
      let r_pow;
      if (distance_pow < (r * r)) {
        r_pow = distance_pow;
      } else {
        r_pow = r * r;
      }
      const z = bx - (bx - mx) / (by - my) * by;
      const k = (bx - mx) / (by - my);
      var A = k * k + 1;
      var B = k * (z - bx) - by;
      var C = (z - bx) * (z - bx) + by * by - r_pow;
      const D = B * B - A * C;
      const alive = 500;
      const sqrtD = Math.sqrt(D);
      const y1 = (-B + sqrtD) / A;
      const x1 = k * y1 + z;
      const y2 = (-B - sqrtD) / A;
      const x2 = k * y2 + z;
      var x, y;
      if (my < by) {
        x = x2 - bx;
        y = y2 - by;
      } else {
        x = x1 - bx;
        y = y1 - by;
      }
      
      objectRef.current.rotation.y = x * maxAngle;
      objectRef.current.rotation.x = y * maxAngle;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [objectRef, containerRef]);
}
