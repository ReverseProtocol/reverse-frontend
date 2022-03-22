import React, { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceCakeBusd } from 'state/hooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ButtonGroup, Button } from 'react-bootstrap'
import { getBalanceNumber } from 'utils/formatBalance'
import UnlockButton from 'components/unlock'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { NavLink } from 'react-router-dom'
import { useWalletModal } from 'components/WalletModal'
import rvrs from 'config/constants/rvrs'
import Typography from '../typography/typography'
import { Flex } from '../flex'

const Nav = (props) => {
  const { account, connect, reset } = useWallet()
  const rvrsPriceUsd = usePriceCakeBusd()
  const rvrsBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us', { maximumFractionDigits: 0 });
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <MenuContainer>
      <ButtonGroup>
        <ButtonContainer>
          <StyledButton
            as={StyledNavLink}
            to="/stakeDeprecated"
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/stakeDeprecated')
            }>veRVRS
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
      {/*
      <ButtonGroup>
        {account != null && account.length > 1 ?
          <ConnectButton style={{justifyContent:"space-between"}}>
            <object type="image/svg+xml" data="/images/hmny.svg" width="50px">&nbsp;</object> 
            {account.substring(0, 6)}...
          </ConnectButton>
          :
          <ConnectButton
            disabled={rvrs.isLocked.unlockWalletButton}
            onClick={onPresentConnectModal} {...props}>
            Connect
          </ConnectButton>
        }
      </ButtonGroup> */ }
    </MenuContainer>
  )
}

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
    background-image: linear-gradient(to right, #383F51, #354246);
    font-weight: 600;
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
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &:focus  {
    background-image: linear-gradient(to right, #464F68, #506970);
    font-weight: 600;
  }
`

export default Nav