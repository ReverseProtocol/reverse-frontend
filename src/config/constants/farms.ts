import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'RVRS',
    lpAddresses: contracts.rvrs,
    tokenSymbol: 'ONE',
    tokenAddresses: contracts.one,
    quoteTokenSymbol: QuoteToken.RVRS,
    quoteTokenAdresses: contracts.rvrs,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'RVRS & ONE',
    lpAddresses: {
      1666700000: '0xCDe0A00302CF22B3Ac367201FBD114cEFA1729b4',
      1666600000: '0xCDe0A00302CF22B3Ac367201FBD114cEFA1729b4',
    },
    tokenSymbol: 'ONE',
    tokenAddresses: contracts.one,
    quoteTokenSymbol: QuoteToken.RVRS,
    quoteTokenAdresses: contracts.rvrs,
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'ONE & UST',
    lpAddresses: {
      1666700000: '0x61356C852632813f3d71D57559B06cdFf70E538B',
      1666600000: '0x61356C852632813f3d71D57559B06cdFf70E538B',
    },
    tokenSymbol: 'ONE',
    tokenAddresses: contracts.one,
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
  },
  {
    pid: 3,
    risk: 5,
    lpSymbol: 'UST & RVRS',
    lpAddresses: {
      1666700000: '0xF8838fcC026d8e1F40207AcF5ec1DA0341c37fe2',
      1666600000: '0xF8838fcC026d8e1F40207AcF5ec1DA0341c37fe2',
    },
    tokenSymbol: 'RVRS',
    tokenAddresses: contracts.rvrs,
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
  }
]

export default farms
