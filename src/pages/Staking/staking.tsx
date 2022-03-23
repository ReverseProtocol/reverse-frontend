import React from 'react'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useBlock from 'hooks/useBlock'
import { usePools, usePrices, getTotalValueFromQuoteTokens, lookupPrice, useFarmFromPid, } from 'state/hooks'
import Page from 'components/layout/containers/page'
import PoolCard from './card'

export const aprToApy = (apr: number): BigNumber => {
  const apy = new BigNumber(apr).div(100).div(365).plus(1).pow(365).minus(1).times(100);
  return apy.isNaN() || !apy.isFinite() ? null : apy;
};
export const BIG_TEN = new BigNumber(10);

const Staking: React.FC = () => {
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
    const rewardTokenPrice = lookupPrice(pool.tokenName, prices)
    const totalRewardPricePerYear = rewardTokenPrice.times(farm0.vikingPerBlock).div(BIG_TEN.pow(18)).times(farm0.poolWeight).times(BLOCKS_PER_YEAR)
    const apr = totalRewardPricePerYear.div(tvl).times(100).times(2)
    const apy = aprToApy(apr)
    // console.log("TVL", pool.stakingTokenName, tvl && tvl.toNumber(), apy && apy.toNumber())
    // console.log("APY", pool, tvl && tvl.toNumber())
    // const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    // console.log("price", pool.tokenName, rewardTokenPrice && rewardTokenPrice.toNumber())

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apr, apy, tvl, lastDepositedTime, lastUserActionTime, reverseAtlastUserAction
    }

  })
  
  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)
  const { url, isExact } = useRouteMatch()
  // console.log(poolsWithApy)

  return (
    <Page>
      <Route exact path={`${path}`}>
        {orderBy(openPools, ['sortOrder']).map((pool) => (<PoolCard key={pool.sousId} pool={pool} />))}
      </Route>
      <Route path={`${path}/history`}>
        {orderBy(finishedPools, ['sortOrder']).map((pool) => (<PoolCard key={pool.sousId} pool={pool} />))}
      </Route>
    </Page>
  )
}

export default Staking
