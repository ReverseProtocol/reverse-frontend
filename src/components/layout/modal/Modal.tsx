import React from "react";
import styled from "styled-components";
import { InjectedProps } from "./types";
import { FlexProps } from "../flex/types";
import TypographyTitle from "../typography/typographyTitle";

interface Props extends InjectedProps {
  title: string;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
}

const Flex = styled.div<FlexProps>`
  display: flex;
`

const Divider = styled.div`
  background-color: #5F6C74;
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 40px;
  width: 100%;
`

const StyledModal = styled.div`
  background: #37404E;
  padding: 20px;
  border: 1px solid #FFF;
  border-radius: 25px;
  z-index: ${({ theme }) => theme.zIndices.modal};

`

const ModalHeader = styled.div`
  display: flex;
`

const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

const DismissButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  color: #FFFF;
  padding: 10px;
  justify-content: center;
  background: none;
  border-radius: 10px;
  border: 1px;
  border-style: solid !important;
  border-color: #5F6C74 !important;
  :hover {
      background: none;
  } 
`

const Modal: React.FC<Props> = ({
  title,
  onDismiss,
  children,
  hideCloseButton = false,
}) => (

  <StyledModal>
    <ModalHeader>

      <ModalTitle>
        <TypographyTitle>{title}</TypographyTitle>
      </ModalTitle>

      <DismissButton onClick={onDismiss}>
        Close
      </DismissButton>

    </ModalHeader>
    <Divider />

    <Flex>
      {children}
    </Flex>

  </StyledModal>
);

export default Modal;
