import React, { startTransition } from "react";
import store from "../store/store";
import './Dialog.scss'
import nextQuoteActionCreator from '../store/actionCreators/nextQuoteActionCreator.js'
class dialogBubble extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            text: "",
            currentIndex: 0,
            currentText: "",
            time: 15,
            currentQuoteIndex: 0,
            nextQuote: "",
            quoteStatus: false,

            dialogScript: [
                "Привет! Это реплика 1. Нажми еще раз если хочешь ее пропустить.",
                "А это реплика 2! ",
                "Реплика 3. Тест реплик.",
                "Реплика 4. Последняя реплика!",
            ]
        }
    }
    componentDidMount () {
        store.dispatch(nextQuoteActionCreator(this.state.dialogScript[0]))

        this.setState({
            currentIndex: this.state.currentIndex + 1,
            text: store.getState().text,
            currentIndex: 0,
            currentQuoteIndex: 0,
            nextQuote: this.state.dialogScript[1],
            quoteStatus: false
        })

        store.subscribe(() => {
            const quote = store.getState().text
            this.setQuote(quote)
        })
        
    }
    setQuote = (quote) => {
        this.setState({
            text: quote,
            currentText: "",
            currentIndex: 0,
            currentQuoteIndex: this.state.currentQuoteIndex+1,
            nextQuote: this.state.dialogScript[this.state.currentQuoteIndex+2]
        })
    }
    componentDidUpdate () {
        if (this.state.currentIndex != this.state.text.length) {
            setTimeout(() => {
                this.setState({
                    currentText: this.state.text.slice(0, this.state.currentIndex),
                    currentIndex: this.state.currentIndex+1
                })
            }, this.state.time)
        }
        else if (this.state.currentIndex == this.state.text.length) {
            this.setState({ 
                quoteStatus: true,
                currentIndex: this.state.currentIndex+1
            })
        }
    }
    clickHandler = () => {
        if (this.state.currentQuoteIndex <= this.state.dialogScript.length-2) {
            if (this.state.quoteStatus) {
                store.dispatch(nextQuoteActionCreator(this.state.nextQuote))
            }
            else {
                this.setState({
                    quoteStatus: true,
                    currentIndex: this.state.text.length-1
                })
            }
        }
    }
    render () {
        return (
            <div className="dialog-window" onClick={this.clickHandler}>
                <div className="dialog-container">
                    {this.state.currentText}
                </div>
            </div>
        )
    }

}

export default dialogBubble