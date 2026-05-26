import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    withCredentials:true

});

const registerApi = async ( fullName, email, password ) => {
    return await apiService.post('/register', { fullName, email, password } );
}


const loginApi = async ( email, password ) => {
    return await apiService.post('/login', { email, password } );
}

const logoutApi = async ( email, password ) => {
    return await apiService.post('/logout', { email, password } );
}


export  {registerApi, loginApi, logoutApi};
