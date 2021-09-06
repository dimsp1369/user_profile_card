import {CREATE_PROFILE, CURRENT_PAGE, OPEN_FORM, PAGINATE, UPDATE_PROFILE} from "../types";

export const openForm = (openBool, updateBool = false, data = {}) => ({
    type: OPEN_FORM,
    payload: {openBool, updateBool, data}
})

export const createProfile = (user) => ({
    type: CREATE_PROFILE,
    payload: user
})

export const updateProfile = (data, id) => ({
    type: UPDATE_PROFILE,
    payload: {data, id}
})

export const paginate = () => ({type: PAGINATE})
export const openCurrentPage = (number) => ({
    type: CURRENT_PAGE,
    payload: number
})
