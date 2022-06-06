import {API_URL, PAGE_URL} from "./urls";

class FetchClass {
    constructor(){

    }

    post(url, data){
        return fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 401) {
                    document.location.href = `${PAGE_URL}/login`;
                } else {
                    return response.json();
                }
            })
    }

    postLogin(url, data){
        return fetch(`https://video.future-mission.ru/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }

    put(url, data){
        return fetch(`${API_URL}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 401) {
                    document.location.href = `${PAGE_URL}/login`;
                } else {
                    return response.json();
                }
            })
    }

    get(url){
        return fetch(`${API_URL}${url}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                if (response.status === 401) {
                    document.location.href = `${PAGE_URL}/login`;
                } else {
                    return response.json();
                }
            })
    }

    delete(url){
        return fetch(`${API_URL}${url}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(response => {
                if (response.status === 401) {
                    document.location.href = `${PAGE_URL}/login`;
                } else {
                    return response.json();
                }
            })
    }
}

const Fetch = new FetchClass();
export default Fetch;