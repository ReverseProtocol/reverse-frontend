export type IfoStatus = 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive?: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  endDate?: string
  endTime?: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  releaseBlockNumber: number
  isActive2?: boolean
}

export interface MoneyWheelBet {
  val1: string
  val3: string
  val5: string
  val10: string
  val20: string
  val50: string
}

export interface MoneyWheel2Bet {
  val1: string
  val3: string
  val5: string
  val10: string
  val20: string
  val50: string
}

export enum QuoteToken {
  'BNB' = 'BNB',
  'CAKE' = 'CAKE',
  'SYRUP' = 'SYRUP',
  'BUSD' = 'BUSD',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'GYA' = 'GYA',
  'DSL' = 'DSL',
  'WONE' = 'WONE',
  'MIS' = 'MIS',
  'ONEETH' = 'ONEETH',
  'ONE' = 'ONE',
  'MISONE' = 'MIS-ONE',
  'MISTRANQ' = 'MIS-TRANQ',
  'MISXYA' = 'MIS-XYA',
  'TRANQ' = 'TRANQ',
  'XYA' = 'XYA',
  'COSMIC' = 'COSMIC',
  'MISMAGIC' = 'MIS-MAGIC',
  'MAGIC' = 'MAGIC',
  'MISLBLOX' = 'MIS-LBLOX',
  'LBLOX' = 'LBLOX',
  'MISCOINK' = 'MIS-COINK',
  'TROLL' = 'TROLL',
  'MISTROLL' = 'MIS-TROLL',
  'MISLUNA' = 'MIS-LUNA',
  'LUNA' = 'LUNA',
  'TRANQB' = 'TRANQB',
  'JEWEL' = 'JEWEL',
  'MISKURO' = 'MIS-KURO',
  'KURO' = 'KURO',
  'SONIC' = 'SONIC',
  'MISSONIC' = 'MIS-SONIC',
  'RVRS' = 'RVRS',
  'ONERVRS' = 'ONE-RVRS',
  'USTRVRS' = 'UST-RVRS',
  'ETHRVRS' = 'ETH-RVRS',
  'USDCRVRS' = 'USDC-RVRS'
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export enum Pool2Category {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  1666700000?: string
  1666600000: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  multiplier?: string
  isTokenOnly?: boolean
  isCommunity?: boolean
  version?: number
  risk: number
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface CoinPriceConfig {
  value?: number
}

export interface PoolConfig {
  sousId?: number
  image?: string
  tokenName: string
  quoteTokenSymbol: QuoteToken
  stakingTokenName: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: string
  tokenPoolAddress?: string
  quoteTokenPoolAddress?: string
  contractAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  tokenPerBlock: string
  startBlock?: number
  endBlock?: number
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
  earnToken?: string
}

export interface Pool2Config {
  sousId?: number
  image?: string
  tokenName: string
  quoteTokenSymbol?: QuoteToken
  stakingTokenName?: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: string
  tokenPoolAddress?: string
  quoteTokenPoolAddress?: string
  contractAddress?: Address
  poolCategory?: PoolCategory
  projectLink?: string
  tokenPerBlock?: string
  startBlock?: number
  endBlock?: number
  sortOrder?: number
  isSingleAsset?: boolean
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
  isDepositFinished?: boolean
  lockBlock?: number
  notFinished?: boolean
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type Nft = {
  name: string
  description: string
  images: NftImages
  sortOrder: number
  bunnyId: number
  video?: NftVideo
}
