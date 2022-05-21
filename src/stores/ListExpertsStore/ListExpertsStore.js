import {types} from "mobx-state-tree";
import React from "react";
import axios from "axios";
import listTest from "../../components/AdminPage/ListTest";

export const listExpertsStore = types.model({
        status: types.string,
        listExperts: types.array(types.model({
            id: types.string,
            email: types.string,
            password: types.string,
            name: types.string,
            surname: types.string,
            gender: types.integer
        }))
    }
).actions(self => ({
    setListExperts(list) {
        console.log(list)
        self.listExperts = list
    },
    getListExperts(email,password,name,surname,gender) {
        axios.post('https://api.future-mission.ru/v1/users/getAllUsers', {
            email: email, password: password, name: name, surname: surname, gender: gender
        }).then( response => {
            console.log(response)
            this.setListExperts(response.data)
        })
    }
}))