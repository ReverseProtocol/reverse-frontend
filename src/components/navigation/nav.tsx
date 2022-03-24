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
import { Flex } from '../layout/flex'


const Nav = (props) => {
  const { account, connect, reset } = useWallet()
  const rvrsPriceUsd = usePriceCakeBusd()
  const rvrsBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us', { maximumFractionDigits: 0 });
  const { onPresentConnectModal } = useWalletModal(connect, reset)



  return (
    <MenuContainer>
      <ButtonGroup style={{ marginRight: "20px" }}>
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
          <ConnectButton
            style={{ justifyContent: "space-between" }}
            as={StyledNavLink}
            to="/dashboard"
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/airdrop')
            }>
            <Flex alignItems="center">
              <object type="image/svg+xml" data="/images/hmny.svg" width="50px">&nbsp;</object>
              <div style={{ marginLeft: '10px', marginRight: '20px' }}>{account.substring(0, 6)} </div>
            </Flex>
          </ConnectButton>
          :
          <ConnectButton
            as={StyledNavLink}
            to="/dashboard"
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/dashboard')
            }
            disabled={rvrs.isLocked.unlockWalletButton}
            onClick={onPresentConnectModal} {...props}>
            <Flex alignItems="center">
              <object type="image/svg+xml" data="/images/hmny.svg" width="50px">&nbsp;</object>
              <div style={{ marginLeft: '10px', marginRight: '20px' }}>Connect</div>
            </Flex>
          </ConnectButton>
        }
      </ButtonGroup>


    </MenuContainer>
  )
}

const MenuContainer = styled(Container)`
  padding-top: 50px;
  text-align: end;
  flex-wrap: wrap;
  max-width: 730px;
`

const pulse = keyframes`
  0% {
    box-shadow: 0px 0px 5px -5px #5A6F73;
  }
  50% {
    box-shadow: -10px 0px 30px -5px #506970, 0px 0px 40px -5px #464F68
  }
  100% {
    box-shadow: 0px 0px 5px -5px #5A6F73;
  }
`

const StyledButton = styled.div`
  text-align: center;
  border: #FFFF solid 0px;
  border-radius: 35px;
  background-color: #2D3544;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 28px;
  padding-right: 28px;
  font-size: 18px;
  font-weight: 500;
  &:hover  {
    background-color: #363F50;
    transition: 0.5s;
  }
`

const ConnectButton = styled.div`
  text-align: center;
  border: 1.5px;
  border-style: solid !important;
  border-color: #CBCBCB !important;
  border-radius: 35px;
  background-color: #2D3544;
  padding: 5px;
  font-size: 18px;
  font-weight: 500;
  &:hover  {
    background-color: #363F50;
    transition: 0.5s;
    transform: translate(-5px)
  }
`

const ButtonContainer = styled.div`
  border-radius: 35px;
  background-color: #2D3544;
  padding-top: 23px;
  padding-bottom: 23px;
  border: 1.5px;
  border-color: #CBCBCB !important;
  border-style: solid !important;
  animation: ${pulse} 8s infinite ease-out;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &:focus  {
    background-image: linear-gradient(to right, #464F68, #506970);
    font-weight: 600;
    transform: translate(0px)

  }
`

export default Nav