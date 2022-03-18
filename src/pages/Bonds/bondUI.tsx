// natives
import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

// web3
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

// components
// import Flex from './components/flex'
import BondsPage from './components/bondsPage'
import Card from './components/bondsCard'
import ContentCard from './components/contentCard'
import HeaderCard from './components/headerCard'
import DepositModal from './components/bondModal'
import ClaimButtonDisabled from './components/buttons/claimButtonDisabled'
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
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
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
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const allowance = new BigNumber(userData?.allowance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance
  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const vesting = block > startBlock ? (endBlock - block) * 2 * 0.000277778 * 0.0416667 : (endBlock - startBlock) * 2 * 0.000277778 * 0.0416667
  const TVB = pool2.tvl && pool2.tvl.toNumber()
  const ROI = apy && apy.div(365).times(vesting).minus(100).toNumber()
  const claimableAssets = getBalanceNumber(earnings, tokenDecimals)
  const bondedAssets = stakedBalance.toNumber()
  const hoursToStartBlock = (startBlock - block) * 2 * 0.000277778
  const hasStarted = startBlock < block

  // strings
  const vestingStr = vesting.toLocaleString('en-us', { maximumFractionDigits: 1 })
  const TVBStr = TVB.toLocaleString('en-us', { maximumFractionDigits: 0 })
  const ROIStr = ROI.toLocaleString('en-us', { maximumFractionDigits: 2 })
  const claimableAssetsStr = claimableAssets.toLocaleString('en-us', { maximumFractionDigits: 2 })
  const bondedAssetsStr = bondedAssets.toLocaleString('en-us', { maximumFractionDigits: 2 })
  const hoursToStartBlockStr = hoursToStartBlock.toLocaleString('en-us', { maximumFractionDigits: 2 })

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

  return (
    <BondsPage>
      <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
        { /* Header and Bond Modal */}
        <HeaderCard>
          <Flex justifyContent="space-between">
            <Flex justifyContent="space-between">
              <TypographyTitle>{tokenName}&nbsp;veBonds</TypographyTitle>
            </Flex>

            {startBlock < block ?
              <Flex alignItems="end">
                {account && (needsApproval ? (
                  <BondButton
                    style={{ justifyContent: "center" }}
                    disabled={isFinished || isDepositFinished || ROI < 0}
                    onClick={handleApprove}>
                    {ROI > 0 ? 'Enable' : 'Sold Out'}
                  </BondButton>
                ) : (
                  <BondButton
                    style={{ justifyContent: "center" }}
                    disabled={isFinished || isDepositFinished || ROI < 0}
                    onClick={onPresentDeposit}>
                    {ROI > 0 ? 'Bond' : 'Sold Out'}
                  </BondButton>
                ))}
              </Flex>
              :
              <Flex alignItems="end">
                <BondButton style={{ justifyContent: "center" }}>
                  {hoursToStartBlockStr}h To Start
                </BondButton>
              </Flex>
            }

          </Flex>
        </HeaderCard>

        <Flex justifyContent="space-between">
          <ContentCard>
            <Flex justifyContent="space-between">

              {/* ROI */}
              <Flex flexDirection="column" alignItems="start">
                <TypographyBold style={{ marginBottom: "5px" }}>vROI</TypographyBold>
                {ROI > 0 ?
                  <Typography>{ROIStr}%</Typography> : <Typography>Sold&nbsp;Out</Typography>
                }
              </Flex>

              {/* Vesting */}
              <Flex flexDirection="column" alignItems="start">
                <TypographyBold style={{ marginBottom: "5px" }}>Vesting</TypographyBold>
                {vesting > 0 ?
                  <Typography>{vestingStr}&nbsp;Days</Typography> : <Typography>Ended</Typography>
                }
              </Flex>

              {/* TVL */}
              <Flex flexDirection="column" alignItems="start">
                <TypographyBold style={{ marginBottom: "5px" }}>TVL</TypographyBold>
                <Typography>${TVBStr}</Typography>
              </Flex>

              {/* Bonded by user */}
              {account && (
                <Flex flexDirection="column" alignItems="start">
                  {bondedAssets > 0 ?
                    <TypographyBold style={{ marginBottom: "5px" }}>Bonded</TypographyBold> : <Typography>&nbsp;</Typography>
                  }
                  {bondedAssets > 0 ?
                    <Typography>{bondedAssetsStr}&nbsp;{tokenName}</Typography> : <Typography>&nbsp;</Typography>
                  }
                </Flex>
              )}

            </Flex>
          </ContentCard>

          {/* Claim RVRS */}
          {account && (
            <Flex>
              {claimableAssets > 0 ?
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
                    <Typography>{claimableAssetsStr}&nbsp;RVRS</Typography>
                  </Flex>
                </ClaimButton>
                :
                <ClaimButtonDisabled
                  style={{ marginLeft: '20px', justifyContent: "center" }}
                  disabled={!earnings.toNumber() || requestedApproval || pendingTx}
                  onClick={async () => {
                    setPendingTx(true)
                    await onReward()
                    setPendingTx(false)
                  }}>
                  <Flex flexDirection="column" alignItems="center">
                    <TypographyBold style={{ marginBottom: "4px" }}>Claim</TypographyBold>
                    <Typography>{claimableAssetsStr}&nbsp;RVRS</Typography>
                  </Flex>
                </ClaimButtonDisabled>
              }
            </Flex>
          )}
        </Flex>
      </Card >
    </BondsPage>
  )
}

export default Bonds


