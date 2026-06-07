import axios from "axios";


const apiService = axios.create({
    baseURL: 'http://localhost:5000/api/flashcard',
    withCredentials:true
});


const getAllFlashCard = async () => {
    return await apiService.get('/');
   
};

const generateFlashCard = async (text) => {
    return await apiService.post('/generate',{text});
   
};

const saveFlashCard = async (question, answer, subject) => {
    return await apiService.post('/',{question, answer, subject});
   
};

const deleteFlashCard = async (id) => {
    return await apiService.delete(`/${id}`);
};


export {
    getAllFlashCard,
    generateFlashCard,
    deleteFlashCard,
    saveFlashCard
};
