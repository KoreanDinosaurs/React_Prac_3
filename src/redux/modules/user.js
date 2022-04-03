import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// action
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// middlewares
const loginAction = (user) => {
    return function (dispatch, getState, {history}){
        dispatch(setUser(user));
        history.push('/')
    }
}

const logoutAction = (user) => {
    return function (dispatch, getState, {history}){
        dispatch(logOut(user));
        history.push('/')
    }
}

const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState, {history}){
        createUserWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
            updateProfile(auth.currentUser, {
                displayName: user_name
              }).then(() => {
                // Profile updated!
                dispatch(setUser({user_name, id, user_profile: ''}));
                history.push('/')
              }).catch((error) => {
                console.log(error)
              }); 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
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
        [SET_USER]: (state, action) => produce(state, (draft) => {
            setCookie("is_login", "success");
            draft.user = action.payload.user;
            draft.is_login = true;
        }),
        
        [LOG_OUT]: (state, action) => produce(state, (draft) => {
            deleteCookie("is_login");
            draft.user = null;
            draft.is_login = false;
        }),
        
        [GET_USER]: (state, action) => produce(state, (draft) => {

        }),
    },
    initialState
);

const actionCreators = {
    setUser,
    logOut,
    loginAction,
    logoutAction,
    signupFB,
};
  
export { actionCreators };