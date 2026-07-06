import axios from 'axios';

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL +"/api/auth",
    withCredentials:true

});

const registerApi = async ( fullName, email, password ) => {
    return await apiService.post('/register', { fullName, email, password } );
}


const loginApi = async ( email, password ) => {
    return await apiService.post('/login', { email, password } );
}

const logoutApi = async ( ) => {
    return await apiService.post('/logout');
}

const getmeApi = async () => {
    return await apiService.get('/getme' );
}

const userUpdateApi = async (data) => {
    return await apiService.put('/update',data );
}

const userDeleteApi = async () => {
  return await apiService.delete("/delete");
};


export  {registerApi, loginApi, logoutApi, getmeApi,userUpdateApi,userDeleteApi};
