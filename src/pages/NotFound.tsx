import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const NotFound = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledNotFound>
        <object type="image/svg+xml" data="images/404.svg" height="300px">&nbsp;</object>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
