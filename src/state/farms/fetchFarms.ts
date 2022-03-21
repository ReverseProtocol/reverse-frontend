import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import farmsConfig from 'config/constants/farms'
import rvrs from 'config/constants/rvrs'
import { QuoteToken } from '../../config/constants/types'


const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchFarms = async () => {
  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpAddress = farmConfig.lpAddresses[CHAIN_ID]
      const calls = [
        // Balance of token in the LP contract
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of quote token on LP contract
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: farmConfig.isTokenOnly ? farmConfig.tokenAddresses[CHAIN_ID] : lpAddress,
          name: 'balanceOf',
          params: [getMasterChefAddress()],
        },
        // Total supply of LP tokens
        {
          address: lpAddress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'decimals',
        },
      ]

      const [
        tokenBalanceLP,
        quoteTokenBlanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals
      ] = await multicall(erc20, calls)

      let tokenAmount;
      let quoteTokenAmount;
      let lpTotalInQuoteToken;
      let tokenPriceVsQuote;
      const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

      // These are for total value calculations later
      const perc1LpOfTotal = new BigNumber(10).pow(18).div(new BigNumber(lpTotalSupply))
      let tokenPerLp = perc1LpOfTotal.times(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals));
      let quoteTokenPerLp = perc1LpOfTotal.times(quoteTokenBlanceLP).div(new BigNumber(10).pow(quoteTokenDecimals));

      if(farmConfig.isTokenOnly){
        tokenAmount = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals));
        quoteTokenAmount = tokenAmount;
        tokenPerLp = new BigNumber(1);
        quoteTokenPerLp = new BigNumber(1);

        if(farmConfig.tokenSymbol === QuoteToken.BUSD && farmConfig.quoteTokenSymbol === QuoteToken.BUSD){
          tokenPriceVsQuote = new BigNumber(1);
        }else{
          tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
        }
        lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote);
      }else{
        // Ratio in % a LP tokens that are in staking, vs the total number in circulation
        // Total value in staking in quote token value
        lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(18))
          .times(new BigNumber(2))
          .times(lpTokenRatio)

        // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
        tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
        quoteTokenAmount = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(10).pow(quoteTokenDecimals)).times(lpTokenRatio)

        if(tokenAmount.comparedTo(0) > 0){
          tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount);
        }else{
          tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
        }
      }

      const [info, totalAllocPoint, vikingPerBlock] = await multicall(masterchefABI, [
        {
          address: getMasterChefAddress(),
          name: 'poolInfo',
          params: [farmConfig.pid],
        },
        {
          address: getMasterChefAddress(),
          name: 'totalAllocPoint',
        },
        {
          address: getMasterChefAddress(),
          name: rvrs.strings.xPerBlock,
        },
      ])

      const allocPoint = new BigNumber(info.allocPoint._hex)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...farmConfig,
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
        poolWeight: poolWeight.toNumber(),
        multiplier: `${allocPoint.div(100).toString()}X`,
        depositFeeBP: info.depositFeeBP,
        vikingPerBlock: new BigNumber(vikingPerBlock).toNumber(),
        tokenPerLp: tokenPerLp.toJSON(),
        quoteTokenPerLp: quoteTokenPerLp.toJSON(),
      }
    }),
  )
  return data
}

export default fetchFarms
