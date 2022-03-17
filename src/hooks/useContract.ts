import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import {
  getMasterChefAddress,
  getCakeAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getWheelAddress,
  getWbnbAddress,
  getWheel2Address,
  getSousChefAddress,
  getAutoRvrsAddress,
  getAirdropAddress
} from 'utils/addressHelpers'
import { pools2Config, poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import ifo from 'config/abi/ifo.json'
import erc20 from 'config/abi/erc20.json'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
import devFeeProcessor from 'config/abi/devFeeProcessor.json'
import nftSale from 'config/abi/nftSale.json'
import pancakeRabbits from 'config/abi/pancakeRabbits.json'
import lottery from 'config/abi/lottery.json'
import wheel from 'config/abi/wheel.json'
import lotteryTicket from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import autoRvrs from 'config/abi/autorvrs.json'
import RewardClaim from 'config/abi/RewardClaim.json'
import sousChefBurn from 'config/abi/sousChefBurn.json'
import sousChefBurn2 from 'config/abi/sousChefBurn2.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const ifoAbi = (ifo as unknown) as AbiItem
  return useContract(ifoAbi, address)
}

export const useERC20 = (address: string) => {
  const erc20Abi = (erc20 as unknown) as AbiItem
  return useContract(erc20Abi, address)
}

export const useCake = () => {
  return useERC20(getCakeAddress())
}

export const useWone = () => {
  return useERC20(getWbnbAddress())
}

export const useRabbitMintingFarm = (address: string) => {
  const rabbitMintingFarmAbi = (rabbitmintingfarm as unknown) as AbiItem
  return useContract(rabbitMintingFarmAbi, address)
}

export const useDevFeeProcessorContract = (address: string) => {
  const rabbitMintingFarmAbi = (devFeeProcessor as unknown) as AbiItem
  return useContract(rabbitMintingFarmAbi, address)
}

export const useNftSaleContract = (address: string) => {
  const nftSaleAbi = (nftSale as unknown) as AbiItem
  return useContract(nftSaleAbi, address)
}

export const usePancakeRabbits = (address: string) => {
  const pancakeRabbitsAbi = (pancakeRabbits as unknown) as AbiItem
  return useContract(pancakeRabbitsAbi, address)
}

export const useLottery = () => {
  const abi = (lottery as unknown) as AbiItem
  return useContract(abi, getLotteryAddress())
}

export const useMoneyWheel = () => {
  const abi = (wheel as unknown) as AbiItem
  return useContract(abi, getWheelAddress())
}

export const useMoneyWheel2 = () => {
  const abi = (wheel as unknown) as AbiItem
  return useContract(abi, getWheel2Address())
}

export const useLotteryTicket = () => {
  const abi = (lotteryTicket as unknown) as AbiItem
  return useContract(abi, getLotteryTicketAddress())
}

export const useMasterchef = () => {
  const abi = (masterChef as unknown) as AbiItem
  return useContract(abi, getMasterChefAddress())
}

export const useAirdropContract = () => {
  const abi = (RewardClaim as unknown) as AbiItem
  return useContract(abi, getAirdropAddress())
}

export const useAutoRvrs = () => {
  const abi = (autoRvrs as unknown) as AbiItem
  return useContract(abi, getAutoRvrsAddress())
}

export const useSousChefBurn = (id) => {
  const config = pools2Config.find((pool) => pool.sousId === id)
  let rawAbi = sousChefBurn
  if (id > 3) {
    rawAbi = sousChefBurn2
  }
  const abi = (rawAbi as unknown) as AbiItem
  return useContract(abi, config.contractAddress[process.env.REACT_APP_CHAIN_ID])
}

export const useSousChef2 = () => {
  const abi = (sousChef as unknown) as AbiItem
  return useContract(abi, getSousChefAddress())
}
export default useContract
