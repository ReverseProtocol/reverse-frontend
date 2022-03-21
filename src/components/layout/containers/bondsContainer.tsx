import styled from 'styled-components'

const bondsContainer = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background-image: linear-gradient(#2D3544, #2D3544);
  border-radius: 30px;
  padding: 10px;
  border: 1px solid !important;
  border-color: #9B9B9B !important;
  margin-bottom: 20px;
  :hover {
    border-color: #A8A8A8 !important;
  } 
`

export default bondsContainer
