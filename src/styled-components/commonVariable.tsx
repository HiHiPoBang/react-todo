import * as R from 'ramda';

export const WHITE_COLOR = '#FFFFFF';
export const PRIMARY_COLOR = '#4C58B5';
export const SECONDARY_COLOR = '#FEECE9';
export const INFO_COLOR = '#CCD1E4';
export const DANGER_COLOR = '#FE7E6D';
export const GHOST_COLOR = 'rgba(0, 0, 0, 0)';

export const PRIMARY_FONT_COLOR = '#333333';
export const REGULAR_FONT_COLOR = '#606266';
export const SECONDARY_TEXT = '#909399';

export const BORDER_COLOR = '#888888';
export const BORDER_LIGHT_COLOR = '#DCDFE6';

export const PRIMARY_FONT_SIZE = '1rem';
export const REGULAR_FONT_SIZE = '0.875rem';
export const H1_FONT_SIZE = '1.875rem';
export const H2_FONT_SIZE = '1.75rem';
export const H3_FONT_SIZE = '1.5rem';
export const H4_FONT_SIZE = '1.375rem';
export const H5_FONT_SIZE = '1.25rem';
export const H6_FONT_SIZE = '1.125rem';

export const convertRemToPixel = (rem: string) => R.pipe(
  R.replace(/rem/, ''),
  (val) => Number(val),
  (val) => R.divide(val, 0.0625),
)(rem);
