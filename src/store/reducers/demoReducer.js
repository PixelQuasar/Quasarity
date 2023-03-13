function reducer(state, action) {
    switch(action.type) {
        case "demo": return { demoValue: action.value }
        
        default: return state
    }
}

export default reducer