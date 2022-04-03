import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, deleteCookie } from "../../shared/Cookie";

// action
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// action creators
const logIn = createAction(LOG_IN, (user) => ({ user: user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// middlewares
const loginAction = (user) => {
    return function (dispatch, getState, {history}){
        dispatch(logIn(user));
        history.push('/')
    }
}

const logoutAction = (user) => {
    return function (dispatch, getState, {history}){
        dispatch(logOut(user));
        history.push('/')
    }
}

// initialState
const initialState = {
    user: null,
    is_login: false,
};

// reducer
export default handleActions(
    {
        [LOG_IN]: (state, action) => produce(state, (draft) => {
            setCookie("is_login", "success");
            console.log(action.payload)
            draft.user = action.payload.user;
            draft.is_login = true;
        }),
        
        [LOG_OUT]: (state, action) => produce(state, (draft) => {
            deleteCookie("is_login");
            draft.user = null;
            draft.is_login = false;
        }),
        
        [GET_USER]: (state, action) => produce(state, (draft) => {}),
    },
    initialState
);

const actionCreators = {
    logIn,
    getUser,
    logOut,
    loginAction,
    logoutAction,
};
  
export { actionCreators };