import styled from 'styled-components';
import { BORDER_COLOR, PRIMARY_FONT_SIZE, REGULAR_FONT_COLOR } from '../commonVariable';

const StyledInput = styled.input`
    padding: 4px 10px;
    outline: 0;
    border-width: 0px 0px 1px 0px;
    border-color: ${BORDER_COLOR};
    background: rgba(0, 0, 0, 0);
    font-family: 'Roboto Mono', monospace;
    font-size: ${PRIMARY_FONT_SIZE};
    color: ${REGULAR_FONT_COLOR};
`;

export default StyledInput;
