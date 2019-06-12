import React from 'react'
import Todos from '../components/Todos'

const filter = (store) => {
  if (store.state.filter === 'completed') {
    return <Todos items={store.getTodos().filter(item => item.completed)} toggleComplete={store.toggleComplete} />
  }
  else if (store.state.filter === 'active') {
    return <Todos items={store.getTodos().filter(item => item.active)} toggleComplete={store.toggleComplete} />
  }
  else {
    return <Todos items={store.getTodos()} toggleComplete={store.toggleComplete} />
  }
}

export default filter