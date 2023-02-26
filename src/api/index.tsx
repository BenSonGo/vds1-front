import {AUTH_TOKEN} from "../const";
import axios from "axios";

export const api = axios.create({
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
    }
})

export const baseUrl = "http://localhost/api/";
// export const baseUrl = "http://2.59.37.99/api/";
