import React from "react"
import './symbol.scss'
class Symbol extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className="symbol-container">
                <div style={{width: this.props.data.width+"px"}} className={`${this.props.data.type} symbol`}>{this.props.data.value}</div>
            </div>
        )
    }
}

export default Symbol