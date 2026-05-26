import axios from "axios";


const apiService = axios.create({
    baseURL: 'http://localhost:5000/api/flashcard',
    withCredentials:true
});


const getAllFlashCard = async () => {
    return await apiService.get('/');
   
};

export {
    getAllFlashCard
};
