import axios from "axios";
import Toast from 'react-native-simple-toast';
import{
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    USERLIST_FAILURE,
    USERLIST_LOADING,
    USERLIST_SUCCESS,
    USER_AUTH_SUCCESS,
    USER_AUTH_FAILURE,
} from '../actions/constants';
import { SERVERURL } from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

//For login
export function loginLoading(){
    return{
        type:LOGIN_LOADING,
    };
}

export function loginSuccess(payload){
    return{
        type: LOGIN_SUCCESS,
        payload: payload
    };
}

export function loginFailure(payload){
    return{
        type: LOGIN_FAILURE,
        payload: payload
    };
}

export function userLogin(userinfo){
    const data=userinfo;
    return (dispatch) =>{
        dispatch(loginLoading());
        axios({
            method:'POST',
            headers:{
                'Accept': 'appication/json',
                'Content-Type':'application/json',
            },
            url:`${SERVERURL}loginuser`,
            crossDomain: true,
            // data,  or
            data:userinfo,   
        }).then((res)=>{
            if (res.status === 200){
                const usercredentials=JSON.stringify(res.data);
                AsyncStorage.setItem('usercredentials',usercredentials);

                dispatch(loginSuccess(res.data));
            }
            else if (res.status === 201){
                // Toast.show('Invalid Email address or Password',500);
                Toast.show(res.data.message,500);
            }
        }).catch((error)=>{
            if(error.response.status === 400){
                dispatch(loginFailure(error.response));
            }
        });
    };
}

//For registration
export function registerLoading(){
    return{
        type:REGISTER_LOADING,
    };
}

export function registerSuccess(payload){
    return{
        type: REGISTER_SUCCESS,
        payload: payload
    };
}

export function registerFailure(payload){
    return{
        type: REGISTER_FAILURE,
        payload: payload
    };
}

export function userRegister(userinfo){
    const data=userinfo;
    return (dispatch) =>{
        dispatch(registerLoading());
        axios({
            method:'POST',
            headers:{
                'Accept': 'appication/json',
                'Content-Type':'application/json',
            },
            url:`${SERVERURL}registeruser`,
            crossDomain: true,
            // data,  or
            data:userinfo,   
        }).then((res)=>{
            if (res.status === 200){
                //console.log(res.data);
                const usercredentials=JSON.stringify(res.data);
                AsyncStorage.setItem('usercredentials',usercredentials);

                dispatch(registerSuccess(res.data));
            }
        }).catch((error)=>{
            if(error.response.status === 400){
                //console.log(error);
                dispatch(registerFailure(error.response));
            }
        });
    };
}

//For Display
export function userListLoading(){
    return{
        type: USERLIST_LOADING,
    };
}

export function userListSuccess(payload){
    return{
        type: USERLIST_SUCCESS,
        payload: payload
    };
}

export function userListFailure(payload){
    return{
        type: USERLIST_FAILURE,
        payload: payload
    };
}
export function userList(){
    return (dispatch) =>{
        dispatch(userListLoading());
        axios({
            method:'GET',
            headers:{
                'Accept': 'appication/json',
                'Content-Type':'application/json',
            },
            url:`${SERVERURL}userlist`,
            crossDomain: true,
            // data,  or
            // data:userinfo,   
        }).then((res)=>{
            if (res.status === 200){
                
                dispatch(userListSuccess(res.data));
            }
            else if (res.status === 201){
                Toast.show(res.data.message,2000);
            }
        }).catch((error)=>{
            if(error.response.status === 400){
                //console.log(error);
                dispatch(userListFailure(error.response));
            }
        });
    };
}

//authentication
export function userAuthSuccess(payload){
    return{
        type: USER_AUTH_SUCCESS,
        payload: payload
    };
}

export function userAuthFailure(error){
    return{
        type: USER_AUTH_FAILURE,
        payload: error
    };
}
export function userAuth(){
    return async function(dispatch){
        try{
            AsyncStorage.getItem('usercredentials')
            .then((value)=>{
                const res =JSON.parse(value);
                dispatch(userAuthSuccess(res));
            })
        }catch(error){
            dispatch(userAuthFailure(error))
        }
    }
}
