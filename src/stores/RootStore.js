import {types} from "mobx-state-tree";
import {createContext, useContext} from "react";
import {authStore} from "./AuthStore/AuthStore";

const RootStoreModel = types.model("rootStore",{
    authStore: authStore
})

export const RootStore = RootStoreModel.create(
    {
        authStore: {
            status: ""
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