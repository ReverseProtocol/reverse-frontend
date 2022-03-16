import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const ButtonStyler = styled.a`
  
`


const PoolTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ButtonStyler>
        <ButtonMenu activeIndex={!isExact ? 1 : 0} size="sm" variant="subtle">
          <ButtonMenuItem as={Link} to={`${url}`}>
            {TranslateString(999, '')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            {TranslateString(999, '')}
          </ButtonMenuItem>
        </ButtonMenu>
      </ButtonStyler>
    </Wrapper>
  )
}

export default PoolTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`
