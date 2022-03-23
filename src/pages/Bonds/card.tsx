import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import { useSousApproveBurn } from 'hooks/useApprove'
import { useSousStakeBurn } from 'hooks/useStake'
import { useSousHarvestBurn } from 'hooks/useHarvest'
import { Flex, useModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useERC20 } from 'hooks/useContract'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { Pool2 } from 'state/types'
import { Skeleton } from 'components/Skeleton'
import BondsContainer from '../../components/layout/containers/bondsContainer'
import ContentCard from '../../components/layout/cards/bonds/contentCard'
import HeaderCard from '../../components/layout/cards/bonds/headerCard'
import DepositModal from '../../components/bondModal'
import ClaimButtonDisabled from '../../components/layout/buttons/claimButtonDisabled'
import BondButton from '../../components/layout/buttons/bondButton'
import BondButtonDisabled from '../../components/layout/buttons/bondButtonDisabled'
import ClaimButton from '../../components/layout/buttons/claimButton'
import Typography from '../../components/layout/typography/typography'
import TypographyBold from '../../components/layout/typography/typographyBold'
import TypographyTitle from '../../components/layout/typography/typographyTitle'

interface PoolWithApy extends Pool2 {
  apy: BigNumber
}

interface HarvestProps {
  pool2: PoolWithApy
}

const Bonds: React.FC<HarvestProps> = ({ pool2 }) => {
  const {
    sousId,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    apy,
    tokenDecimals,
    startBlock,
    endBlock,
    userData,
    stakingLimit,
  } = pool2

  const block = useBlock();
  const user = useWallet();
  const tokenAddress = useERC20(stakingTokenAddress);
  const allowance = new BigNumber(userData?.allowance || 0);
  const earnings = new BigNumber(userData?.pendingReward || 0);
  const earningsNo = earnings.toNumber();
  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals));

  // functions
  const { onApprove } = useSousApproveBurn(tokenAddress, sousId);
  const { onStake } = useSousStakeBurn(sousId);
  const { onReward } = useSousHarvestBurn(sousId);
  const [requestedApproval, setRequestedApproval] = useState(false);
  const [pendingTx, setPendingTx] = useState(false);

  // bond token balance
  const bondTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0);
  const bondTokenBalanceNo = bondTokenBalance.toNumber();
  const bondTokenBalanceStr = bondTokenBalanceNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 0 });

  // bonded balance
  const bondedBalance = new BigNumber(userData?.stakedBalance || 0);
  const bondedBalanceNo = bondedBalance.toNumber();
  const bondedBalanceStr = getBalanceNumber(bondedBalance).toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  // misc
  const userHasBondedBalance = bondedBalance?.toNumber() > 0
  const needsApproval = !userHasBondedBalance && !allowance.toNumber()

  // to start 
  const hasStarted = block > startBlock
  const hoursToStartNo = (startBlock - block) * 2 * 0.000277778;
  const hoursToStartStr = hoursToStartNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 0 });

  // vesting period
  const hasEnded = block > endBlock
  const vesting = block > startBlock ? (endBlock - block) * 2 * 0.000277778 * 0.0416667 : (endBlock - startBlock) * 2 * 0.000277778 * 0.0416667
  const vestingStr = vesting.toLocaleString('en-us', { maximumFractionDigits: 1 })

  // returns
  const roiNo = (apy && apy.div(365).times(vesting).minus(100)).toNumber();
  const positiveRoi = roiNo > 0;
  const fivePercentRoi = roiNo > 5;
  const roiStr = roiNo.toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 });

  // tvl
  const tbvNo = pool2.tvl && pool2.tvl.toNumber();
  const tbvStr = tbvNo.toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 });

  // rewards to claim
  const rewardsNo = getBalanceNumber(earnings, tokenDecimals);
  const rewardsStr = rewardsNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 0 });

  // bond modal
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && bondTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : bondTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />
  )

  // approve tx
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      if (!txHash) { setRequestedApproval(false) }
    }
    catch (e) { console.error(e) }
  }, [onApprove, setRequestedApproval])

  return (
    <BondsContainer>
      <HeaderCard>
        {hasStarted ?
          <Flex justifyContent="space-between">
            <Flex justifyContent="space-between">
              <TypographyTitle>
                <Flex justifyContent="space-between">
                  <TypographyTitle style={{ marginLeft: "17px" }}>{tokenName}&nbsp;</TypographyTitle>
                  <a target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/the-protocol/reverseum-bonding-pools" className="nav-links">
                    <TypographyTitle style={{ borderBottom: '1px dotted #FFFF' }}>rvBond</TypographyTitle>
                  </a>
                </Flex>
              </TypographyTitle>
            </Flex>
            {fivePercentRoi ?
              <Flex alignItems="end">
                {user && (needsApproval ? (
                  <BondButton
                    style={{ justifyContent: "center" }}
                    disabled={hasEnded}
                    onClick={handleApprove}>
                    Enable
                  </BondButton>
                ) : (
                  <BondButton style={{ justifyContent: "center" }}
                    disabled={hasEnded}
                    onClick={onPresentDeposit}>
                    Bond
                  </BondButton>
                ))}
              </Flex>
              :
              <Flex alignItems="end">
                {user &&
                  <BondButtonDisabled disabled>Sold Out</BondButtonDisabled>
                }
              </Flex>
            }
          </Flex>
          :
          <Flex justifyContent="space-between">
            <TypographyTitle>
              <Flex justifyContent="space-between">
                <TypographyTitle style={{ marginLeft: "17px" }}>{tokenName}&nbsp;</TypographyTitle>
                <a target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/the-protocol/reverseum-bonding-pools" className="nav-links">
                  <TypographyTitle style={{ borderBottom: '1px dotted #FFFF' }}>rvBond</TypographyTitle>
                </a>
              </Flex>
            </TypographyTitle>
            <Flex alignItems="end">
              <div>
                {hoursToStartNo > 1000 ?
                  <BondButtonDisabled disabled style={{ justifyContent: "center" }}>
                    <Skeleton height={10} />
                  </BondButtonDisabled>
                  :
                  <BondButtonDisabled disabled style={{ justifyContent: "center" }}>
                    {hoursToStartStr}h Left
                  </BondButtonDisabled>
                }
              </div>
            </Flex>
          </Flex>
        }
      </HeaderCard>
      <Flex justifyContent="space-between">
        <ContentCard>
          <Flex justifyContent="space-between">
            {/* ROI */}
            <Flex flexDirection="column" alignItems="start">
              <TypographyBold style={{ marginBottom: "5px" }}>vROI</TypographyBold>
              {hasStarted ?
                <div>
                  {positiveRoi ?
                    <Typography>{roiStr}%</Typography>
                    :
                    <Typography>Sold&nbsp;Out</Typography>
                  }
                </div>
                :
                <Skeleton height={10} width={60} />
              }
            </Flex>
            {/* Vesting */}
            <Flex flexDirection="column" alignItems="start">
              <TypographyBold style={{ marginBottom: "5px" }}>Vesting</TypographyBold>
              {!hasEnded ?
                <div>
                  {hasStarted ?
                    <Typography>{vestingStr}&nbsp;Days</Typography>
                    :
                    <Skeleton height={10} width={60} />}
                </div>
                :
                <Typography>Ended</Typography>
              }
            </Flex>
            {/* TVL */}
            <Flex flexDirection="column" alignItems="start">
              <TypographyBold style={{ marginBottom: "5px" }}>TVL</TypographyBold>
              <div>
                {hasStarted ?
                  <Typography>${tbvStr}</Typography>
                  :
                  <Skeleton height={10} width={60} />}
              </div>
            </Flex>
            {/* Bonded by user */}
            {user && (
              <Flex flexDirection="column" alignItems="start">
                <TypographyBold style={{ marginBottom: "5px" }}>Bonded</TypographyBold>
                {hasStarted ?
                  <div>
                    {bondedBalanceNo ?
                      <Typography>{bondedBalanceStr}&nbsp;{tokenName}</Typography>
                      :
                      <Typography>N/A</Typography>
                    }
                  </div>
                  :
                  <Typography><Skeleton height={10} width={64} /></Typography>
                }
              </Flex>
            )}
          </Flex>
        </ContentCard>
        {/* Claim RVRS */}
        {user && (
          <Flex>
            {rewardsNo > 0 ?
              <ClaimButton
                style={{ marginLeft: '20px', justifyContent: "center" }}
                disabled={!rewardsNo}
                onClick={async () => {
                  setPendingTx(true)
                  await onReward()
                  setPendingTx(false)
                }}>
                <Flex flexDirection="column" alignItems="center">
                  <TypographyBold style={{ marginBottom: "4px" }}>Claim</TypographyBold>
                  {hasStarted ?
                    <Typography>{rewardsStr}&nbsp;RVRS</Typography>
                    :
                    <Skeleton height={10} width={60} />
                  }
                </Flex>
              </ClaimButton>
              :
              <ClaimButtonDisabled
                style={{ marginLeft: '20px', justifyContent: "center" }}
                disabled={!rewardsNo}
                onClick={async () => {
                  setPendingTx(true)
                  await onReward()
                  setPendingTx(false)
                }}>
                <Flex flexDirection="column" alignItems="center">
                  <TypographyBold style={{ marginBottom: "4px" }}>Claim</TypographyBold>
                  {hasStarted ?
                    <Typography>{rewardsStr}&nbsp;RVRS</Typography>
                    :
                    <Skeleton height={10} width={60} />
                  }
                </Flex>
              </ClaimButtonDisabled>
            }
          </Flex>
        )}
      </Flex>
    </BondsContainer>
  )
}

export default Bonds


