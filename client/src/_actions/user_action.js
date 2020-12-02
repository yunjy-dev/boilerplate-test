import axios from "axios";
import {
    LOGIN_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit).then(response => response.data)

    //return to Reducer(user_reducer.js) with (previousState and action) => nextState
    return {
        type: LOGIN_USER,
        payload: request
    }
}