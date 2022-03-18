import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import Page from 'components/page'
import useI18n from 'hooks/useI18n'

// web3
import {useWallet} from "@binance-chain/bsc-use-wallet"
import {useAirdropData} from "../../state/hooks"
import useAirdropClaim from "../../hooks/useAirdropClaim"
import {getBalanceNumber} from "../../utils/formatBalance"

// components
import AirdropCard from './components/airdropCard'
import ClaimButton from './components/buttons/claimButton'
import TypographyTitle from './components/typography/typographyTitle'

const Airdrop = () => {
  const { account } = useWallet()
  const airdropData = useAirdropData(account)
  const { onAirdropClaim } = useAirdropClaim(account)
  const totalDistributed = getBalanceNumber(airdropData.totalDistributed)
  const totalDistributedStr = totalDistributed.toLocaleString('en-us', { maximumFractionDigits: 3 })
  const toClaim = getBalanceNumber(airdropData.userClaimable)
  const toClaimStr = toClaim.toLocaleString('en-us', { maximumFractionDigits: 3 })
  const claimed = getBalanceNumber(airdropData.userTotalClaimed)
  const claimedStr = claimed.toLocaleString('en-us', { maximumFractionDigits: 3 })
  
  const [pendingTxn, setPendingTxn] = useState(false)
  const handleAirdropClaim = useCallback(async () => {
    try {
      setPendingTxn(true)
      const txHash = await onAirdropClaim()
      if (!txHash) { setPendingTxn(false) }
    } catch (e) {
      console.error(e)
      setPendingTxn(false)
    }
  }, [onAirdropClaim, setPendingTxn])

  return (
    <Page>
        <AirdropCard>
            <TypographyTitle>UST Is Distributed Weekly to Protocol Participants</TypographyTitle>
            <TypographyTitle>Total Distributed {totalDistributedStr} UST</TypographyTitle>
            <TypographyTitle>Already Claimed {claimedStr} UST</TypographyTitle>
            
            {toClaim && toClaim > 0 ?
            <ClaimButton onClick={handleAirdropClaim} disabled={pendingTxn}>
              Claim {toClaimStr} UST
            </ClaimButton>
            :
            <ClaimButton>
              Claimed
            </ClaimButton>
          }
        </AirdropCard>
    </Page>
  )
}

export default Airdrop