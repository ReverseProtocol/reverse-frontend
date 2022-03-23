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
import Divider from 'components/divider'
import ClaimButtonDisabled from 'components/layout/buttons/claimAirdropButtonDisabled'
import ClaimButton from 'components/layout/buttons/claimAirdropButton'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { FaAward } from 'react-icons/fa';
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import { useAirdropData } from "../../state/hooks"
import useAirdropClaim from "../../hooks/useAirdropClaim"
import { getBalanceNumber } from "../../utils/formatBalance"


const ContentCard = styled(Container)`
  background-image: linear-gradient(to right, #333B4C, #37404E);
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  position: center;
  text-align: center;
  padding: 20px;
`

const TierCard = styled(Container)`
  background-image: linear-gradient(to right, #353E50, #3D4853);
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  position: center;
  text-align: center;
  padding: 20px;
  border: 2px;
  border-style: solid !important;
  border-color: #808080 !important;
`

const TitleCard = styled(Container)`
  background-image: linear-gradient(to right, #353E50, #3D4853);
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  position: center;
  text-align: center;
  padding: 20px;
  
`

const Dashboard = () => {
  const { account } = useWallet()
  const airdropData = useAirdropData(account)
  const { onAirdropClaim } = useAirdropClaim(account)
  const totalDistributed = getBalanceNumber(airdropData.totalDistributed)
  const toClaim = getBalanceNumber(airdropData.userClaimable)
  const claimed = getBalanceNumber(airdropData.userTotalClaimed)
  const lastClaimAmount = getBalanceNumber(airdropData.userLastClaimedAmount)
  const rvrsBalance = getBalanceNumber(useTokenBalance(getCakeAddress()));
  const rvrsBalanceStr = rvrsBalance.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

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

        <TitleCard style={{ marginBottom: '10px', marginTop:'0px' }}>
          <TypographyTitle style={{ marginTop: '15px', marginBottom: '15px' }}>
            <div>{account.substring(0, 10)}&nbsp;</div>
            <div>| User Statistics</div>
          </TypographyTitle>
        </TitleCard>

        <Flex justifyContent="center">

          <ContentCard style={{ marginRight: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}>0.00</TypographyBold>
            <Typography>veRVRS Balance</Typography>
          </ContentCard>

          <TierCard style={{ marginRight: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}>Current Tier</TypographyBold>
            <Typography>Silver Reversor <FaAward /></Typography>
          </TierCard>

          <ContentCard>
            <TypographyBold style={{ marginBottom: '5px' }}>{rvrsBalanceStr}</TypographyBold>
            <Typography>RVRS Balance</Typography>
          </ContentCard>

        </Flex>

        <Flex justifyContent="center" marginTop="10px">

          <ContentCard style={{ marginRight: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}>0.00</TypographyBold>
            <Typography>veRVRS Cap</Typography>
          </ContentCard>

          <ContentCard style={{ marginRight: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}>0.00</TypographyBold>
            <Typography>Staked RVRS</Typography>
          </ContentCard>

          <ContentCard>
            <TypographyBold style={{ marginBottom: '5px' }}>$46.29</TypographyBold>
            <Typography>Last UST Airdrop</Typography>
          </ContentCard>

        </Flex>

      </AirdropContainer>
    </Page>
  )
}



export default Dashboard