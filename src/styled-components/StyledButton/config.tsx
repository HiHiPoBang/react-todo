import * as R from 'ramda';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  INFO_COLOR,
  DANGER_COLOR,
  GHOST_COLOR,
  BORDER_LIGHT_COLOR,
  REGULAR_FONT_COLOR,
  PRIMARY_FONT_SIZE,
  REGULAR_FONT_SIZE,
  H6_FONT_SIZE,
} from '../commonVariable';

const isString = (val: any) => R.is(String)(val);
/** Button basic styled */
const BUTTON_TYPE = {
  PRIMARY: 'primary',
  DANGER: 'danger',
  OUTLINE: 'outline',
  GHOST: 'ghost',
};
const getBtnVariant = (variant: string | any) => {
  const btnVariant = R.isNil(variant) || !isString(variant)
    ? BUTTON_TYPE.PRIMARY
    : R.toUpper(variant);
  return R.prop(btnVariant, BUTTON_TYPE) || BUTTON_TYPE.PRIMARY;
};

const BG_COLORS = {
  [BUTTON_TYPE.PRIMARY]: PRIMARY_COLOR,
  [BUTTON_TYPE.DANGER]: DANGER_COLOR,
  [BUTTON_TYPE.OUTLINE]: WHITE_COLOR,
  [BUTTON_TYPE.GHOST]: GHOST_COLOR,
};
export const getBGColor = (variant: string) => R.compose(
  (val) => R.prop(val, BG_COLORS),
  getBtnVariant,
)(variant);

const BG_HOVER_COLORS = {
  [BUTTON_TYPE.PRIMARY]: INFO_COLOR,
  [BUTTON_TYPE.DANGER]: SECONDARY_COLOR,
  [BUTTON_TYPE.OUTLINE]: PRIMARY_COLOR,
  [BUTTON_TYPE.GHOST]: WHITE_COLOR,
};
export const getBGHoverColor = (variant: string) => R.compose(
  (val) => R.prop(val, BG_HOVER_COLORS),
  getBtnVariant,
)(variant);

const BG_DISABLED_COLORS = {
  [BUTTON_TYPE.PRIMARY]: INFO_COLOR,
  [BUTTON_TYPE.DANGER]: DANGER_COLOR,
  [BUTTON_TYPE.OUTLINE]: PRIMARY_COLOR,
  [BUTTON_TYPE.GHOST]: INFO_COLOR,
};
export const getBGDisabledColor = (variant: string) => R.compose(
  (val) => R.prop(val, BG_DISABLED_COLORS),
  getBtnVariant,
)(variant);

const TEXT_COLORS = {
  [BUTTON_TYPE.PRIMARY]: WHITE_COLOR,
  [BUTTON_TYPE.DANGER]: WHITE_COLOR,
  [BUTTON_TYPE.OUTLINE]: REGULAR_FONT_COLOR,
  [BUTTON_TYPE.GHOST]: REGULAR_FONT_COLOR,
};
export const getTextColor = (variant: string) => R.compose(
  (val) => R.prop(val, TEXT_COLORS),
  getBtnVariant,
)(variant);

const TEXT_HOVER_COLORS = {
  [BUTTON_TYPE.PRIMARY]: PRIMARY_COLOR,
  [BUTTON_TYPE.DANGER]: DANGER_COLOR,
  [BUTTON_TYPE.OUTLINE]: REGULAR_FONT_COLOR,
  [BUTTON_TYPE.GHOST]: REGULAR_FONT_COLOR,
};
export const getTextHoverColor = (variant: string) => R.compose(
  (val) => R.prop(val, TEXT_HOVER_COLORS),
  getBtnVariant,
)(variant);

const TEXT_DISABLED_COLORS = {
  [BUTTON_TYPE.PRIMARY]: WHITE_COLOR,
  [BUTTON_TYPE.DANGER]: WHITE_COLOR,
  [BUTTON_TYPE.OUTLINE]: REGULAR_FONT_COLOR,
  [BUTTON_TYPE.GHOST]: REGULAR_FONT_COLOR,
};
export const getTextDisabledColor = (variant: string) => R.compose(
  (val) => R.prop(val, TEXT_DISABLED_COLORS),
  getBtnVariant,
)(variant);

const BTN_BORDER_COLORS = {
  [BUTTON_TYPE.PRIMARY]: PRIMARY_COLOR,
  [BUTTON_TYPE.DANGER]: DANGER_COLOR,
  [BUTTON_TYPE.OUTLINE]: PRIMARY_COLOR,
  [BUTTON_TYPE.GHOST]: GHOST_COLOR,
};
export const getBorderColor = (variant: string) => R.compose(
  (val) => R.prop(val, BTN_BORDER_COLORS),
  getBtnVariant,
)(variant);

const BTN_BORDER_DISABLED_COLORS = {
  [BUTTON_TYPE.PRIMARY]: BORDER_LIGHT_COLOR,
  [BUTTON_TYPE.DANGER]: BORDER_LIGHT_COLOR,
  [BUTTON_TYPE.OUTLINE]: BORDER_LIGHT_COLOR,
  [BUTTON_TYPE.GHOST]: GHOST_COLOR,
};
export const getBorderDisabledColor = (variant: string) => R.compose(
  (val) => R.prop(val, BTN_BORDER_DISABLED_COLORS),
  getBtnVariant,
)(variant);

/** Button size styled */
const SIZE_TYPE = {
  MS: 'ms',
  MD: 'md',
  LG: 'lg',
};
const getSizeType = (size: string | any) => {
  const btnSize = R.isNil(size) || !isString(size) ? SIZE_TYPE.MD : R.toUpper(size);
  return R.prop(btnSize, SIZE_TYPE) || SIZE_TYPE.MD;
};

const FONT_SIZE = {
  [SIZE_TYPE.MS]: REGULAR_FONT_SIZE,
  [SIZE_TYPE.MD]: PRIMARY_FONT_SIZE,
  [SIZE_TYPE.LG]: H6_FONT_SIZE,
};
export const getFontSize = (size: string | undefined) => R.compose(
  (val) => R.prop(val, FONT_SIZE),
  getSizeType,
)(size);
