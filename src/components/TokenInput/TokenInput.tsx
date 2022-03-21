import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js/bignumber'
import { Button } from '@pancakeswap-libs/uikit'
import useI18n from '../../hooks/useI18n'
import Input, { InputProps } from '../Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
  depositFeeBP?: number
  valueUsd?: number | string
}



const TokenInput: React.FC<TokenInputProps> = (
    { max, symbol, onChange, onSelectMax, value, depositFeeBP = 0, valueUsd= 0 }) => {
    const maxAvailableNo = new BigNumber(max).toNumber();
    const maxAvailableStr = maxAvailableNo.toLocaleString('en-us', { maximumFractionDigits: 18, minimumFractionDigits: 18 });
    
  return (
    <StyledTokenInput>
      <StyledMaxText onClick={onSelectMax}>{maxAvailableStr}&nbsp;{symbol}&nbsp;Available</StyledMaxText>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol style={{marginLeft: '10px', marginRight: '8px'}}>{symbol}</StyledTokenSymbol>
            <MaxButton onClick={onSelectMax}>Max</MaxButton>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div``

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const Staked = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textSubtle};
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  margin-left: 10px;
  justify-content: flex-start;
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`

const MaxButton = styled.button`
    padding: 15px;
    padding-left: 20px;
    color: #D6D6D6;
    padding-right: 20px;
    font-weight: 700;
    margin-right: -5px;
    background-image: linear-gradient(#506063, #909BBF);
    border-radius: 20px;
    border: 0px;
    :hover {
        background-image: linear-gradient(#506063, #A1ACCD);
        box-shadow: 0px 0px 5px #5A6F73;
    } 
`

export default TokenInput
