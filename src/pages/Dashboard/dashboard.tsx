import React, { useCallback, useState } from 'react'
import Page from 'components/layout/containers/page'
import { Flex } from '@pancakeswap-libs/uikit'
import { useWallet } from "@binance-chain/bsc-use-wallet"
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import { Skeleton } from 'components/Skeleton'
import DashboardContainer from 'components/layout/containers/airdropContainer'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { FaAward } from 'react-icons/fa';
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { getBalanceNumber } from "../../utils/formatBalance"


const ContentCard = styled(Container)`
  background-image: linear-gradient(to right, #333B4C, #37404E);
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  position: center;
  text-align: center;
  padding: 15px;
`

const TierCard = styled(Container)`
  background-image: linear-gradient(to right, #353E50, #3D4853);
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  position: center;
  text-align: center;
  padding: 15px;
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

  // wallet balance rvrs/vervrs
  const rvrsBalanceNo = getBalanceNumber(useTokenBalance(getCakeAddress()));
  const rvrsBalanceStr = rvrsBalanceNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  return (
    <Page>
      <DashboardContainer>
        <TitleCard style={{ marginBottom: '10px', marginTop: '0px' }}>
          <TypographyTitle style={{ marginTop: '15px', marginBottom: '15px' }}>
            <div>{account.substring(0, 10)}&nbsp;</div>
            <div>| Statistics</div>
          </TypographyTitle>
        </TitleCard>
        <Flex justifyContent="center">
          <ContentCard style={{ marginRight: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
            <Typography>veRVRS Balance</Typography>
          </ContentCard>
          <TierCard style={{ marginRight: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}>Current Tier</TypographyBold>
            <Typography>Silver Reversor <FaAward /></Typography>
          </TierCard>
          <ContentCard>
            <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
            <Typography>RVRS Balance</Typography>
          </ContentCard>
        </Flex>
        <Flex justifyContent="center" marginTop="10px">
          <ContentCard style={{ marginRight: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
            <Typography>veRVRS Cap</Typography>
          </ContentCard>
          <ContentCard style={{ marginRight: '7px' }} >
            <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
            <Typography>To Reach Cap</Typography>
          </ContentCard>
          <ContentCard >
            <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
            <Typography>Staked RVRS</Typography>
          </ContentCard>
        </Flex>
        <Flex justifyContent="center" marginTop="10px">
          <ContentCard style={{ marginRight: '7px' }}>
            <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
            <Typography>Expected Yearly Returns</Typography>
          </ContentCard>
          <ContentCard>
            <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
            <Typography>Treasury Balance</Typography>
          </ContentCard>
        </Flex>
        <Flex justifyContent="center" marginTop="10px">
          <ContentCard>
            <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
            <Typography>RVRS Per $1 Worth of Treasury</Typography>
          </ContentCard>
        </Flex>
      </DashboardContainer>
    </Page>
  )
}

export default Dashboard