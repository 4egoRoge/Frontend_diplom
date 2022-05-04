import {types} from "mobx-state-tree";
import {createContext, useContext} from "react";
import {authStore} from "./AuthStore/AuthStore";
import {registerStore} from "storePath/RegisterStore/RegisterStore";
import {createNewTestStore} from "storePath/CreateNewTestStore/CreateNewTestStore";
import {listTestStore} from "storePath/ListTestStore/ListTestStore";

const RootStoreModel = types.model("rootStore",{
    authStore: authStore,
    registerStore: registerStore,
    createNewTestStore: createNewTestStore,
    listTestStore: listTestStore
})

export const RootStore = RootStoreModel.create(
    {
        authStore: {
            status: ""
        },
        registerStore: {
            status: ""
        },
        createNewTestStore: {
            status: ""
        },
        listTestStore: {
            status: "",
            listTest: []
        }
    }
)

const RootStoreContext = createContext(null);
export const Provider = RootStoreContext.Provider;

export function UseMST(){
    const Store = useContext(RootStoreContext);
    if (Store === null) {
        throw new Error("Store cannot be null, please add a context provider")
    }
    return Store
}