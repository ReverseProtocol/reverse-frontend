import { AbiItem } from 'web3-utils'
import poolsConfig from 'config/constants/stake'
import masterChefABI from 'config/abi/masterchef.json'
import autorvrsAbi from 'config/abi/autorvrs.json'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import {getAutoRvrsAddress, getCakeAddress, getMasterChefAddress, getRvrsAddress} from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.BNB)
const web3 = getWeb3()
const masterChefContract = new web3.eth.Contract((masterChefABI as unknown) as AbiItem, getMasterChefAddress())

export const fetchPoolsAllowance = async (account) => {
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'allowance',
    params: [account, p.contractAddress[CHAIN_ID]],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserStakeBalances = async account => {
  const calls = [
    {
      address: getAutoRvrsAddress(),
      name: 'wantLockedTotal',
      params: [account]
    }
  ];
  const stakedTokenBalancesRaw = await multicall(autorvrsAbi, calls);

  return stakedTokenBalancesRaw;
};

export const fetchUserBalances = async account => {
  const calls = [
    {
      address: getRvrsAddress(),
      name: 'balanceOf',
      params: [account]
    }
  ];
  const tokenBalancesRaw = await multicall(erc20ABI, calls);

  return tokenBalancesRaw;
};