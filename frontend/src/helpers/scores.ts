export const individualAccuracyScore = (
  confidence: number,
  outcome: number,
) => {
  return (
    Math.round((1 - Math.pow(confidence - outcome, 2) + Number.EPSILON) * 100) /
    100
  );
};
