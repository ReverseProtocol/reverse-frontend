import React from 'react'
import styled from 'styled-components'

const ModalActions: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <StyledModalAction>{child}</StyledModalAction>
      ))}
    </StyledModalActions>
  )
}

const StyledModalActions = styled.div`
  align-items: center;
  margin-top: 20px;
  display: flex;
  padding: 0px;
  margin-left: 15px;
`

const StyledModalAction = styled.div`
`

export default ModalActions
