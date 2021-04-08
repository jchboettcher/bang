import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const FancyButton = styled.button`
  background: lightgreen;
  border: black 1px;
  border-style: solid;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: green;
  }
`