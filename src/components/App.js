import React from "react";
import {Route, Router} from "react-router";
import LoginPage from "./Login/LoginPage";
import {createHashHistory} from "history";

const App = () => {
    return (
        <>
            <div>

                        <LoginPage />
            </div>
        </>
            );
        }

export default App;