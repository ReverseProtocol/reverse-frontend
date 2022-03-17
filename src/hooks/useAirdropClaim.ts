import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {fetchAirdropUserDataAsync} from 'state/actions'
import { airdropClaim } from 'utils/callHelpers'
import {useAirdropContract} from './useContract'

// Claim airdrop
const useAirdropClaim = (account) => {
  const dispatch = useDispatch()
  const airdropContract = useAirdropContract()

  const handleAirdropClaim = useCallback(async () => {
    try {
      const tx = await airdropClaim(airdropContract, account)
      dispatch(fetchAirdropUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, airdropContract])

  return { onAirdropClaim: handleAirdropClaim }
}

export default useAirdropClaim;
