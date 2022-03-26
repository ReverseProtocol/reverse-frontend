import styled from 'styled-components'

const claimButton = styled.button`
    padding: 12px;
    background-image: linear-gradient(#506063, #909BBF);
    border-radius: 18px;
    border: 0px;
    color: #EEEEEE;
    box-shadow: 0px 0px 8px #506063;
    :hover {
        background-image: linear-gradient(#506063, #A1ACCD);
        box-shadow: 0px 0px 12px #5A6F73;
        color: #FFFF;
        transition: 0.5s;
    } 
    min-width: 110px;
`

export default claimButton