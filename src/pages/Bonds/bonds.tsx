import React, { useState } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import { Container } from 'react-bootstrap'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import {useFarms, usePriceBnbBusd, usePools2, usePrices, getTotalValueFromQuoteTokens, lookupPrice} from 'state/hooks'
import { QuoteToken, Pool2Category } from 'config/constants/types'
import Page from 'components/layout/page'
import styled from 'styled-components'
import PoolCard from './card'

const Bond: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const pools2 = usePools2(account)
  const prices = usePrices()
  const block = useBlock()
  const poolsWithApy = pools2.map((pool2) => {
    let quoteTokens = new BigNumber(pool2.quoteTokenPerLp).times(pool2.totalStaked).div(new BigNumber(10).pow(18))
    if (pool2.isSingleAsset) {quoteTokens = new BigNumber(pool2.totalStaked).div(new BigNumber(10).pow(18)).div(2)}
    const tvl = getTotalValueFromQuoteTokens(quoteTokens, pool2.quoteTokenSymbol, prices)
    // console.log(pool2.sousId, quoteTokens && quoteTokens.toNumber(), tvl && tvl.toNumber())
    // console.log("APY", pool2, tvl && tvl.toNumber())
    const rewardTokenPrice = lookupPrice(QuoteToken.RVRS, prices)
    // console.log("price", pool2.tokenName, rewardTokenPrice && rewardTokenPrice.toNumber())
    const totalRewardPricePerYear = rewardTokenPrice.times(pool2.tokenPerBlock).times(BLOCKS_PER_YEAR)
    // const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool2.totalStaked))
    const apy = totalRewardPricePerYear.div(tvl).times(100)
    // console.log("TVL", pool2.stakingTokenName, tvl && tvl.toNumber(), apy && apy.toNumber())
    return {...pool2, isFinished: pool2.sousId === 0 ? false : pool2.isFinished && block > pool2.endBlock, apy, tvl }
  })
  const [finishedPools, openPools] = partition(poolsWithApy, (pool2) => pool2.isFinished)
  const { url, isExact } = useRouteMatch()
  const [modalOpen, setModalOpen] = useState(true)
  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }

  return (
    <Page>
      <Route exact path={`${path}`}>
        {orderBy(openPools, ['sortOrder']).map((pool2) => (<PoolCard key={pool2.sousId} pool2={pool2}/>))}
      </Route>
      <Route path={`${path}/inactive`}>
        {orderBy(finishedPools, ['sortOrder']).map((pool2) => (<PoolCard key={pool2.sousId} pool2={pool2}/>))}
      </Route>

      <ButtonContainer>
        <ActiveInactiveButton as={Link} className="nav-links" to={`${url}`}
          style={{
            justifyContent: 'center',
            marginRight: '18px'
          }}> Active
        </ActiveInactiveButton>
        <ActiveInactiveButton as={Link} className="nav-links" to={`${url}/inactive`}
          style={{
            justifyContent: 'center'
          }}> Inactive
        </ActiveInactiveButton>
      </ButtonContainer>
    </Page>
  )
}

const ActiveInactiveButton = styled.div`
  -webkit-box-align: center;
  align-items: center;
  border-radius: 10px;
  color: #FFFF;
  font-size: 16px;
  font-weight: 600;
  display: inline-flex;
  padding: 12px;
  `

const ButtonContainer = styled(Container)`
  text-align: center;
  justify-content: center;
  border: 1px;
  margin-top: 35px;
  border-style: solid !important;
  border-color: #CBCBCB !important;
  border-radius: 30px;
  max-width: 220px;
  background-color: #2D3544;
`

export default Bond


