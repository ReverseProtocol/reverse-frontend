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
import ContentCardMain from './components/contentCardMain'
import Divider from './components/divider'

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
  const toClaimStr = toClaim.toLocaleString('en-us', { maximumFractionDigits: 3, minimumFractionDigits: 2 })
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
            <ContentCard style={{marginBottom:'12px'}}>
              <TypographyTitle style={{marginTop:'15px', marginBottom:'10px'}}>Claim Your Weekly UST Airdrop</TypographyTitle>
            </ContentCard>
            <Flex justifyContent="center">
              <ContentCard style={{marginRight:'7px'}}> 
                <TypographyBold style={{marginBottom:'5px'}}>{totalDistributedStr} UST</TypographyBold>
                <Typography>Total Distributed</Typography>
              </ContentCard>
              <ContentCardMain> 
                <TypographyBold style={{marginBottom:'5px'}}>{expectedReturns} UST</TypographyBold>
                <Typography>Yearly Returns</Typography>
              </ContentCardMain>
              <ContentCard style={{marginLeft:'7px'}}>
                <TypographyBold style={{marginBottom:'5px'}}>{claimedStr} UST</TypographyBold>
                {account != null && account.length > 1? 
                <Typography>Claimed by ({account.substring(0,6)})</Typography>
                :
                <Typography>&nsbp;</Typography>
                }
              </ContentCard>
            </Flex>
            <Flex justifyContent="space-between" padding="10px" marginTop="20px">
              <Flex flexDirection="column" marginTop="2px"> 
                <Typography>UST</Typography>
                <TypographyBold style={{marginLeft:'10px', marginTop:'5px'}}>{toClaimStr}</TypographyBold>
              </Flex>
              {toClaim && toClaim > 0 ?
              <ClaimButton onClick={handleAirdropClaim} disabled={pendingTxn}>
                Claim
              </ClaimButton>
              :
              <ClaimButton>
                Nothing to Claim
              </ClaimButton>
              }
            </Flex>
            <Divider/>
        </AirdropCard>
    </Page>
  )
}


export default Airdrop