/* eslint-disable no-param-reassign */
import BigNumber from "bignumber.js";
import { createSlice } from '@reduxjs/toolkit'
import fetchAirdropUserInfo from './fetchAirdropUser'
import { AirdropState, Airdrop } from '../types'

const defaultAirdrop: Airdrop = {
  totalDistributed: new BigNumber(0),
  userClaimable: new BigNumber(0),
  userTotalClaimed: new BigNumber(0),
  userLastClaimedAmount: new BigNumber(0)
}
const initialState: AirdropState = { data: defaultAirdrop }

export const AirdropSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setAirdropUserData: (state, action) => {
      const userData = action.payload
      state.data = userData
    },
    updateAirdropUserData: (state, action) => {
      const userData = action.payload
      state.data = userData
    },
  },
})

// Actions
export const { setAirdropUserData, updateAirdropUserData } = AirdropSlice.actions

export const fetchAirdropUserDataAsync = (account) => async (dispatch) => {
  const userInfo = await fetchAirdropUserInfo(account)
  dispatch(setAirdropUserData(userInfo))
}

// export const updateUserData = (sousId: string, account: string) => async (dispatch) => {
//   const tokenBalances = await fetchAirdropUserInfo(account)
//   dispatch(updateAirdropUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
// }

export default AirdropSlice.reducer