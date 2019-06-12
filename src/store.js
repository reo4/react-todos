import { Container } from 'unstated'

const defaultState = {
  currentList: 1,
  filter: 'all',
  todos: [
    {
      id: 1,
      completed: false,
      text: 'Read README',
      list_id: 1
    },
    {
      id: 2,
      completed: false,
      text: 'Add one todo'
    },
    {
      id: 3,
      completed: false,
      text: 'Add filters'
    },
    {
      id: 4,
      completed: false,
      text: 'Add multiple lists'
    },
    {
      id: 5,
      completed: false,
      text: 'Optional: add tests'
    }
  ],
  lists: [
    {
      id: 1,
      text: 'Star'
    }
  ]
}

class Store extends Container {
  constructor (props) {
    super(props)

    this.state = this.readStorage()
    this.filter()
  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage () {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getTodos(){
    return this.state.todos.filter(item => item.list_id === this.state.currentList)
  }

  filter = async (filterName) => {
    if (filterName) {
      this.setState(state => {
        let filteredTodos = this.getTodos().filter(item => item[filterName])
        return { filteredTodos }
      })
    }
    else {
      this.setState(state => {
        let filteredTodos = this.getTodos()
        return { filteredTodos }
        
      })
    }
  }

  toggleComplete = async id => {
    const item = this.state.todos.find(i => i.id === id)
    const completed = !item.completed

    await this.setState(state => {
      const todos = state.todos.map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          completed
        }
      })
      return { todos }
    })

    this.syncStorage()
  }

  createTodo = async text => {
    await this.setState(state => {
      const todo = {
        completed: false,
        text,
        id: state.todos.length + 1,
        list_id: state.currentList
      }

      const todos = state.todos.concat(todo)
      return { todos }
    })

    this.syncStorage()
  }

  createList = async text => {
    await this.setState(state => {
      const list = {
        text,
        id: state.lists.length + 1
      }

      const lists = state.lists.concat(list)
      return { lists }
    })

    this.syncStorage()
  }

  changeCurrent = async (id) => {
   await this.setState({currentList : id})
  }
  switchFilter = async (filter) => {
   await this.setState({filter})
  }
}

export default new Store()
