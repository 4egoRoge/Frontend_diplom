import React from "react";
import {Route, HashRouter as Router, Routes} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import AccountSettings from "./AdminPage/AccountSettings";
import {createHashHistory} from "history";
import { ChakraProvider } from '@chakra-ui/react'
import {Provider, RootStore} from "storePath/RootStore";
import CreateNewTest from "./AdminPage/CreateNewTest";
import ListTest from "./AdminPage/ListTest";
import ResultTest from "./AdminPage/ResultTest";
import RegisterExpert from "./AdminPage/RegisterExpert";
import ListExpert from "./AdminPage/ListExpert";

const App = () => {
    const history = createHashHistory();
    return (
        <>
                <ChakraProvider>
                    <Provider value={RootStore}>
                        <Router history={history}>
                            <Routes>
                                <Route path="/auth" element={<LoginPage />}/>
                                <Route path="/AccountSettings" element={<AccountSettings />}/>
                                <Route path="/CreateNewTest" element={<CreateNewTest />}/>
                                <Route path="/ListTest" element={<ListTest />}/>
                                <Route path="/ResultTest" element={<ResultTest />}/>
                                <Route path="/RegisterExpert" element={<RegisterExpert />}/>
                                <Route path="/ListExpert" element={<ListExpert />}/>
                            </Routes>
                        </Router>
                    </Provider>
                </ChakraProvider>
        </>
            );
        }

export default App;