import styled, { css } from "styled-components";
import { globalColors } from "../globalStyles";

// checked and not checked styles
const checkedStyles = css`
    border: 1px solid ${globalColors.primary[400]};
    background-color:${globalColors.primary[400]};
    color: ${globalColors.light.primary};
`

const highlightedStyles = css`
    border: 1px solid ${globalColors.primary[400]};
    color: ${globalColors.primary[400]};
    background-color: ${globalColors.light.primary};
`
const uncheckedStyles = css`
    border: 1px solid ${globalColors.light.primary};
    background-color: ${globalColors.grey.light};
`
const hiddenStyles = css`
	opacity: 0;
`;

const noneStyles = css`
	border: 1px solid transparent;
	background-color: ${globalColors.transparent.full}
`;
interface ChangingShapeItf {
	highlighted?: boolean;
    selected?: boolean;
	hidden_style?: boolean;
	none_style?: boolean;
}
export const ChangingShape = styled.div<ChangingShapeItf>`
${({selected, highlighted, hidden_style, none_style}) => {
	if (selected===true){return checkedStyles}
	if(highlighted===true){return highlightedStyles} 
	if(hidden_style===true){return hiddenStyles}
	if(none_style===true){return noneStyles} 
	return uncheckedStyles
}};
`;
