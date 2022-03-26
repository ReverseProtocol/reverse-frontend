import React from 'react'
import Page from 'components/layout/containers/page'
import styled from 'styled-components'
import rvrs from 'config/constants/rvrs'
import { Flex } from 'components/layout/flex'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useWalletModal } from 'components/walletModal'

const Unlock = () => {
    const { account, connect, reset } = useWallet()
    const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <Page>
        {/* 
        <ConnectButton
            onClick={onPresentConnectModal}>
            <Flex alignItems="center">
              <div style={{marginLeft:'10px', marginRight:'20px'}}>Connect</div>
            </Flex>
          </ConnectButton>
          */ }
    </Page>
  )
}


const ConnectButton = styled.button`
  text-align: center;
  border: 1.5px;
  border-style: solid !important;
  border-color: #CBCBCB !important;
  border-radius: 35px;
  background-color: #2D3544;
  padding: 25px;
  font-size: 18px;
  font-weight: 500;
  &:hover  {
    background-color: #363F50;
    transition: 0.4s;
  }
  max-width: 200px;
`

export default Unlock