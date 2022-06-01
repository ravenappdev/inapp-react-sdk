import styled from 'styled-components'

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;
  border: none;
  cursor: pointer;
`

export const IconButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.5rem;
  height: 2rem;
  width: 2rem;
  color: ${(props) => props.color || 'blue'};
  margin-left: ${(props) => props.marginLeft || '0'};
  &:hover {
    background-color: #f1f1f1;
    border-radius: 1rem;
  }
`

export const BellIconButton = styled(IconButton)`
  font-size: 1.5rem;
  height: 2.3rem;
  width: 2.3rem;
  padding: 0.65rem;
`

export const DotIndicator = styled.span`
  position: absolute;
  top: 0;
  color: red;
  font-size: 0.6rem;
  border-radius: 0.5rem;
  margin-left: 1.2rem;
`

export const CountIndicator = styled(DotIndicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.6rem;
  width: 0.6rem;
  font-size: 0.6rem;
  font-weight: bolder;
  background-color: red;
  color: white;
  border-radius: 0.5rem;
  padding: 0.2rem;
  margin-top: -0.3rem;
`
export const ModalContainer = styled.div`
  position: ${(props) => props.position};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
`


export const Tooltip = styled.div`
  
`