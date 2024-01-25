import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface AnimatedPageProps {
    children: ReactNode;
}

const animations = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
};
const AnimatedWrapper = styled(motion.div)`
    height:100%;
`

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <AnimatedWrapper
                key={location.pathname}
                variants={animations}
                initial="initial"
                animate="animate"
                transition={{ type: "spring", stiffness: 25 }}
                exit="exit"
            >
                {children}
            </AnimatedWrapper>
        </AnimatePresence>

    );
};

export default AnimatedPage;

export const withAnimation = (Component: React.ComponentType) => {
    return (props: any) => (
      <AnimatedPage>
        <Component {...props} />
      </AnimatedPage>
    );
  };
  
