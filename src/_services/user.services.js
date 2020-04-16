import { baseUrl } from '../baseURL';
import Axios from 'axios';

export const userService = {
    classify
};

function classify(link) {
    const url = baseUrl + 'predict';
    const data = {
        url: link
    }
    return Axios({
        method: 'post',
        url: url,
        data: data,
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
        else {
            const error = (response.data) || response.status;
            return Promise.reject(error);
        }
    }, error => {
        const err = error.response.status;
        return Promise.reject(err);
    });
}