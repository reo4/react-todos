import React from 'react'
import styled from 'styled-components'

import store from '../store'

const List = ({list}) => {
	return <Wrapper current={store.state.currentList} id={list.id} onClick={ () => store.changeCurrent(list.id) }> {list.text} </Wrapper>
}

const Lists = ({items}) => {
 return items.map(list => <List key={list.id} list={list}/>) 
}

const Wrapper = styled.p`
  font-size: 24px;
  cursor: pointer;
  ${({ current , id }) => current === id && `
	  color: #4a76ce
  `}
`

export default Lists
