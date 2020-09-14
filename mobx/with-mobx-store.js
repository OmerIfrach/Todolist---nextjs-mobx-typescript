import React from 'react'
import TodoStore from './stores/data/todos/todo-store'

const isServer = typeof window === 'undefined'

export default (App) => {
  return class AppWithMobx extends React.Component {
    constructor(props) {
      super(props)
      this.mobxStore = new TodoStore(isServer)
    }

    render() {
      return <App {...this.props} mobxStore={this.mobxStore} />
    }
  }
}
