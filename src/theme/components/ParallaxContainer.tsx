import React from "react";
import styled, { css } from "styled-components";
import { ChildrenType } from "../../types";


// checked and not checked styles


//transition: transform ${1.5-level/3}s;
const permanentStyles = () => css`
    transition: transform 1.3s ease-in-out;
    
`;
interface ParallaxWrapperItf {
    level: number;
    currentStage:number
}
// Styled components
const ParallaxWrapper = styled.div<ParallaxWrapperItf>`
    ${({level, currentStage}) => (`transform: translateY(-${currentStage*100 * (1-(level/5))/(level+1)}%);`)}
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: absolute;
    ${permanentStyles};
    z-index: ${({ level }) => (level === 0 ? '20': '')};
    opacity: ${({ level }) => (`${1-level*0.3}`)};
    >*{
        pointer-events: auto;
    }
`;

const OtherWrapper = styled.div`
`;

const GlobalParallaxWrapper = styled.div`
    width: 100%;
    height: 100%;
    z-index: 10;
    overflow: hidden;
`;

// Types


interface ParallaxContainerProps {
    currentStage: number;
    active: boolean;
    parallaxChildren0?: ChildrenType;
    parallaxChildren1?: ChildrenType;
    parallaxChildren2?: ChildrenType;
    parallaxChildren3?: ChildrenType;
    children?: ChildrenType;// Accepts any ReactNode as children
}

// Component
export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ currentStage, parallaxChildren0, parallaxChildren1, parallaxChildren2, parallaxChildren3 , children: children }) => {
    // const levels: React.ReactElement<ChildProps>[][] = [];

    // React.Children.toArray(parallaxChildren).forEach((child) => {
    //     const childProps = child && (child as React.ReactElement<ChildProps>).props;
    //     if (childProps && childProps.level) {
    //         const level = childProps.level;
    //         if (!levels[level]) {
    //             levels[level] = [];
    //         }
    //         levels[level].push(child as React.ReactElement<ChildProps>);
    //     }
    // });

    const parallaxGroups = [parallaxChildren0,parallaxChildren1,parallaxChildren2,parallaxChildren3].map((levelChildren, i) => (
        <ParallaxWrapper key={i} level={i} currentStage={currentStage}>
            {levelChildren}
        </ParallaxWrapper>

    ));

    return (
        <GlobalParallaxWrapper>
            {parallaxGroups}
            {children && <OtherWrapper>
                {children}
            </OtherWrapper>}
        </GlobalParallaxWrapper>); // Replace with your GlobalParallaxWrapper
};