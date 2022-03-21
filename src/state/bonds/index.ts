/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import pools2 from 'config/constants/bonds'
import { pools2Config } from 'config/constants'
import {fetchPoolsBlockLimits, fetchPoolsQuoteTokenPerLp, fetchPoolsTotalStatking} from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { Pools2State, Pool2 } from '../types'

const initialState: Pools2State = { data: [...pools2Config] }

export const Pools2Slice = createSlice({
  name: 'Pools2',
  initialState,
  reducers: {
    setPools2PublicData: (state, action) => {
      const livePoolsData: Pool2[] = action.payload
      state.data = state.data.map((pool2) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool2.sousId)
        return { ...pool2, ...livePoolData }
      })
    },
    setPools2UserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool2) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool2.sousId)
        return { ...pool2, userData: userPoolData }
      })
    },
    updatePools2UserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setPools2PublicData, setPools2UserData, updatePools2UserData } = Pools2Slice.actions

// Thunks
export const fetchPools2PublicDataAsync = () => async (dispatch) => {
  const blockLimits = await fetchPoolsBlockLimits()
  const totalStakings = await fetchPoolsTotalStatking()
  const quoteTokenPerLps = await fetchPoolsQuoteTokenPerLp()

  const liveData = pools2Config.map((pool) => {
    const blockLimit = blockLimits.find((entry) => entry.sousId === pool.sousId)
    const totalStaking = totalStakings.find((entry) => entry.sousId === pool.sousId)
    const quoteTokenPerLp = quoteTokenPerLps.find((entry) => entry.sousId === pool.sousId)
    return {
      ...blockLimit,
      ...totalStaking,
      ...quoteTokenPerLp
    }
  })
  
  dispatch(setPools2PublicData(liveData))
}

export const fetchPools2UserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)

  const userData = pools2Config.map((pool2) => ({
    sousId: pool2.sousId,
    allowance: allowances[pool2.sousId],
    stakingTokenBalance: stakingTokenBalances[pool2.sousId],
    stakedBalance: stakedBalances[pool2.sousId],
    pendingReward: pendingRewards[pool2.sousId],
  }))

  dispatch(setPools2UserData(userData))
}

export const updateUserAllowance2 = (sousId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePools2UserData({ sousId, field: 'allowance', value: allowances[sousId] }))
}

export const updateUserBalance2 = (sousId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePools2UserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
}

export const updateUserStakedBalance2 = (sousId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updatePools2UserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
}

export const updateUserPendingReward2 = (sousId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePools2UserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
}

export default Pools2Slice.reducer
