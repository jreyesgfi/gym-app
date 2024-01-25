import styled from "styled-components";
import { Column, globalColors, Text } from "../globalStyles";



interface Props {
    numStages: number;
    currentStage: number;
    labels?: string[];
}
const ProgressDotsWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: center;
`;

interface StageProps {
    current_stage?: boolean;
}

const GuestName = styled(Text) <StageProps>`
    margin: auto auto 0;
    color: ${({ current_stage }) => (current_stage === true ? `${globalColors.primary[400]}` : `${globalColors.primary[200]}`)};
    font-size: ${({ current_stage }) => (current_stage === true ? `14pt` : `8pt`)};
`;


const StageDot = styled.div<StageProps>`
    width: ${({ current_stage }) => (current_stage === true ? `14px` : `8px`)};
    height: ${({ current_stage }) => (current_stage === true ? `14px` : `8px`)};
    border-radius: 50%;
    margin: 0 auto;
    background-color: ${({ current_stage }) => (current_stage === true ? `${globalColors.primary[400]}` : `${globalColors.primary[200]}`)};
    z-index: 50;
`;

const StageWrapper = styled(Column)`
    min-width:0;
    gap: 8px;
    justify-content: space-between;
    > *{ transition: all 0.4s ease-in-out; }
`;

export const CustomProguessDots: React.FC<Props> = ({numStages, currentStage, labels}) => {
    const dots = Array.from({ length: numStages }, (_, i) => i+1); // Create an array of numbers from 1 to numStages
    return(
        <ProgressDotsWrapper>
            {dots.map((stageNum,i) => (
                <StageWrapper key={i}>
                    {labels?.length !==0 &&
                        <GuestName current_stage= {stageNum === currentStage}>
                            {labels?.[i]}
                        </GuestName>
                    }
                    <StageDot
                        key={i}
                        current_stage = {stageNum === currentStage}
                    />
                    
                </StageWrapper>
                
            ))}
        </ProgressDotsWrapper>
    )
}