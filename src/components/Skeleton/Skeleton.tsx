import React from "react";
import styled, { keyframes } from "styled-components";
import { space, layout } from "styled-system";
import { SkeletonProps, animation as ANIMATION, variant as VARIANT } from "./types";

const waves = keyframes`
   from {
        left: -150px;
    }
    to   {
        left: 100%;
    }
`;

const pulse = keyframes`
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.2;
  }
`

const Root = styled.div<SkeletonProps>`
  min-height: 18px;
  justify-content: center;
  align-items: center;
  background-color: #232834;
  border-radius: 5px;
  ${layout}
  ${space}
`

const Pulse = styled(Root)`
  animation: ${pulse} 3s infinite ease-out;
  transform: translate3d(0, 0, 0);
`

const Waves = styled(Root)`
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  &:before {
    content: "";
    position: absolute;
    background-image: linear-gradient(90deg, transparent, rgba(243, 243, 243, 0.5), transparent);
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;
    animation: ${waves} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;

const Skeleton: React.FC<SkeletonProps> = ({ variant = VARIANT.RECT, animation = ANIMATION.PULSE, ...props }) => {
  if (animation === ANIMATION.WAVES) {
    return <Waves variant={variant} {...props} />;
  }

  return <Pulse variant={variant} {...props} />;
};

export default Skeleton;
