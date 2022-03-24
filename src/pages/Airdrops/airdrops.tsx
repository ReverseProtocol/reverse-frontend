import React, { useCallback, useState } from 'react'
import Page from 'components/layout/containers/page'
import { Flex } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useWallet } from "@binance-chain/bsc-use-wallet"
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import { Skeleton } from 'components/Skeleton'
import AirdropContainer from 'components/layout/containers/airdropContainer'
import ContentCard from 'components/layout/cards/airdrop/contentCard'
import TitleCard from 'components/layout/cards/airdrop/titleCard'
import ContentCardMain from 'components/layout/cards/airdrop/contentCardMain'
import Ripples, { createRipples } from 'react-ripples'
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

  const expectedReturnsNo = new BigNumber(lastClaimAmount).times(52.2).toNumber()
  const expectedReturnsStr = expectedReturnsNo.toLocaleString('en-us', { maximumFractionDigits: 2 })

  const totalDistributedNo = totalDistributed;
  const totalDistributedStr = totalDistributed.toLocaleString('en-us', { maximumFractionDigits: 2 });

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
        <TitleCard style={{ marginBottom: '10px' }}>
          <TypographyTitle>Claim Your Weekly&nbsp;</TypographyTitle>
          <a target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/the-protocol/reverseum-bonding-pools" className="nav-links">
            <TypographyTitle style={{ marginTop: '15px', marginBottom: '15px', borderBottom: '1px dotted #FFFF' }}>UST Airdrop</TypographyTitle>
          </a>
        </TitleCard>
        <Flex justifyContent="center">
          <ContentCard style={{ marginRight: '7px' }}>
            {totalDistributedNo > 10 ?
              <TypographyBold style={{ marginBottom: '5px' }}>${totalDistributedStr}</TypographyBold>
              :
              <Typography><Skeleton height={20} marginBottom="5px" /></Typography>
            }
            <Typography>Total Distributed</Typography>
          </ContentCard>
          <ContentCardMain>
            {expectedReturnsNo > 1 ?
              <TypographyBold style={{ marginBottom: '5px' }}>{expectedReturnsStr} UST</TypographyBold>
              :
              <Typography><Skeleton height={20} marginBottom="5px" /></Typography>
            }
            <Typography>Yearly Returns</Typography>
          </ContentCardMain>
          <ContentCard style={{ marginLeft: '7px' }}>
            {account != null && account.length > 1 ?
              <div>
                <TypographyBold style={{ marginBottom: '5px' }}>{claimedStr} UST</TypographyBold>
                <Typography>Claimed by ({account.substring(0, 5)})</Typography>
              </div>
              :
              <div>
                <Typography><Skeleton /></Typography>
                <Typography><Skeleton marginTop="5px" /></Typography>
              </div>
            }
          </ContentCard>
        </Flex>
        <Flex justifyContent="space-between" padding="10px" marginTop="20px">
          <Flex flexDirection="column" marginTop="2px">
            <Typography>UST</Typography>
            <TypographyBold style={{ marginLeft: '10px', marginTop: '5px' }}>{toClaimStr}</TypographyBold>
          </Flex>
          {toClaim && toClaim > 0 ?
            <div
              style={{
                display: 'inline-flex',
                borderRadius: 15,
                overflow: 'hidden',
              }}
            >
              <Ripples>
                <ClaimButton onClick={handleAirdropClaim} disabled={pendingTxn}>
                  Collect
                </ClaimButton>
              </Ripples>
            </div>
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