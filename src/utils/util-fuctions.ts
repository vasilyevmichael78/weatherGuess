const KELVIN = 273.15;
export const toNormalDegree = (kelvin: number): number => {
  return Math.ceil(kelvin - KELVIN);
};
