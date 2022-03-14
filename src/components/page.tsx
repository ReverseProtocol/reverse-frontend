import styled from 'styled-components'
import Container from './container'

const Page = styled(Container)`
  min-height: calc(100vh - 173px);
  padding: 20px;
  padding-bottom: 60px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 80px;
    padding-bottom: 50px;
  }
`

export default Page
