
import multicall from 'utils/multicall'
import {getAirdropAddress} from 'utils/addressHelpers'
import RewardClaim from "../../config/abi/RewardClaim.json";

const fetchAirdropUserInfo = async (account) => {
  const calls = [
    {
      address: getAirdropAddress(),
      name: 'totalDistributed',
      params: []
    },
    {
      address: getAirdropAddress(),
      name: 'claimable',
      params: [account]
    },
    {
      address: getAirdropAddress(),
      name: 'claimed',
      params: [account]
    },
    {
      address: getAirdropAddress(),
      name: 'lastClaimAmount',
      params: [account]
    }
  ];
  const userInfo = await multicall(RewardClaim, calls);

  const output = {
    totalDistributed: userInfo[0],
    userClaimable: userInfo[1],
    userTotalClaimed: userInfo[2],
    userLastClaimedAmount: userInfo[3]
  };
  return output
};

export default fetchAirdropUserInfo;
