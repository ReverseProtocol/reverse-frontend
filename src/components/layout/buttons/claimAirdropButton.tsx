import styled from 'styled-components'

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
    box-shadow: 0px 0px 10px #506063;
    :hover {
        background-image: linear-gradient(#506063, #A1ACCD);
        box-shadow: 0px 0px 15px #5A6F73;
        transition: 0.3s;
        color: #FFFF;
    } 
`

export default claimAirdropButton