import {types} from "mobx-state-tree";

export const authStore = types.model({
    status: types.string
}
).actions(self => ({
    changeStatus(status) {
        console.log(status)
        self.status = status
    }
}))