import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceCakeBusd } from 'state/hooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ButtonGroup, Button } from 'react-bootstrap'
import { getBalanceNumber } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { NavLink } from 'react-router-dom'
import { useWalletModal } from 'components/walletModal'
import rvrs from 'config/constants/rvrs'
import { Flex } from '../flex'

const Nav = (props) => {
  const { account, connect, reset } = useWallet()
  const rvrsPriceUsd = usePriceCakeBusd()
  const rvrsBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us', { maximumFractionDigits: 0 });
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <MenuContainer>
      <ButtonGroup style={{marginLeft:"170px"}}>
          <ButtonContainer>
            <StyledButton
              as={StyledNavLink}
              to="/staking"
              isActive={(match, { pathname }) =>
                Boolean(match) ||
                pathname.startsWith('/staking')
              }>Staking
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
              }>Airdrop
            </StyledButton>
          </ButtonContainer>
      </ButtonGroup>
      <ButtonGroup>
        {account != null && account.length > 1 ?
          <ConnectButton style={{ justifyContent: "space-between" }}>
            <Flex alignItems="center">
              <object type="image/svg+xml" data="/images/hmny.svg" width="50px">&nbsp;</object>
              <div style={{ marginLeft: "10px", marginRight: "20px" }}>{account.substring(0, 6)}</div>
            </Flex>
          </ConnectButton>
          :
          <ConnectButton
            disabled={rvrs.isLocked.unlockWalletButton}
            onClick={onPresentConnectModal} {...props}>
            <Flex alignItems="center">
              <object type="image/svg+xml" data="/images/hmny.svg" width="50px">&nbsp;</object>
              <div style={{ marginLeft: "10px", marginRight: "20px" }}>Connect</div>
            </Flex>
          </ConnectButton>
        }
      </ButtonGroup>
    </MenuContainer>
  )
}

const pulse = keyframes`
  0% {
    box-shadow: 0px 0px 0px #5A6F73;
  }
  50% {
    box-shadow: 0px 0px 15px #5A6F73;
  }
  100% {
    box-shadow: 0px 0px 0px #5A6F73;
  }
`

const StyledButton = styled.div`
  text-align: center;
  border: #FFFF solid 0px;
  border-radius: 35px;
  background-color: #2D3544;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 18px;
  font-weight: 500;
  &:hover  {
    background-color: #363F50;
    transition: 0.4s;
  }
`

const ConnectButton = styled.div`
  text-align: center;
  padding: 5px;
  border: #FFFF solid 1px;
  border-radius: 35px;
  background-color: #2D3544;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px

  
`

const MenuContainer = styled(Container)`
  padding-top: 50px;
  text-align: center;
`

const ButtonContainer = styled.div`
  border-radius: 35px;
  background-color: #2D3544;
  padding: 1px;
  padding-top: 23px;
  padding-bottom: 23px;
  border: 1.5px;
  border-style: solid !important;
  border-color: #CBCBCB !important;
  animation: ${pulse} 3s infinite ease-out;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &:focus  {
    background-image: linear-gradient(to right, #464F68, #506970);
    font-weight: 600;
  }
`

export default Nav