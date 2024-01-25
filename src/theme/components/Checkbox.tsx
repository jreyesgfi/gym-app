import styled, { css, keyframes } from "styled-components";
import { globalColors} from "../globalStyles";

const checkAnimation = keyframes`
0% { stroke-dashoffset: 30; }
10% { stroke-dashoffset: 30; }
40% { stroke-dashoffset: 18;}
50% { stroke-dashoffset: 18; }
80% { stroke-dashoffset: 5; }
100% { stroke-dashoffset: 0; }
`;

// Checkbox
interface CheckBoxItf {
	checked: boolean;
  props?: any;
  handleOnChange: () => void;
}
const checkedStyles = css`
    border: 2px solid ${globalColors.primary[200]};
    background:${globalColors.primary[200]};
`
const uncheckedStyles = css`
    border: 2px solid ${globalColors.dark.second};
    background:${globalColors.transparent};
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	border: 0;
	clip: rect(0 0 0 0);
	clippath: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;

const StyledCheckbox = styled.div<{checked:boolean}>`
display: inline-block;
width: 20px;
height: 20px;
${props => props.checked ? checkedStyles : uncheckedStyles};
border-radius: 3px;
transition: all 0.3s;

svg path {
    stroke-dasharray: 30;
    stroke-dashoffset: 0;
    stroke-width: 3px;
    fill: none;
    animation:${({ checked }) =>
    checked ? css`${checkAnimation} 0.3s linear 1` : "none"};
}

stroke: ${globalColors.light.primary}; // Add this here
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  background-color: ${globalColors.light.primary};
`;

export const Checkbox: React.FC<CheckBoxItf> = ({ checked, handleOnChange, ...props}) => (
	<CheckboxContainer>
	  <HiddenCheckbox />
	  <StyledCheckbox checked={checked}>
        <svg viewBox="0 0 22 18">
            <path d="M1 6.85L8.09677 14L21 1" />
        </svg>
      </StyledCheckbox>
	</CheckboxContainer>
  )