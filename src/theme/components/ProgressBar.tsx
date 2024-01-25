import styled from "styled-components";
import { globalColors } from "../globalStyles";



interface Props {
    numStages: number;
    currentStage: number;
}
const ProgressBarWrapper = styled.div`
    position: relative;
    height: 12px;
    box-sizing: content-box;
    margin: 0 8px;
`;
const ProgressLine = styled.div`
    position: absolute;
    height: 8px;
    inset:0px;
    margin: auto;
    border-radius: 4px;
`;
const BackgroundLine = styled(ProgressLine)`
    width: 100%;
    background-color: ${globalColors.primary[100]}
`;
const CurrentProgressLine = styled(ProgressLine)<{progressPercentage:number}>`
    width: ${({ progressPercentage }) => (`${progressPercentage}%`) };
    right: auto;
    background-color: ${globalColors.primary[400]};
    transition: width 0.5s;
    z-index: 25;
`;
interface DotProps {
    stagePosition:number;
    passedStage?: boolean;
}
const StageDot = styled.div<DotProps>`
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;

    margin: auto;
    top: 0;
    bottom: 0;
    left: ${({ stagePosition }) => (`${stagePosition}%`) };
    background-color: ${({ passedStage }) => (passedStage===true?`${globalColors.primary[800]}`:`${globalColors.light.white}`) };;
    z-index: 50;
`;

export const CustomProguessBar: React.FC<Props> = ({numStages, currentStage}) => {
    const dots = Array.from({ length: numStages }, (_, i) => i+1); // Create an array of numbers from 1 to numStages
    const dotsOffset = 50 / numStages; //100 / 2 / numStages
    return(
        <ProgressBarWrapper>
            <BackgroundLine/>
            <CurrentProgressLine
                progressPercentage={currentStage/numStages*100}
            />
            {dots.map(stageNum => (
                <StageDot
                    stagePosition={stageNum/numStages*100 - dotsOffset}
                    //passedStage = {stageNum <= currentStage}
                />
            ))}
        </ProgressBarWrapper>
    )
}