import React, { startTransition } from "react";
import store from "../store/store";
import './Dialog.scss'
import nextQuoteActionCreator from '../store/actionCreators/nextQuoteActionCreator.js'
import Symbol from "./Symbol";
class dialogBubble extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            text: "",
            currentIndex: 0,
            currentText: [],
            time: 15,
            currentQuoteIndex: 0,
            nextQuote: "",
            quoteStatus: false,
            symbolWidth: 15,

            dialogScript: [
                "Hi! This's quote 1. Click anywhere to skip or reach the next quote. Enjoy!",
                "And this is quote 2!",
                "Quote number 3. Just a test.",
                "Quote 4! The last quote for now.",
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
            currentText: [],
            currentIndex: 0,
            currentQuoteIndex: this.state.currentQuoteIndex+1,
            nextQuote: this.state.dialogScript[this.state.currentQuoteIndex+2]
        })
    }
    componentDidUpdate () {
        if (this.state.currentIndex < this.state.text.length) {
            setTimeout(() => {
                this.setState({
                    currentText: [...this.state.currentText, {
                        id: this.state.currentIndex,
                        type: "default",
                        value: this.state.text[this.state.currentIndex],
                        width: this.state.symbolWidth
                    }],
                    currentIndex: this.state.currentIndex+1
                })
            }, this.state.time)
        }
        else if (this.state.currentIndex == this.state.text.length) {
            this.setState({ 
                quoteStatus: true,
                currentIndex: this.state.currentIndex+1,
                time: 15
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
                    time: 0
                })
            }
        }
    }
    render () {
        return (
            <div className="dialog-window" onClick={this.clickHandler}>
                <div className="dialog-container">
                    <div className="dialog-text">{this.state.currentText.map((symbol => <Symbol key={symbol.id} data={symbol}/>))}</div>
                </div>
            </div>
        )
    }

}

export default dialogBubble