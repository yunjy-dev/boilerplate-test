import axios from "axios";
import {
    LOGIN_USER
} from '../_actions/types';

export default function (previousState = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...previousState, loginSuccess: action.payload}
            break;
    
        default:
            return previousState;
    }
}