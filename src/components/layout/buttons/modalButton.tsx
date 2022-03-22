import styled from 'styled-components'

const confirmModalButton = styled.button`
    font-size: 18px;
    font-weight: 600;
    color: #EEEEEE;
    padding: 15px;
    justify-content: center;
    background-image: linear-gradient(#506063, #909BBF);
    border-radius: 15px;
    border: 0px;
    min-height: 50px;
    box-shadow: 0px 0px 0px #506063;
    :hover {
        background-image: linear-gradient(#5E7073, #909BBF);
        box-shadow: 0px 0px 10px #506063;
        color: #FFFFFF;
        transition: 0.4s;
    }
    
`

export default confirmModalButton