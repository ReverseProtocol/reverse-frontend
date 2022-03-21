import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useModal, Flex } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/layout/unlock'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvest } from 'hooks/useHarvest'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import Card from './Card'
import { usePriceCakeBusd } from "../../../state/hooks";
import useWithdrawFeeTimer from "./useWithdrawFeeTimer";
import WithdrawalFeeTimer from "./withdrawFeeTimer";


const QuoteTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-top: 5px;
`

const QuoteTitle2 = styled.p`
  color: #979797;
  font-size: 15px;
  font-weight: 300;
`

const Text1 = styled.p`
  color: #EBEBEB;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 0px;
`

const Text11 = styled.p`
  color: #EBEBEB;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 0px;
`

const Divider = styled.div`
  background-color: #7B7B7B;
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
`

const SmallText = styled.p`
  color: #979797;
  font-size: 15px;
  font-weight: 200;
  margin-bottom: 0px;
  margin-left: 20px;
`

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const UnstakeButton = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  max-height: 40px;
  padding: 25px;
`


interface PoolWithApy extends Pool {
  apy: BigNumber
  apr: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    stakingTokenName,
    stakingTokenAddress,
    apr,
    apy,
    tokenDecimals,
    poolCategory,
    isFinished,
    userData,
    stakingLimit,
    pricePerShare
  } = pool

  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us', { maximumFractionDigits: 0 });
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)
  const rvrsPrice = usePriceCakeBusd()
  const { secondsRemaining, hasUnstakingFee } = useWithdrawFeeTimer(
    userData ? userData.lastDepositedTime.toNumber() : 0,
    parseInt('259200', 10)
  );
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const stakedBalanceUsd = stakedBalance.times(rvrsPrice)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance
  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} pricePerShare={pricePerShare} />,
  )
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])
  const TVL = pool.tvl && pool.tvl.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 });
  const TotalAPY = apy && apy.plus(445).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 });
  const bal = getBalanceNumber(stakedBalance).toLocaleString('en-us', { maximumFractionDigits: 0 });

  return (
    <Card>
      { /* isActive={isCardActive} isFinished={isFinished && sousId !== 0} */}
      <div>
        <Wrapper justifyContent="center" alignItems="center">
          <Flex flexDirection="column" alignItems='center'>
            <QuoteTitle2>Total APY</QuoteTitle2>
            <QuoteTitle>0%</QuoteTitle>
          </Flex>
          <Flex flexDirection="column" alignItems='center' marginLeft='60px'>
            <QuoteTitle2> TVL</QuoteTitle2>
            <QuoteTitle >${TVL}</QuoteTitle>
          </Flex>
        </Wrapper>

        <Flex justifyContent='space-between' marginTop='60px'>
          <Text1>Staked Balance</Text1>
          <Text1>{bal}</Text1>
        </Flex>

        <Wrapper alignItems="end">
            <UnstakeButton
              style={{ justifyContent:'center', marginTop:'20px' }}
              disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
              onClick={isOldSyrup ? async () => {
                setPendingTx(true)
                await onUnstake('0')
                setPendingTx(false)
              } : onPresentWithdraw}>
              Unstake RVRS
            </UnstakeButton>
        </Wrapper>
      </div>
    </Card>
  )
}

export default PoolCard
