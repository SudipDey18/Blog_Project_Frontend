import axios from "axios";

const api_url = `https://blog-project-backend-is3l.onrender.com`;
// const api_url = `http://localhost:3018`;

export const isLogin = (data)=> axios.get(`${api_url}/user/verify/${data.Token}`);
export const createUser = (data)=> {return axios.post(`${api_url}/user/signup`,data)}
export const loginUser = (data)=> {return axios.post(`${api_url}/user/login`,data)}
export const createBlog = (data)=> {return axios.post(`${api_url}/blogs/create`,data)}
export const viewBlogs = ()=> {return axios.get(`${api_url}/blogs/view`)}
export const blogData = (id) => {return axios.get(`${api_url}/blogs/blog/'${id}'`)}
export const likeUpdate = (data) => {return axios.put(`${api_url}/blogs/blog/like`,data)}
