import api from './api';

const createSubmission = async (submissionData) => {
  const response = await api.post('/submissions', submissionData);
  return response.data;
};

const getAllSubmissions = async (page = 1, limit = 10) => {
  const response = await api.get(`/submissions?page=${page}&limit=${limit}`);
  return response.data;
};

// const getUserSubmissions = async () => {
//   const response = await api.get('/submissions/me');
//   return response.data;
// };
// Function to fetch user submissions
export const getUserSubmissions = async () => {
  try {
    const response = await api.get('/submissions/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

const submissionService = {
  createSubmission,
  getAllSubmissions,
  getUserSubmissions,
};

export default submissionService; 