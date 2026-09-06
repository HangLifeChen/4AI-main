"use client";
import { useEffect, useState } from "react";

type SpinnerProps = {
  loading: boolean;
  size?: number;
  theme: string;
  strokeWidth?: number;
  className?: string;
};

export default function Spinner({
  loading,
  size = 15,
  theme,
  strokeWidth,
  className,
}: SpinnerProps) {

  const [visible, setVisible] = useState(loading);

  useEffect(() => {
    if (loading) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!visible) return null;

  const stroke =
    strokeWidth ?? Math.max(1, Math.round(size * 0.15));
  const color = theme == 'primary' ? '#000' : '#fff'

  return (
    <span
      data-loading={loading ? "true" : "false"}
      className={`spinner relative align-middle shrink-0 flex items-center ${className}`}
      style={
        {
          "--spinner-size": `${size}px`,
          "--spinner-stroke": `${stroke}px`,
          "--spinner-color": color,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <span className="spinner-inner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </span>
  );
}
