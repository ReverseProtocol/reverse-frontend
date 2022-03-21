import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'RVRS',
    earnToken: 'RVRS',
    quoteTokenSymbol: QuoteToken.RVRS,
    stakingTokenName: QuoteToken.RVRS,
    stakingTokenAddress: '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE',
    // this is RVRS
    quoteTokenPoolAddress: '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE',
    // this is RVRS
    tokenPoolAddress: '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE',
    contractAddress: {
      1666700000: '0xC9ED8bfb89F5B5ca965AA8cEAacF75576C06211E',
      1666600000: '0xC9ED8bfb89F5B5ca965AA8cEAacF75576C06211E',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://www.tranquil.finance/',
    // TODO - fix below
    harvest: false,
    tokenPerBlock: '0.21',
    sortOrder: 1,
    isFinished: false,
    startBlock: 17996500,
    endBlock: 920000000,
    tokenDecimals: 18,
   },
]

export default pools
