import axios from "axios";

const baseUrl = 'https://localhost:7214/api/';

export default axios.create({
    baseURL: baseUrl
});

export const axiosPrivate = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});