import styled from 'styled-components'

const claimAirdropButtonDisabled = styled.button`
    background: transparent;
    border-radius: 15px;
    color: #FFFF;
    border: 1px;
    opacity: 0.8;

    border-style: solid !important;
    border-color: #4E5E61 !important;
    font-size: 16px;
    font-weight: 700;
    padding: 15px;
    padding-right: 25px;
    padding-left: 25px;
    :hover {
        background: transparent;
        opacity: 1;
        transition: 0.3s;
    } 
`

export default claimAirdropButtonDisabled