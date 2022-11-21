import { renderReact } from 'hypernova-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//import './index.css'

function Main(){
  return (
    <App />
  )
}

export default renderReact("Main", Main)

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
