import {AUTH_TOKEN} from "../const";
import axios from "axios";

export const api = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
    }
})

export const baseUrl = "http://localhost/api/";
