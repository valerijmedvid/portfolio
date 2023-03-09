import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TagManager from 'react-gtm-module'
import './assets/css/index.css'

const tagManagerArgs = {
  gtmId: 'GTM-P4BNFDN',
}

TagManager.initialize(tagManagerArgs)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
