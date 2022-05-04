import {types} from "mobx-state-tree";
import React from "react";
import axios from "axios";
import listTest from "../../components/AdminPage/ListTest";

export const listTestStore = types.model({
    status: types.string,
    listTest: types.array(types.model({
        id: types.number,
        title: types.string,
        object: types.string,
        type: types.string
    }))
}
).actions(self => ({
    setListTest(list) {
        self.listTest = list
    },
    getListTest(title,object,type) {
        axios.post('https://api.future-mission.ru/v1/tasks/getTasks', {
            title: title, object: JSON.stringify(object), type: type
        }).then( response => {
            console.log("sadsd", response)
            this.setListTest(response.data)
        })
    }
}))