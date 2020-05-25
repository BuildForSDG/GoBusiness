import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS,SET_CURRENT_USER,USER_LOADING } from './types';
import { dispatch } from 'rxjs/internal/observable/pairs';

// SignUp User
export const signUpUser = ( userData,history ) => dispatch => {
    axios.post("/signup",userData)
         .then(res => history.push("/signin")) // re-direct to signin on successful signup
         .catch(err => dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         }));
};

// Signin - get user token
export const signInUser = userData => dispatch => {
    axios.post("/signin", userData)
         .then(res => {
             // Save to localStorage
             // Set token to localStorage
             const { token } = res.data;
             localStorage.setItem("jwtToken", token );
             // Set token to Auth header
             setAuthToken( token );
             // Decode token to get user data
             const decoded = jwt_decode( token );
             // Set current user
             dispatch(setCurrentUser( decoded ));
         })
         .catch(err => {
             dispatch({
                 type: GET_ERRORS,
                 payload: err.response.data
             })
         });
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log sign out
export const signOutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    //Remove auth header for future requests
    setAuthToken( false );
    // Set current user to empty object {} which will set isAutheticated to false
    dispatch( setCurrentUser({}) );
};