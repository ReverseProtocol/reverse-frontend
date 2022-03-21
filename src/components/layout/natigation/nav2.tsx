import React, { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Flex } from '@pancakeswap-libs/uikit'
import { usePriceCakeBusd } from 'state/hooks'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { getBalanceNumber } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'

const Nav = (props) => {
  const { account, connect, reset } = useWallet()
  const cakePriceUsd = usePriceCakeBusd()
  const [isChecked, setIsChecked] = useState(false);
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us', { maximumFractionDigits: 2 });

  return (
    <MenuContainer>
      <NavContainer>
        <Flex justifyContent="space-between">
          <Link to="/stakeDeprecated" className="nav-links" onClick={() => { setIsChecked(!isChecked) }}>
            <TypographyBold>veRVRS</TypographyBold>
          </Link>
          <Link to="/bonds" className="nav-links" onClick={() => { setIsChecked(!isChecked) }}>
            <TypographyBold>Bonds</TypographyBold>
          </Link>
          <Link to="/airdrop" className="nav-links" onClick={() => { setIsChecked(!isChecked) }}>
            <TypographyBold>Airdrop</TypographyBold>
          </Link>
        </Flex>
      </NavContainer>
      { /*  <ul className="nav-tabs outsideMainNav">
        <li className="web3li">
        {account != null && account.length > 1 ?
          <TypographyBold style={{ justifyContent: 'center' }}>
            <TypographyBold>{cakeBalance} RVRS</TypographyBold>{account.substring(0, 6)}...
          </TypographyBold> : <TypographyBold>Connect</TypographyBold> }
      </li> </ul> */ }
    </MenuContainer>
  )
}

const TypographyBold = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0px;
`

const NavContainer = styled.div`
  text-align: center;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 35px;
  padding: 22px;
  margin-bottom: -10px;
  background-color: #2D3544;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    background-color: #3F4550;
  }
`
const MenuContainer = styled(Container)`
  min-height: calc(1vh - 64px);
  padding-top: 50px;
  max-width: 350px;
`

export default Nav
