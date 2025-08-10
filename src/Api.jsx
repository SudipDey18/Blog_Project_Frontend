import axios from "axios";
import { config } from './config';

const api_url =  config.API_URL || `http://localhost:3018`;

export const isLogin = (data)=> axios.get(`${api_url}/user/verify/${data.Token}`);
export const createUser = (data)=> {return axios.post(`${api_url}/user/signup`,data)}
export const loginUser = (data)=> {return axios.post(`${api_url}/user/login`,data)}
export const createBlog = (data)=> {return axios.post(`${api_url}/blogs/create`,data)}
export const viewBlogs = ()=> {return axios.get(`${api_url}/blogs/view`)}
export const blogData = (id) => {return axios.get(`${api_url}/blogs/blog/'${id}'`)}
export const likeUpdate = (data) => {return axios.put(`${api_url}/blogs/blog/like`,data)}
export const deleteBlog = (data) => {return axios.post(`${api_url}/blogs/blog/delete`,data)}
export const requestSignupOtp = (email) => {return axios.get(`${api_url}/email/signup/requestotp?email=${email}`)}
export const requestForgotPassOtp = (email) => {return axios.get(`${api_url}/email/forgotpass/requestotp?email=${email}`)}
export const forgotPassword = (data) => {return axios.post(`${api_url}/user/forgotpass`,data)}
