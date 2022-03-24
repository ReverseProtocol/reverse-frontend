import { Container } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    box-shadow: 0px 0px 5px #5A6F73;
  }
  30% {
    box-shadow: 0px 0px 15px #5A6F73;
  }
  70% {
    box-shadow: 0px 0px 15px #5A6F73;
  }
  100% {
    box-shadow: 0px 0px 5px #5A6F73;
  }
`

const contentCardMain = styled(Container)`
  background-image: linear-gradient(to right, #3E475E, #4E5E62); 
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  position: center;
  text-align: center;
  padding: 20px;
  `


export default contentCardMain