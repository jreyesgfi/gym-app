import styled from 'styled-components';
import { globalColors } from '../globalStyles';

export const RoundIconWrapper = styled.div`
    position: absolute;
    background-color: ${globalColors.light.primary};
    padding: 4px;
    border-radius: 50%;
    border: 1px solid ${globalColors.primary[400]};
    cursor: pointer;
    z-index:50;
`;
export const RoundIconImage = styled.img`
    width: 2rem;
    position: absolute;
    z-index:50;
`;