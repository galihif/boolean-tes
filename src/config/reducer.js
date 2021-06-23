const initialState = {
    isLogged: false,
    userRole: "",
    userData: {},
    venueData: {},
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                isLogged: true,
                userData: action.userData,
                userRole: action.userRole
            }
        case "LOGOUT":
            return {
                ...state,
                isLogged: false,
                userData: {},
                userRole:""
            }
        case "setVenueData":
            return {
                ...state,
                venueData: action.venueData
            }
        case "changeUserName":
            return {
                ...state,
                userData: action.userData
            }
        default: 
        return state
    }
}

export default rootReducer