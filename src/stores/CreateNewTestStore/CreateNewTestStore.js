import {types} from "mobx-state-tree";
import React from "react";
import axios from "axios";

export const createNewTestStore = types.model({
        status: types.string
    }
).actions(self => ({
    tryCreateNewTest(title,object,type) {
        axios.post('https://api.future-mission.ru/v1/tasks/addTask', {
            title: title, object: JSON.stringify({zzz: object}), type: type
        }).then( response => {
            console.log(response)
        })
    }
}))