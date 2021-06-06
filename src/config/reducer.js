const initialState = {
    isLogged: false,
    userId: "",
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                isLogged: true,
                userId: action.data,
            }
        case "LOGOUT":
            return {
                ...state,
                isLogged: false,
                userId: ""
            }
        default: 
        return state
    }
}

export default rootReducer