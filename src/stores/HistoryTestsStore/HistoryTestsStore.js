import {types} from "mobx-state-tree";
import axios from "axios";

export const historyTestsStore = types.model({
    status: types.string,
    historyTestsStore: types.array(types.model({
        id: types.string,
        date: types.string,
        user_id: types.string,
        chat_history: types.frozen(),
        questions_answers: types.frozen(),
    }))
}
).actions(self => ({
    setHistoryTests(list) {
        console.log(list)
        self.listTest = list
    },
    getHistoryTest(date,user_id,chat_history,questions_answers) {
        axios.post('https://api.future-mission.ru/v1/results/getResults', {
            date: date, user_id: user_id, chat_history: JSON.stringify(chat_history), questions_answers: JSON.stringify(questions_answers)
        }).then( response => {
            console.log(response)
            this.setHistoryTests(response.data)
        })
    }
}))