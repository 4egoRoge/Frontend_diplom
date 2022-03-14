import React from "react";
import {Route, Router} from "react-router";
import LoginPage from "./Login/LoginPage";
import {createHashHistory} from "history";
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
    return (
        <>
            <div>
                <ChakraProvider>
                        <LoginPage />
                </ChakraProvider>
            </div>
        </>
            );
        }

export default App;