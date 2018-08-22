
export function getBGColor(color: string, alpha = 0.3): string {
  return color;
}

const FONT_SIZE_FACTOR = 1.0;

export function getFontSize(text: string, elemWidth: number, elemHeight = +Infinity): number {
  const MAX_TEXT_WIDTH = 100 / 100;
  const MAX_TEXT_HEIGHT = 40 / 100;
  const textLength = text.length || 1;
  const textCellWidth = elemWidth * MAX_TEXT_WIDTH / textLength;
  const textCellHeight = elemHeight * MAX_TEXT_HEIGHT;
  const textCellSize = Math.min(textCellWidth, textCellHeight) * FONT_SIZE_FACTOR;
  return Math.round(textCellSize);
}

