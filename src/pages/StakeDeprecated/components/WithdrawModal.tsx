import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import ModalActions from 'components/modalActions'
import styled from 'styled-components'
import Modal from 'components/layout/modal/Modal'
import ModalButton from 'components/layout/buttons/modalButton'
import TokenInput from '../../../components/TokenInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'

const DEFAULT_TOKEN_DECIMALS = new BigNumber(10).pow(18)

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  pricePerShare?: BigNumber
  tokenName?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenName = '', pricePerShare= DEFAULT_TOKEN_DECIMALS }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
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
        <ModalButton
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(getSharesFromAmount(val))
            setPendingTx(false)
            onDismiss()}}>{pendingTx ? 'Pending...' : 'Confirm'}
        </ModalButton>
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal
