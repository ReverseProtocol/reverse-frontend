import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Toggle, useModal } from '@pancakeswap-libs/uikit'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';

const MenuBottom = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <MenuContainer>
      <NavContainer>
        <Flex justifyContent="space-between" marginTop="10px">
          <Flex flexDirection="column" alignItems="start" >
            <a style={{marginBottom:"14px"}} target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/" className="nav-links">
              <TypographyBold>Docs</TypographyBold>
            </a>
            <a target="_blanK" rel="noreferrer" href="https://discord.gg/yquJYbUtVy" className="nav-links">
              <TypographyBold>Discord</TypographyBold>
            </a>

          </Flex>
          <Flex flexDirection="column" alignItems="start" marginLeft="-80px">
            <a style={{marginBottom:"14px"}} target="_blanK" rel="noreferrer" href="https://snapshot.org/#/rvrsprotocol.eth" className="nav-links">
              <TypographyBold>Govern</TypographyBold>
            </a>
            <a target="_blanK" rel="noreferrer" href="https://twitter.com/RVRSProtocol" className="nav-links">
              <TypographyBold>Twitter</TypographyBold>
            </a>

          </Flex>
          <object type="image/svg+xml" data="/images/reverse.svg" width="150px" style={{marginTop:"-10px"}}>&nbsp;</object> 
        </Flex>
      </NavContainer>
    </MenuContainer>
  )
}

const TypographyBold = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 0px;
`

const NavContainer = styled(Container)`
  text-align: center;
  padding: 20px;
  max-width: 520px;
`
const MenuContainer = styled(Container)`
  padding-bottom: 10px;
  background-image: #2D3544;
  background-image: linear-gradient(to right, #2D3544, #313A49);
  max-width: 4000px;
`

export default MenuBottom
