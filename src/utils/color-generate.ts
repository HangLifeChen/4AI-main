interface HSLRange {
  h: [number, number];
  s: [number, number];
  l: [number, number];
}

const getRandomHSLValue = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateDynamicGradient = (
  firstColorRange: HSLRange,
  secondColorRange: HSLRange
): string => {
  const [h1, s1, l1] = [
    getRandomHSLValue(...firstColorRange.h),
    getRandomHSLValue(...firstColorRange.s),
    getRandomHSLValue(...firstColorRange.l)
  ];

  const [h2, s2, l2] = [
    getRandomHSLValue(...secondColorRange.h),
    getRandomHSLValue(...secondColorRange.s),
    getRandomHSLValue(...secondColorRange.l)
  ];
  return `linear-gradient(105deg,hsl(${h1},${s1}%,${l1}%) 0%,hsl(${h2},${s2}%,${l2}%) 100%)`;
};

export const combineColor = (type?: string) => {
  let finalType = "one"
  if (!type) {
    const types = ['one', 'two', 'three']
    finalType = types[Math.floor(Math.random() * types.length)]
  }
  const getType = {
    one: generateDynamicGradient(
      { h: [140, 177], s: [70, 85], l: [18, 22] },
      { h: [66, 76], s: [70, 90], l: [35, 40] }
    ),
    two: generateDynamicGradient(
      { h: [0, 10], s: [70, 80], l: [33, 36] },
      { h: [45, 55], s: [70, 87], l: [42, 46] }
    ),
    three: generateDynamicGradient(
      { h: [206, 222], s: [60, 85], l: [30, 34] },
      { h: [175, 196], s: [70, 90], l: [38, 41] }
    )
  }

  const bgColor = getType[type ?? finalType]
  return bgColor
}

