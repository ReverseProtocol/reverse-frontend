/* eslint-disable no-param-reassign */
import BigNumber from "bignumber.js";
import { createSlice } from '@reduxjs/toolkit'
import autoRvrsAbi from "config/abi/autorvrs.json";
import poolsConfig from 'config/constants/stake'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
} from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'
import {fetchPoolsTotalStaking} from "./fetchPools";
import {getAutoRvrsAddress} from "../../utils/addressHelpers";
import multicall from "../../utils/multicall";

const initialState: PoolsState = { data: [...poolsConfig] }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = () => async (dispatch) => {
  const { userInfo, pricePerFullShare } = await fetchPoolsTotalStaking()

  const liveData = poolsConfig.map((pool) => {
    return {
      ...pool,
      totalStaked: userInfo[0].amount,
      pricePerShare: pricePerFullShare[0].toString()
    }
  })

  dispatch(setPoolsPublicData(liveData))
}

export const fetchPoolsUserInfo = async (account) => {
  const calls = [
    {
      address: getAutoRvrsAddress(),
      name: 'userInfo',
      params: [account]
    }
  ];
  const userInfo = await multicall(autoRvrsAbi, calls);

  return userInfo;
};

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const userInfo = await fetchPoolsUserInfo(account)

  const userData = poolsConfig.map((pool) => ({
    sousId: pool.sousId,
    allowance: allowances[pool.sousId],
    stakingTokenBalance: stakingTokenBalances[pool.sousId],
    stakedBalance: stakedBalances[pool.sousId],
    lastDepositedTime: userInfo[pool.sousId].lastDepositedTime,
    lastUserActionTime: userInfo[pool.sousId].lastUserActionTime,
    reverseAtlastUserAction: userInfo[pool.sousId].reverseAtlastUserAction,
  }))

  dispatch(setPoolsUserData(userData))
}


export const updateUserAllowance = (sousId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
}

export const updateUserBalance = (sousId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
}

export const updateUserStakedBalance = (sousId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
}

/* export const updateUserPendingReward = (sousId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
} */

export default PoolsSlice.reducer