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

const NavBar = (props) => {
  // const { account, connect, reset } = useWallet()
  // const cakePriceUsd = usePriceCakeBusd()
  const [isChecked, setIsChecked] = useState(false);
  // const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us', { maximumFractionDigits: 2 });

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
          <Link to="/bonds" className="nav-links" onClick={() => { setIsChecked(!isChecked) }}>
            <TypographyBold>Airdrop</TypographyBold>
          </Link>
        </Flex>
      </NavContainer>
    </MenuContainer>
    /* 
    <ul className="nav-tabs outsideMainNav">
      <li className="web3li">
        {account != null && account.length > 1 ?
          <Price style={{ justifyContent: 'center' }}>
            <Balance>{cakeBalance} RVRS</Balance>{account.substring(0, 6)}...
          </Price>
          :
          <UnlockButton style={{
            fontSize: '14px',
            marginTop: '15px',
            width: '100%',
            minHeight: '21px',
            maxHeight: '37px'
          }}>Connect
          </UnlockButton>
        }
      </li>
      </ul>
      */
  )
}

const TypographyBold = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0px;
  text-shadow: 0 0 0 #FFFF;
`

const NavContainer = styled.div`
  text-align: center;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 30px;
  padding: 20px;
  margin-bottom: -10px;
  background-color: #2D3544;
`
const MenuContainer = styled(Container)`
  min-height: calc(1vh - 64px);
  padding-top: 40px;
  max-width: 400px;
`

export default NavBar
