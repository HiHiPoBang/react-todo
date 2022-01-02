import styled from 'styled-components';
import {
  getBGColor,
  getBGHoverColor,
  getBGDisabledColor,
  getTextColor,
  getTextHoverColor,
  getTextDisabledColor,
  getBorderColor,
  getBorderDisabledColor,
  getFontSize,
} from './config';

interface BtnProps {
  variant: string,
  size?: string,
  disabled?: boolean,
}
const StyledButton = styled.button`
  margin: 0px 2px;
  padding: 4px 10px;
  outline: 0px;
  box-shadow: none;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  border-color: ${(props: BtnProps) => (
    props.disabled
      ? getBorderDisabledColor(props.variant)
      : getBorderColor(props.variant))};
  background: ${(props: BtnProps) => (
    props.disabled
      ? getBGDisabledColor(props.variant)
      : getBGColor(props.variant))};
  font-size: ${(props: BtnProps) => getFontSize(props.size)};
  color: ${(props: BtnProps) => (
    props.disabled
      ? getTextDisabledColor(props.variant)
      : getTextColor(props.variant))};
  cursor: ${(props: BtnProps) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition-property: border-color, background, color;
  transition-duration: .3s;
  &:hover {
    border-color: ${(props: BtnProps) => (
    props.disabled
      ? getBorderDisabledColor(props.variant)
      : getBorderColor(props.variant))};
    background: ${(props: BtnProps) => getBGHoverColor(props.variant)};
    color: ${(props: BtnProps) => (
    props.disabled
      ? getTextDisabledColor(props.variant)
      : getTextHoverColor(props.variant))};
  }
`;

export default StyledButton;
