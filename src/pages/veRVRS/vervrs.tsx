import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Page from 'components/layout/containers/page'
import useI18n from 'hooks/useI18n'
import { Flex } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useWallet } from "@binance-chain/bsc-use-wallet"
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import AirdropContainer from 'components/layout/containers/airdropContainer'
import ContentCard from 'components/layout/cards/airdrop/contentCard'
import ContentCardMain from 'components/layout/cards/airdrop/contentCardMain'
import Divider from 'components/divider'
import ClaimButtonDisabled from 'components/layout/buttons/claimAirdropButtonDisabled'
import ClaimButton from 'components/layout/buttons/claimAirdropButton'
import { useAirdropData } from "../../state/hooks"
import useAirdropClaim from "../../hooks/useAirdropClaim"
import { getBalanceNumber } from "../../utils/formatBalance"

const VERVRS = () => {
  const { account } = useWallet()
  const airdropData = useAirdropData(account)
  const { onAirdropClaim } = useAirdropClaim(account)
  const totalDistributed = getBalanceNumber(airdropData.totalDistributed)
  const toClaim = getBalanceNumber(airdropData.userClaimable)
  const claimed = getBalanceNumber(airdropData.userTotalClaimed)
  const lastClaimAmount = getBalanceNumber(airdropData.userLastClaimedAmount)
  const expectedReturns = new BigNumber(lastClaimAmount).times(52.2).toNumber().toLocaleString('en-us', { maximumFractionDigits: 2 })
  const totalDistributedStr = totalDistributed.toLocaleString('en-us', { maximumFractionDigits: 2 })
  const toClaimStr = toClaim.toLocaleString('en-us', { maximumFractionDigits: 3, minimumFractionDigits: 2 })
  const claimedStr = claimed.toLocaleString('en-us', { maximumFractionDigits: 3 })
  const lastClaimAmountStr = lastClaimAmount.toLocaleString('en-us', { maximumFractionDigits: 0 })
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
      <AirdropContainer>
        <ContentCard style={{ marginBottom: '10px' }}>
          <TypographyTitle style={{ marginTop: '15px', marginBottom: '10px' }}>Accumulate veRVRS and Boost your RVRS Yield</TypographyTitle>
        </ContentCard>
        <Flex justifyContent="center">
          <ContentCard style={{ marginRight: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}>5,560,452</TypographyBold>
            <Typography>Staked RVRS</Typography>
          </ContentCard>
          <ContentCardMain>
            <TypographyBold style={{ marginBottom: '5px' }}>45.34%</TypographyBold>
            <Typography>Base APY</Typography>
          </ContentCardMain>
          <ContentCard style={{ marginLeft: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}>738</TypographyBold>
            <Typography>veRVRS</Typography>
          </ContentCard>
        </Flex>
      </AirdropContainer>
    </Page>
  )
}


export default VERVRS