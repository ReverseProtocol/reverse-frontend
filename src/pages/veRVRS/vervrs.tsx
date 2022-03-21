import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Page from 'components/layout/containers/page'
import { Flex } from '@pancakeswap-libs/uikit'
import { useWallet } from "@binance-chain/bsc-use-wallet"
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import VeRvrsContainer from 'components/layout/containers/veRvrsContainer'
import ContentCard from 'components/layout/cards/vervrs/contentCard'
import ContentCardMain from 'components/layout/cards/vervrs/contentCardMain'

const VERVRS = () => {
  const { account } = useWallet()

  return (
    <Page>
      <VeRvrsContainer>
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
      </VeRvrsContainer>
    </Page>
  )
}


export default VERVRS