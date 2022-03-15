import styled from 'styled-components'

const bondsCard = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  align-self: baseline;
  background-image: linear-gradient(#2D3544, #2D3544);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  text-align: center;
  margin-bottom: 0px;
  border: 1px solid #FFFF;
  box-shadow: 0px 0px 0px #A5A5A5;
  border: 0.5npx;
  border-style: solid !important;
  border-color: #9B9B9B !important;
`

export default bondsCard
