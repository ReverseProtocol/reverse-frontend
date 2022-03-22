import React from 'react'
import ReactTooltip from 'react-tooltip';
import rvrs from 'config/constants/rvrs'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components';
import { useWalletModal } from './WalletModal';

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <span data-tip data-for='happyFace3'>
      <UnlockBtn 
      disabled={ rvrs.isLocked.unlockWalletButton } 
      onClick={onPresentConnectModal} {...props}>
        {TranslateString(2922, 'Connect Wallet')}
      </UnlockBtn>
    </span>
  )
}

const UnlockBtn = styled.button`
  background-color: rgba(0, 0, 0,0) !important;
  border: 0px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #FFFF;
  width: 100%;
  padding: 13px;
`

export default UnlockButton
