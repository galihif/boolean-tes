const initialState = {
    counter: 100,
    isLogged: false
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "CHANGECOUNT":
            return {
                ...state,
                counter: action.data
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