import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import Providers from './providers'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
