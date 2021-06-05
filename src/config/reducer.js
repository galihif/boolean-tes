const initialState = {
    counter: 100,
    isLogged: false
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "INCREMENT":
            return {
                ...state,
                counter: state.counter+1
            }
        case "LOGIN":
            return {
                ...state,
                isLogged: true
            }
        case "LOGOUT":
            return {
                ...state,
                isLogged: false
            }
        default: 
        return state
    }
}

export default rootReducer