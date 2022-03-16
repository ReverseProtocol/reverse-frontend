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
          <ButtonMenuItem as={Link} to={`${url}`}           
            style={{
            marginRight: '6px',
            marginTop: '0px',
            marginLeft: '0px',
            width: '80%',
          }} >
            {TranslateString(999, 'Active')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/history`}
                      style={{
                        marginRight: '6px',
                        marginTop: '0px',
                        marginLeft: '5px',
                        width: '80%',
                      }}>
            {TranslateString(999, 'Inactive')}
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
