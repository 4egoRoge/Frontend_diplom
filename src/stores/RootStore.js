import {types} from "mobx-state-tree";
import {createContext, useContext} from "react";
import {authStore} from "./AuthStore/AuthStore";
import {registerStore} from "storePath/RegisterStore/RegisterStore";
import {createNewTestStore} from "storePath/CreateNewTestStore/CreateNewTestStore";
import {listTestStore} from "storePath/ListTestStore/ListTestStore";
import {listTestResultStore} from "storePath/ListTestResultStore/ListTestResultStore";
import {listExpertsStore} from "storePath/ListExpertsStore/ListExpertsStore";

const RootStoreModel = types.model("rootStore",{
    authStore: authStore,
    registerStore: registerStore,
    createNewTestStore: createNewTestStore,
    listTestStore: listTestStore,
    listTestResultStore: listTestResultStore,
    listExpertsStore: listExpertsStore,
    /*historyTestsStore: historyTestsStore*/
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
        },
        listTestResultStore: {
            status: "",
            listTestResult: []
        },
        listExpertsStore: {
            status: "",
            listExperts: []
        },
        /*historyTestsStore: {
            status: "",
            historyTests: []
        },*/
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