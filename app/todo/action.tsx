import { getData } from "../utils/action";

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJNYXVsYW5hIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE3MDI1NDQzOTEsImV4cCI6MTcwMjU0Nzk5MX0.nEr8hNxs6MK1vbgzl4_Qa9q_1JSoHqCt-jZFpLDRQyU";

export const fetchData = async (token:any) => {
    const req = await getData('http://localhost:9000/todo', token);
    const res = req.data.data;
    return res;
 }