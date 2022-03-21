import BigNumber from 'bignumber.js'
import {useEffect} from 'react'
import rvrs from 'config/constants/rvrs'
import {useDispatch, useSelector} from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import {
  fetchFarmsPublicDataAsync,
  fetchPools2PublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchPools2UserDataAsync, fetchAirdropUserDataAsync
} from './actions'
import {Airdrop, Farm, Pool, Pool2, State, State2} from './types'
import {QuoteToken} from '../config/constants/types'

const ZERO = new BigNumber(0)
const TEN_POW_18 = new BigNumber(10).pow(18)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
    dispatch(fetchPools2PublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const usePoolsPublic = (): Pool[] => {
  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolsPublic2 = (): Pool2[] => {
  const pools2 = useSelector((state: State) => state.pools2.data)
  return pools2
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}


export const useFarmTokensToUsd = (pid, farmTokens) => {
  // farmTokens is the # of LP tokens, or just the number of tokens for single staking pools
  // All price logic should go here for farms
  const farm = useFarmFromPid(pid)
  const prices = usePrices()
  const quoteTokenAmount = new BigNumber(farm.quoteTokenPerLp).times(farmTokens)
  return getTotalValueFromQuoteTokens(quoteTokenAmount, farm.quoteTokenSymbol, prices)
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}


// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePools2 = (account): Pool2[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPools2UserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools2 = useSelector((state: State) => state.pools2.data)
  return pools2
}

export const useAirdropData = (account): Airdrop => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchAirdropUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  return useSelector((state: State) => state.airdrop.data)
}

export const usePool2FromPid = (sousId): Pool2 => {
  const pool2 = useSelector((state: State) => state.pools2.data.find((p) => p.sousId === sousId))
  return pool2
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Prices

export const usePriceBnbBusd = (): BigNumber => {
  const pid = rvrs.pids.pidBnbBusd // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}



// export const fetchrvrsPrice = (): BigNumber => {
//   const query = `
//   {ethereum(network: bsc){
//     address(address: {is: "0xbf9a298a948079bed1e0902e78c61b1b30f58e7e"}){
//     balances {
//     currency {
//     symbol
//     }
//     value
//     }}
//     }}
// `;
// const url = "https://graphql.bitquery.io/";
// const opts = {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         query
//     })
// };

// fetch(url, opts)
//   .then(response => response.json())
//   .then(json => {
//     if (process.env.REACT_APP_DEBUG === "true") console.log(json.data.ethereum.address[0].balances);
//   })
//   .catch(console.error);

//   return new BigNumber(3);
// }


export const usePriceCakeBusd = (): BigNumber => {
  const pid = 3;
  const farm = useFarmFromPid(pid);
  return new BigNumber(farm.tokenPriceVsQuote);
}

export const usePrices = () => {
  const misPrice = usePriceCakeBusd()
  const onePrice = usePriceBnbBusd()


  return [
      {name: QuoteToken.MIS, price: misPrice},
      {name: QuoteToken.RVRS, price: misPrice},
      {name: QuoteToken.CAKE, price: misPrice},
      {name: QuoteToken.ONE, price: onePrice},
  ]
}

export const lookupPrice = (tokenName, prices) => {
  // lookup a specific price from usePrices output
  const tokenPrice = prices.find(f => f.name === tokenName)
  if (tokenPrice) {
    return tokenPrice.price
  }
  console.log('prices', prices)
  console.log("ERROR: No price found for", tokenName)
  return new BigNumber(0)
}


export const getTotalValueFromQuoteTokens = (quoteTokenAmount, quoteToken, prices) => {
  // WARNING: Needs to be updated for single-staking pools
  // First handle all stable-coins
  if (quoteToken === QuoteToken.UST || quoteToken === QuoteToken.BUSD) {
    return new BigNumber(2).times(quoteTokenAmount)
  }
  if (quoteToken === QuoteToken.JEWEL) {
    return new BigNumber(28).times(quoteTokenAmount)
  }
  if (quoteToken === QuoteToken.ONE) {
    const price = lookupPrice(QuoteToken.ONE, prices)
    return new BigNumber(2).times(quoteTokenAmount).times(price)
  }
  if (quoteToken === QuoteToken.RVRS) {
    const price = lookupPrice(QuoteToken.RVRS, prices)
    return new BigNumber(2).times(quoteTokenAmount).times(price)
  }
  console.log("ERROR: NO PRICE FOUND FOR QuoteToken:", quoteToken)
  return new BigNumber(0)
}


export const useTotalValue = (): BigNumber => {
  const farms = useFarms();
  const prices = usePrices();
  const pools = usePoolsPublic()
  const pools2 = usePoolsPublic2()

  let value = new BigNumber(0);
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]
    if (farm.lpTotalInQuoteToken) {
      let val = new BigNumber(0);
      val = getTotalValueFromQuoteTokens(farm.quoteTokenAmount, farm.quoteTokenSymbol, prices)
      // console.log("useTotalValue", farm.pid, val && val.toNumber(), farm)
      value = value.plus(val);
    }
  }
  
  // Do incubator pools
  for (let i = 0; i < pools.length; i++) {
    const pool = pools[i]

    const quoteTokens = new BigNumber(pool.quoteTokenPerLp).times(pool.totalStaked).div(new BigNumber(10).pow(18))
    const val = getTotalValueFromQuoteTokens(quoteTokens, pool.quoteTokenSymbol, prices)

    if (val) {
      // console.log("useTotalValue", farm.pid, val && val.toNumber(), farm)
      value = value.plus(val);
    }

  }

   // Do burn pools
  for (let i = 0; i < pools2.length; i++) {
    const pool2 = pools2[i]

    const quoteTokens = new BigNumber(pool2.quoteTokenPerLp).times(pool2.totalStaked).div(new BigNumber(10).pow(18))
    const val = getTotalValueFromQuoteTokens(quoteTokens.div(2), pool2.quoteTokenSymbol, prices)

    if (val && !pool2.isFinished) {
      // console.log("useTotalValue", farm.pid, val && val.toNumber(), farm)
      value = value.plus(val);
    }

  }

  return value;
}