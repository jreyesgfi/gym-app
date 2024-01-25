import { ReactNode, useContext } from 'react';
import { ParallaxContainer } from './ParallaxContainer'
import { LevelContext } from './ProcessWizard'
import { DecorationImage } from '../../components/ParallaxDecoration'
import { LevelContextItf} from '../../types';
import styled from "styled-components";
import { adjustUrlForEnvironment } from '../../serverConfig';

const GlobalSectionWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

interface Props {
  children?: (ReactNode[] | ReactNode),
  sections: ReactNode[],
  currentSection?: number,
  version?: number
}
export const SectionsWrapper: React.FC<Props> =
  ({ children: children, sections, currentSection }) => {
    const levelContext: LevelContextItf | undefined = useContext(LevelContext);
    // take the current section from the inherit props, otherwise from the context
    currentSection = currentSection!==undefined ? 
      currentSection : levelContext?.levels?.['Section'];
    return (
      <GlobalSectionWrapper>
        <ParallaxContainer active={currentSection === 1} currentStage={currentSection as number}
          parallaxChildren2={[
            <DecorationImage key="1" 
            initialPos={[-0,0.05]} initialSize={50}
            src={adjustUrlForEnvironment("assets/images/testSmall3.svg")} />,
            <DecorationImage key="2" 
            initialPos={[0.1,0.83]} initialSize={30}
            src={adjustUrlForEnvironment("assets/images/testSmall1.svg")} />,
            <DecorationImage key="3" 
            initialPos={[0.96,0.7]} initialSize={60}
            src={adjustUrlForEnvironment("assets/images/testSmall2.svg")} />,
            <DecorationImage key="4" 
            initialPos={[0.8,0.12]} initialSize={40}
            src={adjustUrlForEnvironment("assets/images/testSmall3.svg")} />
          ]}
          parallaxChildren3={[
            <DecorationImage key="1" 
            initialPos={[0.9,0.95]} initialSize={230}
            src={adjustUrlForEnvironment("assets/images/testSmall2.svg")} />,
            <DecorationImage key="2" 
            initialPos={[0.08,0.87]} initialSize={40}
            src={adjustUrlForEnvironment("assets/images/testSmall2.svg")} />,
            <DecorationImage key="2" 
            initialPos={[0.9,0.1]} initialSize={60}
            src={adjustUrlForEnvironment("assets/images/testSmall.svg")} />,
          ]}
          
          parallaxChildren0={
            sections
          }>
            {children}
        </ParallaxContainer>
      </GlobalSectionWrapper>

    )
  }
