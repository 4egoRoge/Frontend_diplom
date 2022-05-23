import {types} from "mobx-state-tree";
import React from "react";
import axios from "axios";

export const registerStore = types.model({
    status: types.string
}
).actions(self => ({
    tryRegister(email,password,name,surname,gender) {
        axios.post('https://api.future-mission.ru/v1/auth/register',{
            email: email, password: password, name: name, surname: surname, gender: gender
        }).then( response => {
            console.log(response)
            location.reload()
        })
    }
}))