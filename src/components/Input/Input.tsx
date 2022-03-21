import React from 'react'
import styled from 'styled-components'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
}

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value }) => {
  return (
    <StyledInputWrapper>
      {startAdornment}
      <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
      {endAdornment}
    </StyledInputWrapper>
  )
}

const StyledInputWrapper = styled.div`
  align-items: center;
  background-image: linear-gradient(to right, #F2F2F2, #D6D6D6);
  border-radius: 25px;
  display: flex;
  height: 55px;
  padding: 10px;
  border: 1px;
  border-style: solid !important;
  border-color: #A8A8A8 !important;

`

const StyledInput = styled.input`
  font-size: 16px;
  font-weight: 400;
  background: none;
  border: 0;
  color: #333;
`

export default Input
