import {CREATE_PROFILE, GET_USER, OPEN_FORM, UPDATE_PROFILE} from "../types";

const initialState = {
    users: [],
    currentUser: {},
    isFormOpen: false,
    isUpdate: false,
}

const reducer = (state = initialState, action) => {
    let newUsers = [...state.users]
    switch (action.type) {
        case GET_USER:
            return {...state, users: action.payload}
        case OPEN_FORM:
            return {
                ...state,
                currentUser: action.payload.data,
                isFormOpen: action.payload.openBool,
                isUpdate: action.payload.updateBool
            }
        case CREATE_PROFILE:
            newUsers.unshift(action.payload)
            return {...state, users: newUsers, currentUser: {}, isFormOpen: false}
        case UPDATE_PROFILE:
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.id ? Object.assign({}, el, action.payload.data) : el),
                isFormOpen: false,
                isUpdate: false
            }
        default:
            return state
    }
}

export default reducer
