import React from 'react'
import Todos from '../components/Todos'

const filter = (store) => {
	let items = store.getTodos();
  if (store.state.filter === 'completed') {
  	items = store.getTodos().filter(item => item.completed)
  }
  else if (store.state.filter === 'active') {
  	items = store.getTodos().filter(item => item.active)
  }
  return <Todos items={items} toggleComplete={store.toggleComplete} />
}

export default filter