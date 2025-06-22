import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://disposable-chatroom.onrender.com/api",
    withCredentials: true,
});