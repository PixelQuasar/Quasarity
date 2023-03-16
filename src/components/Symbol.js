import React from "react"
import './symbol.scss'
class Symbol extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div style={{width: this.props.data.width+"px"}} className={`${this.props.data.type} symbol`}>{this.props.data.value}</div>
        )
    }
}

export default Symbol