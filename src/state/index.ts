import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import poolsReducer from './stake'
import poolsReducer2 from './bonds'
import airdropReducer from './airdrop'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    pools: poolsReducer,
    pools2: poolsReducer2,
    airdrop: airdropReducer
  },
})
