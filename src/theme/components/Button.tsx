import styled, { css } from 'styled-components'
import { globalColors } from '../globalStyles';

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


export interface ButtonItf {
	highlighted?: boolean;
    selected?: boolean;
	hidden_style?: boolean;
	none_style?: boolean;
}

export const CustomButton = styled.button<ButtonItf>`
	${({selected, highlighted, hidden_style, none_style}) => {
        if (selected===true){return checkedStyles}
        if(highlighted===true){return highlightedStyles} 
		if(hidden_style===true){return hiddenStyles}
		if(none_style===true){return noneStyles} 
        return uncheckedStyles
    }};
    border-radius: 8px;
    margin: 12px 8px 12px 0;
	padding: 12px 16px;
	white-space: nowrap;
	
	font-size: 16px;
	font-family: primary-body;
	outline: none;
	transform: all 0.3s;
	cursor: pointer;
	overflow: hidden;
	position: relative;
	user-select: none;
	&:before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
		transition: all 0.6s ease;
		width: 100%;
		height: 0%;
		transform: translate(-50%, -50%) rotate(45deg);
	}
	&:hover:before {
		height: 500%;
		background-color: ${globalColors.dark.primary};
	}
	&:hover {
		background-color: ${globalColors.primary['200']};
		color: ${globalColors.light.primary};
		border:1px solid ${globalColors.light.primary};
	}
`;