import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const bondsCard = styled(Container)`
  min-height: calc(1vh - 64px);
  padding-top: 0px;
  padding-bottom: 0px;
  padding: 0px;
  max-width: 590px;

${({ theme }) => theme.mediaQueries.sm} {
  padding-top: 10px;
  padding-bottom: 5px;
}

${({ theme }) => theme.mediaQueries.lg} {
  padding-top: 5px;
  padding-bottom: 5px;
}
`

export default bondsCard