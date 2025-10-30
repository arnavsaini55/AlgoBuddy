import api from "./api";


export const getAllQuestions = async () => {
  try {
    const response = await api.get("/questions");
    
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const getQuestionById = async (id: string) => {
  try {
    const response = await api.get(`/questions/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw error;
  }
};


// export const getQuestionById = async (id: string) => {
//   try {
//     const response = await api.get(`/questions/${id}`);
//     return response.data.data || response.data;
//   } catch (error) {
//     console.error("Error fetching question by ID:", error);
//     throw error;
//   }
// };
