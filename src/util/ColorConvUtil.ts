// eslint-disable-next-line import/no-unresolved
import Color from 'color';

export function getLightness(color: string): number {
  return Color(color).hsl().array()[2];
}

function getRgbPercentage(
  rRed: number,
  rGreen: number,
  rBlue: number
): {
  rRed: number;
  rGreen: number;
  rBlue: number;
} {
  return {
    rRed: (rRed / 255) * 100,
    rGreen: (rGreen / 255) * 100,
    rBlue: (rBlue / 255) * 100,
  };
}

function crgbToRgb(
  rCRed: number,
  rCGreen: number,
  rCBlue: number
): { rRed: number; rGreen: number; rBlue: number } {
  return {
    rRed: (rCRed / 100) ** (1 / 2.2) * 100,
    rGreen: (rCGreen / 100) ** (1 / 2.2) * 100,
    rBlue: (rCBlue / 100) ** (1 / 2.2) * 100,
  };
}

function rgbToCrgb(
  rRed: number,
  rGreen: number,
  rBlue: number
): { rCRed: number; rCGreen: number; rCBlue: number } {
  return {
    rCRed: (rRed / 100) ** 2.2 * 100,
    rCGreen: (rGreen / 100) ** 2.2 * 100,
    rCBlue: (rBlue / 100) ** 2.2 * 100,
  };
}

export function rgbStringToHexString(r: string, g: string, b: string): string {
  // DOMParser에 HTML Input값이 rgb(XXX, XXX, XXX)형식으로 Parsing되어 변환됨 해당 형식을 HEX형식으로 변형해주는 함수
  // String값인 rgb(XXX, XXX, XXX)의 내부 RGB값을 Split하여 넘겨줘야함.
  let hR = parseInt(r, 10).toString(16);
  let hG = parseInt(g, 10).toString(16);
  let hB = parseInt(b, 10).toString(16);

  if (hR.length === 1) {
    hR = `0${hR}`;
  }
  if (hG.length === 1) {
    hG = `0${hG}`;
  }
  if (hB.length === 1) {
    hB = `0${hB}`;
  }
  return `#${hR}${hG}${hB}`;
}

export function applyAlphaSet(color: string, percentage: number): string {
  return Color(color)
    .alpha((100 - percentage) / 100)
    .toString();
}

export function applyLumMod(color: string, percentage: number): string {
  const hslColor = Color(color).hsl().array();
  const h = hslColor[0];
  const s = hslColor[1];
  const l = hslColor[2];

  const p = percentage / 100;

  return Color.hsl(h, s, l * p)
    .hex()
    .toString();
}

export function applyLumOff(color: string, percentage: number): string {
  const rgbColor = Color(color).hsl().array();
  const h = rgbColor[0];
  const s = rgbColor[1];
  const l = rgbColor[2];

  let cL = l + percentage;

  if (cL > 100) cL = 100;
  else if (cL < -100) cL = -100;

  return Color.hsl(h, s, cL).hex().toString();
}

export function applySatMod(color: string, percentage: number): string {
  const rgbColor = Color(color).hsl().array();
  const h = rgbColor[0];
  const s = rgbColor[1];
  const l = rgbColor[2];

  const p = percentage / 100;
  let cS = s * p;

  if (cS > 100) cS = 100;
  else if (cS < 0) cS = 0;

  return Color.hsl(h, cS, l).hex().toString();
}

export function applyShade(color: string, percentage: number): string {
  const rgbColor = Color(color).rgb().array();
  const r = rgbColor[0];
  const g = rgbColor[1];
  const b = rgbColor[2];
  const rgbp = getRgbPercentage(r, g, b);
  const crgb = rgbToCrgb(rgbp.rRed, rgbp.rGreen, rgbp.rBlue);

  const p = percentage / 100;
  const fCrgb = crgbToRgb(crgb.rCRed * p, crgb.rCGreen * p, crgb.rCBlue * p);
  return Color({
    r: (fCrgb.rRed / 100) * 255,
    g: (fCrgb.rGreen / 100) * 255,
    b: (fCrgb.rBlue / 100) * 255,
  })
    .hex()
    .toString();
}

export function applyTint(color: string, percentage: number): string {
  const rgbColor = Color(color).rgb().array();
  const r = rgbColor[0];
  const g = rgbColor[1];
  const b = rgbColor[2];
  const rgbp = getRgbPercentage(r, g, b);
  const crgb = rgbToCrgb(rgbp.rRed, rgbp.rGreen, rgbp.rBlue);

  const p = percentage / 100;
  const fCrgb = crgbToRgb(
    100 - (100 - crgb.rCRed) * p,
    100 - (100 - crgb.rCGreen) * p,
    100 - (100 - crgb.rCBlue) * p
  );
  return Color({
    r: (fCrgb.rRed / 100) * 255,
    g: (fCrgb.rGreen / 100) * 255,
    b: (fCrgb.rBlue / 100) * 255,
  })
    .hex()
    .toString();
}

export function applyBrightness(color: string, percentage: number): string {
  if (percentage === 0) return color;
  if (percentage > 0) {
    // 밝게
    let chandgedColor = applyLumMod(color, 100 - percentage);
    chandgedColor = applyLumOff(chandgedColor, percentage);
    return chandgedColor;
  }
  // 어둡게
  const chandgedColor = applyLumMod(color, 100 + percentage);
  return chandgedColor;
}
