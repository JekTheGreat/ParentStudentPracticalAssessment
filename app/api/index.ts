import axios from 'axios';

const parents_students = {
  getParentList: async () => {
    const jsonData = await axios.get(`https://671992927fc4c5ff8f4dc689.mockapi.io/api/v1/parent`);
    const result = jsonData?.data;
    return result;
  },
  getParent: async (id: string) => {
    const jsonData = await axios.get(`https://671992927fc4c5ff8f4dc689.mockapi.io/api/v1/parent/${id}`);
    const result = jsonData?.data;
    console.log('result', result);
    return result;
  },
  getStudentList: async (parentId: string) => {
    const jsonData = await axios.get(`https://671992927fc4c5ff8f4dc689.mockapi.io/api/v1/parent/${parentId}/student`);
    const result = jsonData?.data;
    return result;
  },
  getStudent: async (parentId: string, studentId: string) => {
    const jsonData = await axios.get(`https://671992927fc4c5ff8f4dc689.mockapi.io/api/v1/parent/${parentId}/student/${studentId}`);
    const result = jsonData?.data;
    return result;
  },
};

export default parents_students;
