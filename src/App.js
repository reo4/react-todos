import React , {Fragment} from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import Store from './store'

import Creator from './components/Creator'
import Lists from './components/Lists'
import filter from './Helpers/filter'

function App () {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[Store]}>
          {store => {
            return (
              <Fragment>
                <Column>
                  <Creator placeholder="Add new list" onCreate={store.createList} />
                  <Lists items={store.state.lists}></Lists>
                </Column>
                <Column>
                  <Creator placeholder="Add new todo" onCreate={store.createTodo} />
                  {
                    filter(store)                 
                  }
                </Column>
                <Column>
                  <button onClick={() => store.switchFilter('completed')}>Completed</button>
                  <button onClick={() => store.switchFilter('active')}>active</button>
                  <button onClick={() => store.switchFilter('all')}>all</button>
                </Column>
              </Fragment>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-size: 24px;
  color: white;
  padding: 25px;
  flex-wrap: wrap;
`

const Column = styled.div`
  max-width: 500px;
  margin: 10px;
  display: flex;
  flex-direction: column;
`

export default App
