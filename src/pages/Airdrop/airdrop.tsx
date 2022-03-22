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

const Airdrop = () => {
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
          <TypographyTitle style={{ marginTop: '15px', marginBottom: '10px' }}>Claim Your Weekly&nbsp;</TypographyTitle>
          <a target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/the-protocol/reverseum-bonding-pools" className="nav-links">
            <TypographyTitle style={{ marginTop: '15px', marginBottom: '10px', borderBottom: '1px dotted #FFFF' }}>UST Airdrop</TypographyTitle>
          </a>
        </ContentCard>
        <Flex justifyContent="center">
          <ContentCard style={{ marginRight: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}>{totalDistributedStr} UST</TypographyBold>
            <Typography>Total Distributed</Typography>
          </ContentCard>
          <ContentCardMain>
            <TypographyBold style={{ marginBottom: '5px' }}>{expectedReturns} UST</TypographyBold>
            <Typography>Yearly Returns</Typography>
          </ContentCardMain>
          <ContentCard style={{ marginLeft: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}>{claimedStr} UST</TypographyBold>
            {account != null && account.length > 1 ?
              <Typography>Claimed by ({account.substring(0, 5)})</Typography>
              :
              <Typography>&nbsp;</Typography>
            }
          </ContentCard>
        </Flex>
        <Flex justifyContent="space-between" padding="10px" marginTop="20px">
          <Flex flexDirection="column" marginTop="2px">
            <Typography>UST</Typography>
            <TypographyBold style={{ marginLeft: '10px', marginTop: '5px' }}>{toClaimStr}</TypographyBold>
          </Flex>
          {toClaim && toClaim > 0 ?
            <ClaimButton onClick={handleAirdropClaim} disabled={pendingTxn}>
              Claim
            </ClaimButton>
            :
            <ClaimButtonDisabled disabled>
              Claimed
            </ClaimButtonDisabled>
          }
        </Flex>
        <Divider />
      </AirdropContainer>
    </Page>
  )
}


export default Airdrop