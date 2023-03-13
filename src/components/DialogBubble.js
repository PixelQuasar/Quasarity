import React, { startTransition } from "react";
import './Dialog.scss'

class dialogBubble extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            text: "",
            currentIndex: 0,
            currentText: "",
            time: 10,
        }
    }
    static getDerivedStateFromProps (props, state) {
        return {
            text: props.text,
            time: 20
        }
    } 
    render () {
        return (
            <div className="dialog-container">
                {this.state.currentText}
            </div>
        )
    }
    componentDidMount () {
        this.setState({currentIndex: this.state.currentIndex + 1})
        
    }
    componentDidUpdate () {
        if (this.state.currentIndex <= this.state.text.length) {
            setTimeout(() => {
                this.setState({currentText: this.state.text.slice(0, this.state.currentIndex)})
                this.setState({currentIndex: this.state.currentIndex + 1})
            }, this.state.time)
        }
    }
}

export default dialogBubble