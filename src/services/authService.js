import axios from 'axios';

export const register =(object)=>{
    return axios.post('/auth/register',object)
}

export const login =(object)=>{
    return axios.post('/auth/login',object)
}
export const logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}