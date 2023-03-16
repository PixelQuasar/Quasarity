import React from "react"
import DialogBubble from "./components/DialogBubble"
import './main.scss'

class App extends React.Component {
  constructor () {
    super()
    this.state = {

    }
  }

  render () {
    return (
      <div className="app">
        <DialogBubble/>
      </div>
    )
  }
}

export default App