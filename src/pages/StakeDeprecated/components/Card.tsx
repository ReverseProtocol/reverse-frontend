import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
align-self: baseline;
background-image: linear-gradient(to right, #2E3646, #3B4557 , #2B3344);
border-radius: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
padding: 15px;
position: relative;
text-align: center;
max-width: 750px;

border:0px solid #fff;
box-shadow: 0px 0px 5px #ccc;
`

export default Card
