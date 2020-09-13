import axios from "axios";
import{
    CHAT_LOADING,
    CHAT_SUCCESS,
    CHAT_FAILURE,
    CHAT_LIST_LOADING,
    CHAT_LIST_SUCCESS,
    CHAT_LIST_FAILURE,
} from '../actions/constants';
import { SERVERURL } from '../../config';

export function chatLoading(){
    return{
        type:CHAT_LOADING,
    };
}
export function chatSuccess(payload){
    return{
        type:CHAT_SUCCESS,
        payload:payload,
    };
}
export function chatFailure(payload){
    return{
        type:CHAT_FAILURE,
        payload:payload,
    };
}

export function chatInsert(chatdetails){
    const data=chatdetails;
    return (dispatch)=>{
        dispatch(chatLoading());
        axios({
            method:"POST",
            headers:{
                'Accept': 'appication/json',
                'Content-Type':'application/json',
            },
            url:`${SERVERURL}chatinsert`,
            crossDomain: true,
            data,
        }).then((res)=>{
            if (res.status === 200){
                dispatch(chatSuccess(res.data));
            }
            else if (res.status === 201){
                Toast.show(res.data.message,2000);
            }
        }).catch((error)=>{
            if(error.response.status === 400){
                //console.log(error);
                dispatch(chatFailure(error.response));
            }
        });
    };
}

export function chatListLoading(){
    return{
        type:CHAT_LIST_LOADING,
    };
}
export function chatListSuccess(payload){
    return{
        type:CHAT_LIST_SUCCESS,
        payload:payload,
    };
}
export function chatListFailure(payload){
    return{
        type:CHAT_LIST_FAILURE,
        payload:payload,
    };
}
export function chatList(data){
    return (dispatch)=>{
        dispatch(chatListLoading());
        axios({
            method:"POST",
            headers:{
                'Accept': 'appication/json',
                'Content-Type':'application/json',
            },
            url:`${SERVERURL}chatlist`,
            crossDomain: true,
            data,
        }).then((res)=>{
            console.log(res.data)
            if (res.status === 200){
                dispatch(chatListSuccess(res.data));
            }
        }).catch((error)=>{
            if(error.response.status === 400){
                dispatch(chatListFailure(error.response));
            }
        });
    };
}