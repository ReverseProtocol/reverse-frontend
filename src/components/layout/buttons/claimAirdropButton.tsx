import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    box-shadow: 0px 0px 5px #5A6F73;
  }
  30% {
    box-shadow: 0px 0px 15px #5A6F73;
  }
  30% {
    box-shadow: 0px 0px 20px #5A6F73;
  }
  70% {
    box-shadow: 0px 0px 15px #5A6F73;
  }
  100% {
    box-shadow: 0px 0px 5px #5A6F73;
  }
`

const claimAirdropButton = styled.button`
    background-image: linear-gradient(#506063, #909BBF);
    border-radius: 15px;
    color: #EEEEEE;
    border: 0px;
    font-size: 16px;
    font-weight: 700;
    padding: 15px;
    padding-right: 25px;
    padding-left: 25px;
    animation: ${pulse} 3s infinite ease-out;
    :hover {
        background-image: linear-gradient(#506063, #A1ACCD);
        box-shadow: 0px 0px 15px #5A6F73;
        transition: 0.5s;
        color: #FFFF;
        
    } 
`

export default claimAirdropButton