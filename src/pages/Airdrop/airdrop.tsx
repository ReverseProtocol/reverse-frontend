import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import Page from 'components/page'
import useI18n from 'hooks/useI18n'
import { Flex } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'

// web3
import {useWallet} from "@binance-chain/bsc-use-wallet"
import {useAirdropData} from "../../state/hooks"
import useAirdropClaim from "../../hooks/useAirdropClaim"
import {getBalanceNumber} from "../../utils/formatBalance"

// components
import AirdropCard from './components/airdropCard'
import ClaimButton from './components/buttons/claimButton'
import TypographyTitle from './components/typography/typographyTitle'
import TypographyBold from './components/typography/typographyBold'
import Typography from './components/typography/typography'
import ContentCard from './components/contentCard'


const Airdrop = () => {
  const { account } = useWallet()
  const airdropData = useAirdropData(account)
  const { onAirdropClaim } = useAirdropClaim(account)
  const totalDistributed = getBalanceNumber(airdropData.totalDistributed)
  const toClaim = getBalanceNumber(airdropData.userClaimable)
  const claimed = getBalanceNumber(airdropData.userTotalClaimed)

  // Yearly Returns = UST claimed to date by user / amount of airdrops * weeks in a year 
  const expectedReturns = new BigNumber(claimed).div(1).times(52.2).toNumber().toLocaleString('en-us', { maximumFractionDigits: 3 })

  const totalDistributedStr = totalDistributed.toLocaleString('en-us', { maximumFractionDigits: 3 })
  const toClaimStr = toClaim.toLocaleString('en-us', { maximumFractionDigits: 3 })
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
            <TypographyTitle style={{marginTop:'15px', marginBottom:'10px'}}>Claim Your Weekly UST Airdrop</TypographyTitle>
            <Flex justifyContent="center" padding="10px">
              <ContentCard style={{marginRight:'5px'}}> 
                <TypographyTitle>{totalDistributedStr} UST</TypographyTitle>
                <Typography>Total Distributed</Typography>
              </ContentCard>
              <ContentCard > 
                <TypographyTitle>{expectedReturns} UST</TypographyTitle>
                <Typography>Yearly Returns</Typography>
              </ContentCard>
              <ContentCard style={{marginLeft:'5px'}}>
                <TypographyTitle>{claimedStr} UST</TypographyTitle>
                {account != null && account.length > 1? 
                <Typography>Claimed by ({account.substring(0,6)})</Typography>
                :
                <Typography>&nsbp;</Typography>
                }
              </ContentCard>
            </Flex>
            <Flex justifyContent="space-between" padding="10px">
              {account != null && account.length > 1?
              <TypographyBold>{toClaimStr} UST</TypographyBold>
              :
              <ClaimButton>
                ...
              </ClaimButton>
              }
              {toClaim && toClaim > 0 ?
              <ClaimButton onClick={handleAirdropClaim} disabled={pendingTxn}>
                Claim
              </ClaimButton>
              :
              <ClaimButton>
                Claimed
              </ClaimButton>
              }
            </Flex>

        </AirdropCard>
    </Page>
  )
}

export default Airdrop