import App, {Container} from 'next/app'
import React from 'react'
import withMobxStore from '../mobx/with-mobx-store'
import { Provider } from 'mobx-react'
import '../styles/styles.css'


interface Props {
  mobxStore: any
}

class MyApp extends App<Props> {
  render () {
    const {Component, pageProps, mobxStore} = this.props
    
    return (
      <Container>
        <Provider store={mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withMobxStore(MyApp)
