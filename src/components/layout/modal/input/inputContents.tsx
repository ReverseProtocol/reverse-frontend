import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js/bignumber'
import Ripples, { createRipples } from 'react-ripples'
import Input, { InputProps } from '../../../Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
  depositFeeBP?: number
  valueUsd?: number | string
}

const InputContent: React.FC<TokenInputProps> = (
  { max, symbol, onChange, onSelectMax, value, depositFeeBP = 0, valueUsd = 0 }) => {
  const maxAvailableNo = new BigNumber(max).toNumber();
  const maxAvailableStr = maxAvailableNo.toLocaleString('en-us', { maximumFractionDigits: 3, minimumFractionDigits: 2 });

  return (
    <InputContentWrapper>
      <Text onClick={onSelectMax}>{maxAvailableStr}&nbsp;{symbol}&nbsp;Available</Text>
      <Input
        endAdornment={
          <div
            style={{
              display: 'inline-flex',
              borderRadius: 15,
              overflow: 'hidden',
              marginLeft: '10px',
            }}
          >
            <Ripples>
              <MaxButton onClick={onSelectMax}>
                Max
              </MaxButton>
            </Ripples>
          </div>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </InputContentWrapper>
  )
}

const InputContentWrapper = styled.div``

const Text = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
  margin-left: 10px;
  justify-content: flex-start;
`

const MaxButton = styled.button`
  padding: 15px;
  padding-left: 20px;
  color: #D6D6D6;
  padding-right: 20px;
  font-weight: 700;
  margin-left: 5px;
  background-image: linear-gradient(#506063, #909BBF);
  border-radius: 17px;
  border: 0px;
  :hover {
      background-image: linear-gradient(#506063, #A1ACCD);
      color: #FFFF;
      transition: 0.5s;
  } 
`

export default InputContent
