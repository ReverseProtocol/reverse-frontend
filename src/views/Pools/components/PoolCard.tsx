import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useModal, Flex } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { FaExternalLinkAlt, FaGithub, FaLongArrowAltRight } from 'react-icons/fa'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import Card from './Card'
import {usePriceCakeBusd} from "../../../state/hooks";
import useWithdrawFeeTimer from "./useWithdrawFeeTimer";
import WithdrawalFeeTimer from "./withdrawFeeTimer";


const QuoteTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  text-shadow: 1px 1px 5px #ccc;
  margin-top: 5px;
`

const QuoteTitle2 = styled.p`
  color: #979797;
  font-size: 15px;
  font-weight: 300;
  text-shadow: 0px 0px 0px #ccc;
`

const Text1 = styled.p`
  color: #EBEBEB;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 0px;
  text-shadow: 0px 0px 0px #ccc;
`

const Text11 = styled.p`
  color: #EBEBEB;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 0px;
`

const Divider = styled.div`
  background-color: #7B7B7B;
  height: 1.5px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 15px;
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

const StyledBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 30px;
  max-height: 30px;
  max-width: 135px;
  padding: 20px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  width: 100%;
  margin-bottom: 15px;
  box-sizing: border-box;
`


const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledBtn2 = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 800;
  width: 100%;
  display: inline-flex;
  min-height: 30px;
  max-height: 30px;
  max-width: 118px;
  padding: 20px;

  border: 2px solid #fff;
  box-shadow: 0px 0px 7px #ffff;
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

  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us',{ maximumFractionDigits: 0 });
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
  const TVL = pool.tvl && pool.tvl.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const APY = apy && apy.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const StakedUSDBalance = getBalanceNumber(stakedBalanceUsd).toLocaleString('en-us',{ maximumFractionDigits: 0 })
  const FiveDayROI = apr && apr.div(53).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const ExpectedBalance = apr && apr.div(365).times(7).times(0.01).times(getBalanceNumber(stakedBalanceUsd)).plus(getBalanceNumber(stakedBalanceUsd)).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const TotalAPY = apy && apy.plus(445).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 });
  const bal = getBalanceNumber(stakedBalance).toLocaleString('en-us',{ maximumFractionDigits: 0 });

  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>

      <div style={{padding: '34px'}}>

        <Wrapper 
          justifyContent="center" 
          alignItems="center"
          padding='20px' 
          >

          <Flex flexDirection="column" alignItems='center'>
            <QuoteTitle2>Total APY</QuoteTitle2>
            <QuoteTitle>{TotalAPY}%</QuoteTitle>
          </Flex>
          <Flex  flexDirection="column" alignItems='center' marginLeft='60px'>
            <QuoteTitle2> TVL</QuoteTitle2>
            <QuoteTitle >${TVL}</QuoteTitle>
          </Flex>
        </Wrapper>

        <Flex justifyContent='space-between' marginTop='18px'>
          <Text1>UST APY</Text1>
          <Text1>45%</Text1>
        </Flex>

        
        <Flex justifyContent='space-between' marginTop='10px'>
          <Text1>RVRS APY</Text1>
          <Text1>{APY}%</Text1>
        </Flex>

        <Flex justifyContent='space-between' marginTop='10px'>
          <Text1> 7 Day ROI</Text1>
          <Text1>{FiveDayROI}%</Text1>
        </Flex>

        <Divider/>

        <Flex justifyContent='space-between' marginTop='14px'>
          <Text1>Unstaked Balance</Text1>
          <Text1>{cakeBalance}</Text1>
        </Flex>

        <Flex justifyContent='space-between' marginTop='10px'>
          <Text1>Staked Balance</Text1>
          <Text1>{bal}</Text1>
        </Flex>

        <Flex justifyContent='space-between' marginTop='12px'>
          <SmallText>Balance (in UST)</SmallText>
          <SmallText>${StakedUSDBalance}</SmallText>
        </Flex>

        <Flex justifyContent='space-between' marginTop='5px'>
          <SmallText>Expected Balance (7 Days)</SmallText>
          <SmallText>${ExpectedBalance}</SmallText>
        </Flex>

        




        <Wrapper alignItems="end">

        <Flex alignItems="end">

          <StyledCardActions style={{alignItems:"end"}} >
            {account && (needsApproval && !isOldSyrup ? (
            
            <div style={{ flex: 1 }}>
              <StyledBtn

 
                style={{minWidth:'100px', maxWidth:'150px', boxShadow:'0px 0px 5px #fff', 'marginTop':'10px'}}
                disabled={isFinished || requestedApproval}
                onClick={handleApprove}>
                Enable Staking
              </StyledBtn>
            </div>

            ) : ( <>

              <StyledBtn 
                style={{marginTop:'20px'}}
                disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                onClick={ isOldSyrup ? async () => {
                  setPendingTx(true)
                  await onUnstake('0')
                  setPendingTx(false)} : onPresentWithdraw }>
                Unstake (0,0)
              </StyledBtn>

              <StyledActionSpacer/>
                {!isOldSyrup && (
                <StyledBtn2 
                  style={{marginTop:'20px'}} 
                  disabled={isFinished && sousId !== 0} 
                  onClick={onPresentDeposit}>
                  Stake (3,3)
                </StyledBtn2>)} </> ))}
              </StyledCardActions> 
                    
            </Flex>
        </Wrapper>
      </div>
    </Card>
  )
}

export default PoolCard
