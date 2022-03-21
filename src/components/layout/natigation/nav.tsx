import React, { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceCakeBusd } from 'state/hooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ButtonGroup, Button } from 'react-bootstrap'
import { getBalanceNumber } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { NavLink } from 'react-router-dom'

const StyledButton = styled(Button)`
  text-align: center;
  border: #FFFF solid 0px;
  border-radius: 30px;
  padding: 20px;
  background-color: #2D3544;
`

const MenuContainer = styled(Container)`
  padding-top: 50px;
  text-align: center;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  background-color: #2D3544;
  &:focus  {
    background-color: #3F4550;
    border: #FFFF solid 0px !important;
    box-shadow: none;
  }
`

const NavBar = () => {
  const { account, connect, reset } = useWallet()
  const rvrsPriceUsd = usePriceCakeBusd()
  const rvrsBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us', { maximumFractionDigits: 2 });

  return (
    <MenuContainer>
      <ButtonGroup>
        <StyledButton
          as={StyledNavLink}
          to="/stakeDeprecated"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/stakeDeprecated')
          }
        >veRVRS
        </StyledButton>
        <StyledButton
          as={StyledNavLink}
          to="/bonds"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/bonds')
          }
        >&nbsp;Bonds&nbsp;
        </StyledButton>
        <StyledButton
          as={StyledNavLink}
          to="/airdrop"
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/airdrop')
          }
        >Airdrop
        </StyledButton>
      </ButtonGroup>
    </MenuContainer>
  )
}

export default NavBar