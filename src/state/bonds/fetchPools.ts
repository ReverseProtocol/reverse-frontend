import poolsConfig2 from 'config/constants/bonds'
import sousChefABI from 'config/abi/sousChefBurn.json'
import cakeABI from 'config/abi/cake.json'
import wbnbABI from 'config/abi/weth.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getWbnbAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig2.filter((p) => p.isFinished !== false)
  const callsStartBlock = poolsWithEnd.map((pool2Config) => {
    return {
      address: pool2Config.contractAddress[CHAIN_ID],
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((pool2Config) => {
    return {
      address: pool2Config.contractAddress[CHAIN_ID],
      name: 'endBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((cakepoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: cakepoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsQuoteTokenPerLp = async () => {
  const nonBnbPools = poolsConfig2.filter((p) => p.stakingTokenName !== QuoteToken.BNB)

  const quoteTokenAmountCalls = nonBnbPools.map((pool2Config) => {
    return {
      address: pool2Config.quoteTokenPoolAddress,
      name: 'balanceOf',
      params: [pool2Config.stakingTokenAddress],
    }
  })
  const tokenAmountCalls = nonBnbPools.map((pool2Config) => {
    return {
      address: pool2Config.tokenPoolAddress,
      name: 'balanceOf',
      params: [pool2Config.stakingTokenAddress],
    }
  })
  const callsTotalSupply = nonBnbPools.map((pool2Config) => {
    return {
      address: pool2Config.stakingTokenAddress,
      name: 'totalSupply',
      params: [],
    }
  })

  const quoteTokenAmounts = await multicall(cakeABI, quoteTokenAmountCalls)
  const tokenAmounts = await multicall(cakeABI, tokenAmountCalls)
  const totalSupplys = await multicall(cakeABI, callsTotalSupply)

  return [
    ...nonBnbPools.map((p, index) => ({
      sousId: p.sousId,
      quoteTokenPerLp: new BigNumber(quoteTokenAmounts[index]).div(totalSupplys[index]).toJSON(),
      quoteTokenAmount: new BigNumber(quoteTokenAmounts[index]),
      tokenAmount: new BigNumber(tokenAmounts[index]),
      tokenPriceVsQuote: new BigNumber(quoteTokenAmounts[index]).div(tokenAmounts[index]),
    })),
  ]
}


export const fetchPoolsTotalStatking = async () => {
  const nonBnbPools = poolsConfig2.filter((p) => p.stakingTokenName !== QuoteToken.BNB)
  const bnbPool = poolsConfig2.filter((p) => p.stakingTokenName === QuoteToken.BNB)

  const callsNonBnbPools = nonBnbPools.map((pool2Config) => {
    return {
      address: pool2Config.contractAddress[CHAIN_ID],
      name: 'stakedBondTokens',
      params: [],
    }
  })

  const callsBnbPools = bnbPool.map((pool2Config) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [pool2Config.contractAddress[CHAIN_ID]],
    }
  })

  const nonBnbPoolsTotalStaked = await multicall(sousChefABI, callsNonBnbPools)
  const bnbPoolsTotalStaked = await multicall(wbnbABI, callsBnbPools)

  return [
    ...nonBnbPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
    })),
    ...bnbPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}
