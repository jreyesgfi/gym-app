import React, { useState } from 'react';
import styled from 'styled-components';

interface SwipeHandlerProps {
  onSwipeTopBottom?: () => void;
  onSwipeBottomTop?: () => void;
  onSwipeRightLeft?: () => void;
  onSwipeLeftRight?: () => void;
}

const SwipeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SwipeHandler: React.FC<SwipeHandlerProps> = ({
  onSwipeTopBottom,
  onSwipeBottomTop,
  onSwipeRightLeft,
  onSwipeLeftRight,
}) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [endY, setEndY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].clientY);
    setEndY(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setEndY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (startY !== null && endY !== null) {
      const difference = startY - endY;
      // Assuming a swipe threshold of 50 pixels
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          if (onSwipeTopBottom) onSwipeTopBottom(); // Swiped up
          if (onSwipeBottomTop) onSwipeBottomTop(); // Swiped down
        } else {
          if (onSwipeRightLeft) onSwipeRightLeft(); // Swiped right
          if (onSwipeLeftRight) onSwipeLeftRight(); // Swiped left
        }
      }
    }
    setStartY(null);
    setEndY(null);
  };

  return (
    <SwipeContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Other components */}
    </SwipeContainer>
  );
};

export default SwipeHandler;