import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import styled from 'styled-components'
import TokenInput from '../../../components/TokenInput'
import useI18n from '../../../hooks/useI18n'
import { getFullDisplayBalance } from '../../../utils/formatBalance'


const DEFAULT_TOKEN_DECIMALS = new BigNumber(10).pow(18)

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  pricePerShare?: BigNumber
  tokenName?: string
}

const StyledBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 30px;
  max-width: 108px;
  padding: 25px;
`

const StyledBtn2 = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 30px;
  max-width: 138px;
  padding: 25px;

  text-shadow: 0px 0px 10px #fff;
  box-shadow: 0px 0px 10px #fff;
  `

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenName = '', pricePerShare= DEFAULT_TOKEN_DECIMALS }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const getSharesFromAmount = (amount) => {
      const shares = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMALS).div(pricePerShare)
      console.log('getSharesFromAmount', pricePerShare, amount, shares.toString())
      return shares.toFixed(18).toString()
  }

  return (
    <Modal title={`Unstake ${tokenName}` } onDismiss={onDismiss}>

      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <StyledBtn2 
          onClick={onDismiss}
          style={{justifyContent:"center" }}>

          {TranslateString(4162, 'Cancel (3, 3)')}
        </StyledBtn2>
        <StyledBtn
          style={{justifyContent:"center" }}
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(getSharesFromAmount(val))
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(4828, '.....') : TranslateString(4164, 'Unstake')}
        </StyledBtn>
      </ModalActions>
    </Modal>
  )
}

const WarningWithdraw = styled.div`
  text-align: left;
  overflow-y: auto;
  max-height: 400px;
  color: ${(props) => props.theme.colors.primary};
`

export default WithdrawModal
