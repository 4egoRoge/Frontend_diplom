import React from "react";
import {Route, HashRouter as Router, Routes} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import {createHashHistory} from "history";
import { ChakraProvider } from '@chakra-ui/react'
import {Provider, RootStore} from "storePath/RootStore";


const App = () => {
    const history = createHashHistory();
    return (
        <>
                <ChakraProvider>
                    <Provider value={RootStore}>
                        <Router history={history}>
                            <Routes>
                                <Route path="/auth" element={<LoginPage />}/>
                            </Routes>
                        </Router>
                    </Provider>
                </ChakraProvider>
        </>
            );
        }

export default App;