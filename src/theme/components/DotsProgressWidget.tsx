import { ReactNode } from "react";
import styled from "styled-components";
import { CustomProguessDots } from "./ProgressDots";
import { Text, globalColors, GeneralWrapper } from "../globalStyles";
import { ControlPropsItf } from "../../types";


interface Props {
    numStages: number;
    currentStage: number;
    labels?: string[];
    Control: ControlPropsItf;
}


const ProgressWrapper = styled(GeneralWrapper)`

    justify-content: center;
    align-items: center;
    position: absolute;
    display: flex;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    box-sizing: content-box;
    inset: auto 0 8px;
    z-index:100;
    > div{
        margin:auto;
    }
`;

export const DotsProgressWidget: React.FC<Props> = ({ numStages, currentStage, labels, Control}) => {
    const ControlWidget = Control?.ControlComponent;
    const {possibleTakeBack, possibleNext, changeStage} = Control;
    
    return (
        <ProgressWrapper>
            {ControlWidget ? (
                <ControlWidget possibleTakeBack={possibleTakeBack} possibleNext={possibleNext} changeStage={changeStage}>
                    <CustomProguessDots
                        numStages={numStages}
                        currentStage={currentStage + 1}
                        labels={labels}
                    />
                </ControlWidget>
            ) : (
                <CustomProguessDots
                    numStages={numStages}
                    currentStage={currentStage + 1}
                    labels={labels}
                />
            )}
        </ProgressWrapper>
    );
};