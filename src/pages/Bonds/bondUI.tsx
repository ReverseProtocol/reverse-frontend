// Natives
import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

// Web3 Imports
import { useSousApproveBurn } from 'hooks/useApprove'
import { useSousStakeBurn } from 'hooks/useStake'
import { useSousHarvestBurn } from 'hooks/useHarvest'
import { Flex, useModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useERC20 } from 'hooks/useContract'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool2 } from 'state/types'
import Balance from 'components/Balance'

// Components imports
// import Flex from './components/flex'
import BondsPage from './components/bondsPage'
import Card from './components/bondsCard'
import ContentCard from './components/contentCard'
import HeaderCard from './components/headerCard'
import DepositModal from './components/bondModal'
import ApproveButton from './components/buttons/approveButton'
import BondButton from './components/buttons/bondButton'
import ClaimButton from './components/buttons/claimButton'
import Typography from './components/typography/typography'
import TypographyBold from './components/typography/typographyBold'
import TypographyTitle from './components/typography/typographyTitle'


interface PoolWithApy extends Pool2 {
  apy: BigNumber
}

interface HarvestProps {
  pool2: PoolWithApy
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const Bonds: React.FC<HarvestProps> = ({ pool2 }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    apy,
    tokenDecimals,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    isDepositFinished,
    userData,
    stakingLimit,
    tokenPoolAddress,
    quoteTokenPoolAddress,
    notFinished,
    lockBlock,
  } = pool2
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const block = useBlock()
  const { onApprove } = useSousApproveBurn(stakingTokenContract, sousId)
  const { onStake } = useSousStakeBurn(sousId, isBnbPool)
  const { onReward } = useSousHarvestBurn(sousId, isBnbPool)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
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
    />
  )
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      if (!txHash) { setRequestedApproval(false) }
    }
    catch (e) { console.error(e) }
  }, [onApprove, setRequestedApproval])

  const HoursToStart = (startBlock - block).toLocaleString('en-us', { maximumFractionDigits: 0 }) // TODO
  const DaysRemaining = block > startBlock ? (endBlock - block) * 2 * 0.000277778 * 0.0416667 : (endBlock - startBlock) * 2 * 0.000277778 * 0.0416667
  const StringDaysRemaining = DaysRemaining.toLocaleString('en-us', { maximumFractionDigits: 0 })
  const TotalValueBonded = pool2.tvl && pool2.tvl.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })
  const ROI = apy && apy.div(365).times(DaysRemaining).minus(100).toNumber()
  const StringROI = ROI.toLocaleString('en-us', { maximumFractionDigits: 2 })
  const ClaimableAssets = getBalanceNumber(earnings, tokenDecimals).toLocaleString('en-us', { maximumFractionDigits: 0 })
  const BondedAssets = getBalanceNumber(stakedBalance).toLocaleString('en-us', { maximumFractionDigits: 1 })

  return (
    <BondsPage>
      <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
        { /* Header and Bond Modal */}
        <HeaderCard>
          <Flex justifyContent="space-between">
            <Flex justifyContent="space-between">
              <TypographyTitle>{tokenName}&nbsp;veBonds</TypographyTitle>
            </Flex>
            <Flex alignItems="end">
              {account && (needsApproval && !isOldSyrup ? (
                <BondButton
                  style={{ justifyContent: "center" }}
                  disabled={isFinished || isDepositFinished}
                  onClick={handleApprove}>
                  Enable
                </BondButton>
              ) : (
                <>
                  {!isOldSyrup && (
                    <BondButton
                      style={{ justifyContent: "center" }}
                      disabled={isFinished || isDepositFinished || ROI && ROI < 0}
                      onClick={onPresentDeposit}>
                      {ROI > 0 ? 'Bond' : 'Sold Out'}
                    </BondButton>)}
                </>))}
            </Flex>
          </Flex>
        </HeaderCard>
        <Flex justifyContent="space-between">
          <ContentCard>
            <Flex justifyContent="space-between">
              {notFinished && (
                <Flex flexDirection="column" alignItems="start">
                  <TypographyBold style={{ marginBottom: "5px" }}>vROI</TypographyBold>
                  {ROI && ROI > 0 ?
                    <Typography>{StringROI}%</Typography>
                    :
                    <Typography>Sold&nbsp;Out</Typography>
                  }
                </Flex>
              )}
              {notFinished && (
                <Flex flexDirection="column" alignItems="start">
                  <TypographyBold style={{ marginBottom: "5px" }}>Vesting</TypographyBold>
                  <Typography>{StringDaysRemaining}&nbsp;Days</Typography>
                </Flex>
              )}
              <Flex flexDirection="column" alignItems="start">
                <TypographyBold style={{ marginBottom: "5px" }}>TVL</TypographyBold>
                <Typography>${TotalValueBonded}</Typography>
              </Flex>
              <Flex flexDirection="column" alignItems="start">
                <TypographyBold style={{ marginBottom: "5px" }}>Bonded</TypographyBold>
                <Typography>{BondedAssets}&nbsp;{tokenName}</Typography>
              </Flex>
            </Flex>
          </ContentCard>
          <Flex>
            {account && harvest && !isOldSyrup && (
              <ClaimButton
                style={{ marginLeft: '20px', justifyContent: "center" }}
                disabled={!earnings.toNumber() || requestedApproval || pendingTx}
                onClick={async () => {
                  setPendingTx(true)
                  await onReward()
                  setPendingTx(false)
                }}>
                <Flex flexDirection="column" alignItems="center">
                  <TypographyBold style={{ marginBottom: "4px" }}>Claim</TypographyBold>
                  <Typography>{ClaimableAssets}&nbsp;RVRS</Typography>
                </Flex>
              </ClaimButton>)}
          </Flex>
        </Flex>
      </Card >
    </BondsPage>
  )
}

export default Bonds


