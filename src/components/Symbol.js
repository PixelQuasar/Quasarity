import React from "react"

class Symbol extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div style={{width: this.props.width+"px"}} className={this.props.type}>{this.props.symbol}</div>
        )
    }
}

export default Symbol