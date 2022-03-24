import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import { Skeleton } from 'components/Skeleton'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import Typography from 'components/layout/typography/typography'
import { Flex } from 'components/layout/flex'
import TypographyBold from 'components/layout/typography/typographyBold'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import WithdrawModal from './modals/withdrawModal'
import StakeModal from './modals/stakeModal'
import { usePriceCakeBusd } from "../../state/hooks";
import ContentCard from './containers/contentCard'
import ContentCard2 from './containers/contentCard2'
import ContentCardMain from './containers/contentCardMain'
import TitleCard from './containers/titleCard'
import Container from './containers/container'

interface PoolWithApy extends Pool {
  apy: BigNumber
  apr: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const Card: React.FC<HarvestProps> = ({ pool }) => {
  const { sousId, stakingTokenName, stakingTokenAddress, apy, tokenDecimals, poolCategory, isFinished, userData, stakingLimit, pricePerShare } = pool

  // rvrs
  const rvrsBalance = getBalanceNumber(useTokenBalance(getCakeAddress()));
  const rvrsBalanceStr = rvrsBalance.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  const rvrsPrice = usePriceCakeBusd()

  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const stakingTokenContract = useERC20(stakingTokenAddress)

  // func
  const { account } = useWallet()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))

  // staked
  const staked = new BigNumber(userData?.stakedBalance || 0);
  const stakedUsdStr = new BigNumber(getBalanceNumber(staked)).times(rvrsPrice).toNumber().toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  const stakedNo = getBalanceNumber(staked);
  const stakedStr = stakedNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  // misc
  const accountHasStakedBalance = staked?.toNumber() > 0;
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool;

  // tvl
  const tvlNo = pool.tvl && pool.tvl.toNumber();
  const tvlStr = tvlNo.toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 });

  // apy
  const apyNo = apy && apy.toNumber();
  const apyStr = apy && apy.toNumber().toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  const monthlyRoiStr = apy && apy.div(12).toNumber().toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  // approve, withdraw, deposit
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={staked} onConfirm={onUnstake} tokenName={stakingTokenName} pricePerShare={pricePerShare} />,
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
  const [onPresentDeposit] = useModal(
    <StakeModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  return (
    <Container>
      <TitleCard style={{ marginBottom: '10px' }}>
        <TypographyTitle>RVRS Staking&nbsp;</TypographyTitle>
        <a target="_blanK" rel="noreferrer" href="https://medium.com/@reverseprotocolONE/diamond-hands-through-vervrs-46dad3106d3" className="nav-links">
          (<TypographyTitle style={{ marginTop: '15px', marginBottom: '15px', marginLeft: '0px', borderBottom: '1px dotted #FFFF' }}>Soon Deprecated</TypographyTitle>)
        </a>
      </TitleCard>
      <Flex justifyContent="center" marginBottom="10px">
        <ContentCard style={{ marginRight: '7px' }}>
          {pool.apy ?
            <TypographyBold style={{ marginBottom: '5px' }}>${tvlStr}</TypographyBold>
            :
            <Typography><Skeleton height={10} width={60} marginBottom="5px" /></Typography>
          }
          <Typography>TVL</Typography>
        </ContentCard>
        <ContentCardMain>
          {pool.apy ?
            <TypographyBold style={{ marginBottom: '5px' }}>{apyStr}%</TypographyBold>
            :
            <Typography><Skeleton height={10} marginBottom="5px" /></Typography>
          }
          <Typography>Annual Yield</Typography>
        </ContentCardMain>
        <ContentCard style={{ marginLeft: '7px' }}>
          {pool.apy ?
            <TypographyBold style={{ marginBottom: '5px' }}>{monthlyRoiStr}%</TypographyBold>
            :
            <Typography><Skeleton height={10} marginBottom="5px" /></Typography>
          }
          <Typography>Monthly ROI</Typography>
        </ContentCard>
      </Flex>
      <Flex justifyContent="center">
        <ContentCard2 style={{ marginRight: '7px' }}>
          {pool.apy ?
            <TypographyBold style={{ marginBottom: '5px' }}>{stakedStr}</TypographyBold>
            :
            <Typography><Skeleton height={10} marginBottom="5px" /></Typography>
          }
          <Typography>Staked RVRS</Typography>
        </ContentCard2>
        <ContentCard2>
          {pool.apy ?
            <TypographyBold style={{ marginBottom: '5px' }}>${stakedUsdStr}</TypographyBold>
            :
            <Typography><Skeleton height={10} marginBottom="5px" /></Typography>
          }
          <Typography>Staked (USD)</Typography>
        </ContentCard2>
      </Flex>
      <Divider />
      {account && (!needsApproval ? (
        <Flex justifyContent="center" marginTop="0px" marginBottom="20px">
          {stakedNo > 0 ?
            <>
              <UnstakeButton
                style={{ marginRight: "12px" }}
                disabled={staked.eq(new BigNumber(0)) || pendingTx}
                onClick={isOldSyrup ? async () => {
                  setPendingTx(true)
                  await onUnstake('0')
                  setPendingTx(false)
                } : onPresentWithdraw}>
                Unstake
              </UnstakeButton>
              <StakeButton
                disabled={isFinished && sousId !== 0}
                onClick={onPresentDeposit}>
                &nbsp;Stake&nbsp;
              </StakeButton>
            </>
            :
            <>
              <UnstakeButton
                style={{ marginRight: "12px" }}
                disabled
                onClick={isOldSyrup ? async () => {
                  setPendingTx(true)
                  await onUnstake('0')
                  setPendingTx(false)
                } : onPresentWithdraw}>
                Unstake
              </UnstakeButton>
              <StakeButton
                disabled={isFinished && sousId !== 0}
                onClick={onPresentDeposit}
              >
                &nbsp;Stake&nbsp;
              </StakeButton>
            </>
          }
        </Flex>
      ) : (
        <StakeButton
          style={{ marginTop: "0px", marginBottom: "20px" }}
          disabled={requestedApproval}
          onClick={handleApprove}>
          Enable
        </StakeButton>
      ))}
    </Container>
  )
}

const StakeButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  color: #E2E2E2;
  justify-content: center;
  background-image: linear-gradient(180deg, #506063, #909BBF);
  border-radius: 15px;
  border: 0px;
  padding-left: 110px;
  padding-right: 110px;
  padding-top: 17px;
  padding-bottom: 17px;
  :hover {
    background-image: linear-gradient(180deg, #506063, #A1ACCD);
    box-shadow: 0px 0px 10px 0px #5A6F73;
    transition: 0.5s;
    color: #FFFF;
  }
`

const UnstakeButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  color: #C7CBD0;
  justify-content: center;
  background-color: #46505E;
  border-radius: 15px;
  border: 0px;
  padding-left: 110px;
  padding-right: 100px;
  padding-top: 17px;
  padding-bottom: 17px;
  :hover {
      background-color: #535E6F;
      transition: 0.3s;
      color: #FFFF;
  } 
`

const Divider = styled.div`
  background-color: #9B9B9B;
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  width: 0%;
`

export default Card
