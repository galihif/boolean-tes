const initialState = {
    isLogged: false,
    userId: "",
    userRole: "",
    venueData: {},
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
        case "setVenueData":
            return {
                ...state,
                venueData: action.venueData
            }
        default: 
        return state
    }
}

export default rootReducer