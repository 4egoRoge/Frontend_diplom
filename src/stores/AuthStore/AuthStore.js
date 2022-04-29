import {types} from "mobx-state-tree";
import axios from "axios";
import React from "react";

export function saveTokenInLocalStorage(token) {
    localStorage.setItem('token', JSON.stringify(token));
}

export const authStore = types.model({
    status: types.string
}
).actions(self => ({
    changeStatus(status) {
        console.log(status)
        self.status = status
    },
    tryLogin(email,password) {
        axios.post('https://api.future-mission.ru/v1/auth/login',{
            email: email, password: password
        }).then( response => {
                saveTokenInLocalStorage(response.data.token);
                console.log(response)
                self.changeStatus("200")
            }).catch( error => {
                console.log(error)
            if (error && parseInt(error.response.status) === 404) {
            self.changeStatus("Неерное имя пользователя или пароль")
            }
        })
    }
}))
