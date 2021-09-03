import axios from "axios";
import {GET_USER} from "../types";

export const getUser = (setIsLoading) => async dispatch => {
    setIsLoading(true)
    const user = await axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data)
    dispatch({type: GET_USER, payload: user})
    setIsLoading(false)
}
