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
          <Flex justifyContent="space-between">
            <Link to="/x" className="nav-links" onClick={() => { setIsChecked(!isChecked) }}>
              <TypographyBold>Docs</TypographyBold>
            </Link>
            <Link to="/x" className="nav-links" onClick={() => { setIsChecked(!isChecked) }}>
              <TypographyBold>Discord</TypographyBold>
            </Link>
            <Link to="/x" className="nav-links" onClick={() => { setIsChecked(!isChecked) }}>
              <TypographyBold>Govern</TypographyBold>
            </Link>
            <Link to="/x" className="nav-links" onClick={() => { setIsChecked(!isChecked) }}>
              <TypographyBold>Twitter</TypographyBold>
            </Link>
          </Flex>
        </NavContainer>
    </MenuContainer>
  )
}

const TypographyBold = styled.p`
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 0px;
    text-shadow: 0 0 0 #FFFF;
`

const NavContainer = styled.div`
  text-align: center;
  padding: 20px;
  margin-bottom: -10px;
`
const MenuContainer = styled(Container)`
  min-height: calc(1vh - 64px);
  padding-top: 0px;
  max-width: 380px;
  padding-bottom: 40px;
`

export default MenuBottom
