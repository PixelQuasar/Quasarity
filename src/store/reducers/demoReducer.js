function reducer(state, action) {
    switch(action.type) {
        case "demo": return { demoValue: action.value }
        case "nextQuote": return { text: action.value }
        default: return state
    }
}

export default reducer