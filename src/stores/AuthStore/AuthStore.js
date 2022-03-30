import {types} from "mobx-state-tree";
import axios from "axios";

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
                console.log(response)
            });
    }
}))

