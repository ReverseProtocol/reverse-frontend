import React from 'react'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useFarms,
  usePriceBnbBusd,
  usePools,
  usePrices,
  getTotalValueFromQuoteTokens,
  lookupPrice, useFarmFromPid,
} from 'state/hooks'
import Page from 'components/layout/containers/page'
import PoolCard from './components/PoolCard'

const Title = styled.p`
  font-size: 1.1em;
  margin-bottom: 40px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  color: #2E2E2E;

`

const Feature = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 19px;
  font-size: 1.1em !important;
  max-width: 180px;
  text-align: center;


  @media screen and (max-width: 680px){
    max-width: 64%;
    flex-flow: row;
    align-items: flex-start;
    & > svg{
      width: 42px;
    }
    & > p{
      text-align: left;
      margin-left: 15px;
    }
  
`
const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  @media all and (max-width: 480px) {
      flex-flow: column;
  }
  
  
`


const Blablabla = styled.div`
  text-color: red;
  margin: 0px 18px;
  margin-bottom: 50px;
`
const GuideLink = styled.span`
  color: #0073ff;
`
const Divider = styled.div`
  background-color: #1E2129;
  height: 3px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 20%;
`

const SvgHero = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;

  justify-content: center;
  padding: 42px 12px;

  @media all and (max-width: 1350px) { 
    max-width: 100%;
  }
`

export const aprToApy = (apr: number): BigNumber => {
  const cmpd = 1000;
  const apy = new BigNumber(apr).div(100).div(365).plus(1).pow(365).minus(1).times(100);

  return apy.isNaN() || !apy.isFinite() ? null : apy;
};

export const BIG_TEN = new BigNumber(10);


const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const farm0 = useFarmFromPid(0);
  const pools = usePools(account)
  const prices = usePrices()
  const block = useBlock()

  const poolsWithApy = pools.map((pool) => {

    const quoteTokens = pool.totalStaked ?
      new BigNumber(pool.totalStaked.toString()).div(2).div(BIG_TEN.pow(18)) :
      new BigNumber(0)
    const tvl = getTotalValueFromQuoteTokens(quoteTokens, pool.quoteTokenSymbol, prices)

    const reverseAtlastUserAction = pool.userData ?
      new BigNumber(pool.userData.reverseAtlastUserAction) :
      new BigNumber(0)

    const lastDepositedTime = pool.userData ?
      new BigNumber(pool.userData.lastDepositedTime) :
      new BigNumber(0)

    const lastUserActionTime = pool.userData ?
      new BigNumber(pool.userData.lastUserActionTime) :
      new BigNumber(0)

    // console.log("APY", pool, tvl && tvl.toNumber())
    const rewardTokenPrice = lookupPrice(pool.tokenName, prices)
    // console.log("price", pool.tokenName, rewardTokenPrice && rewardTokenPrice.toNumber())

    const totalRewardPricePerYear = rewardTokenPrice.times(farm0.vikingPerBlock).div(BIG_TEN.pow(18)).times(farm0.poolWeight).times(BLOCKS_PER_YEAR)
    // const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    const apr = totalRewardPricePerYear.div(tvl).times(100).times(2)
    const apy = aprToApy(apr)
    // console.log("TVL", pool.stakingTokenName, tvl && tvl.toNumber(), apy && apy.toNumber())

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apr,
      apy,
      tvl,
      lastDepositedTime,
      lastUserActionTime,
      reverseAtlastUserAction
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()
  console.log(poolsWithApy)

  return (
    <Page>
        <Route exact path={`${path}`}>
          <>
            {orderBy(openPools, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.sousId} pool={pool} />
            ))}
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
    </Page>
  )
}

export default Farm
