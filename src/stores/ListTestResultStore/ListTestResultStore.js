import {types} from "mobx-state-tree";
import React from "react";
import axios from "axios";

export const listTestResultStore = types.model({
    status: types.string,
    listTestResult: types.array(types.model({
        date: types.string,
        user_id: types.string,
        chat_history: types.frozen(),
        questions_answers: types.frozen()
    }))
}
).actions(self => ({
    setListTestResult(list) {
        console.log(list)
        self.listTestResult = list
    },
    getListTestResult(date,user_id,chat_history,questions_answers) {
        axios.post('https://api.future-mission.ru/v1/results/getResults', {
            date: date, user_id: user_id, chat_history: JSON.stringify(chat_history),questions_answers: JSON.stringify(questions_answers)
        }).then( response => {
            console.log(response)
            this.setListTestResult(response.data)
        })
    }
}))