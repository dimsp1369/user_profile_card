import {CREATE_PROFILE, CURRENT_PAGE, GET_USER, OPEN_FORM, PAGINATE, UPDATE_PROFILE} from "../types";

const initialState = {
    users: [],
    currentUser: {},
    isFormOpen: false,
    isUpdate: false,
    pagination: {
        currentPage: 1,
        cardPerPage: 15,
        pageNumber: [],
        currentCards: []
    }
}

const reducer = (state = initialState, action) => {
    let newUsers = [...state.users]
    let newCurrentCards = [...state.pagination.currentCards]
    const newPageNumber = [...state.pagination.pageNumber]
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
            newUsers.push(action.payload)
            return {...state, users: newUsers, currentUser: {}, isFormOpen: false}
        case UPDATE_PROFILE:
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.id ? Object.assign({}, el, action.payload.data) : el),
                isFormOpen: false,
                isUpdate: false
            }
        case PAGINATE:
            newCurrentCards = newUsers.slice(0, state.pagination.cardPerPage)
            for (let i = 1; i <= Math.ceil(state.users.length / state.pagination.cardPerPage); i++) {
                if (!state.pagination.pageNumber.includes(i)) newPageNumber.push(i)
            }
            return {
                ...state,
                pagination: {...state.pagination, pageNumber: newPageNumber, currentCards: newCurrentCards}
            }
        case CURRENT_PAGE:
            const indexOfLastCard = action.payload * state.pagination.cardPerPage;
            const indexOfFirstCard = indexOfLastCard - state.pagination.cardPerPage;
            newCurrentCards = newUsers.slice(indexOfFirstCard, indexOfLastCard)
            return {
                ...state,
                pagination: {...state.pagination, currentPage: action.payload, currentCards: newCurrentCards}
            }
        default:
            return state
    }
}

export default reducer
