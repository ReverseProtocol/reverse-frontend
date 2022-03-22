import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { InjectedProps } from "./types";
import TypographyTitle from "../typography/typographyTitle";
import { Flex } from "../flex";

interface Props extends InjectedProps {
  title: string;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
}

const Modal: React.FC<Props> = ({
  title,
  onDismiss,
  children,
  hideCloseButton = false,
}) => (

  <StyledModal>
    <TitleContainer>
      <Flex justifyContent="space-between">
        <TypographyTitle>{title}</TypographyTitle>
        <DismissButton onClick={onDismiss}>Close</DismissButton>
      </Flex>
    </TitleContainer>
    <Divider />
    <Flex>
      {children}
    </Flex>
  </StyledModal>
)

const Divider = styled.div`
  height: 0px;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 0%;
`

const TitleContainer = styled(Container)`
  background-image: linear-gradient(to right, #3E475E, #4E5E62);
  border-radius: 20px;
  padding: 20px;
`


const StyledModal = styled.div`
  background-image: linear-gradient(#2D3544, #37404E);
  padding: 20px;
  border: 1px solid #FFF;
  border-radius: 25px;
  z-index: ${({ theme }) => theme.zIndices.modal};

`

const DismissButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  color: #D6D6D6;
  padding: 0px;
  background: none;
  border-radius: 10px;
  border: 0px;
  border-style: solid !important;
  border-color: #5F6C74 !important;
  :hover {
      background: none;
      color: #FFFF;
      transition: 0.5s;
  } 
`

export default Modal;
