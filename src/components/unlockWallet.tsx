import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import ReactTooltip from 'react-tooltip';
import labo from 'config/constants/labo'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components';

const UnlockBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 500;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 35px;
  max-width: 140px;
  padding: 12px;

  text-shadow: 0px 0px 5px #fff;
  box-shadow: 0px 0px 5px #fff;
  `


const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <span data-tip data-for='happyFace3'>
      <UnlockBtn 
      disabled={ labo.isLocked.unlockWalletButton } 
      onClick={onPresentConnectModal} {...props}>
        {TranslateString(2922, 'Connect Wallet')}
      </UnlockBtn>
     
    </span>
  )
}

export default UnlockButton
