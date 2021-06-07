const initialState = {
    isLogged: false,
    userId: "",
    userRole: "",
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                isLogged: true,
                userId: action.userId,
                userRole: action.userRole
            }
        case "LOGOUT":
            return {
                ...state,
                isLogged: false,
                userId: "",
                userRole:""
            }
        default: 
        return state
    }
}

export default rootReducer