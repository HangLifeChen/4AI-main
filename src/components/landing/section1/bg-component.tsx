"use client";

import { memo } from "react";
import { GrainGradient } from "@paper-design/shaders-react";

const shaderProps = {
  colors: ['#DFB84E', '#C89521', '#000000'],
  colorBack: '#00000000',
  speed: 0.9,
  scale: 1.54,
  rotation: 4,
  offsetX: -0.36,
  offsetY: 0.02,
  softness: 0.8,
  intensity: 0.04,
  noise: 0.07,
  shape: "wave" as const,
  style: {
    backgroundColor: "#000A0F",
    borderRadius: "0px",
    height: "100%",
    width: "100%",
  },
};

function GrainGradientBgComponent() {
  return <GrainGradient {...shaderProps} minPixelRatio={1} maxPixelCount={1920 * 1080} />;
}

export const GrainGradientBg = memo(GrainGradientBgComponent);
