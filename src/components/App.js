import React, {useState} from "react";
import {Route, HashRouter as Router, Routes} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import {createHashHistory} from "history";
import {Provider, RootStore} from "storePath/RootStore";
import AdminContainer from "./AdminPage";
import Room from "./Room/Room";
import Home from "./Home/Home";
import { ModalsProvider } from '@mantine/modals';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import Experts from "./experts/experts";
import HistoryTests from "./HistoryTests/HistoryTests";
import Settings from "./Settings/Settings";

const App = () => {
    const history = createHashHistory();
   /* const [colorScheme, setColorScheme] = useState<ColorScheme>('space');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'space' : 'standard'));*/
    return (
        <>
            {/*<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>*/}
            <MantineProvider
                /*theme={{
                    colorScheme: ['standard', 'space'],
                    backgroundColor: {
                        standard: [
                            '#5B5B5B',
                            ],
                        space: [
                            'linear-gradient(90deg, #5F72BD 0%, #9B23EA 100%)'
                        ]
                    }
                }}
                withGlobalStyles
                withNormalizeCSS*/
            >
                <ModalsProvider>
                    <Provider value={RootStore}>
                        <Router history={history}>
                            <Routes>
                                <Route path="/auth" element={<LoginPage />}/>
                                <Route path="/admin/*" element={<AdminContainer />}/>
                                <Route path="/history-tests" element={<HistoryTests />}/>
                                <Route path="/room" element={<Room />}/>
                                <Route path="/home" element={<Home />}/>
                                <Route path="/experts" element={<Experts />}/>
                                <Route path="/settings" element={<Settings />}/>
                            </Routes>
                        </Router>
                    </Provider>
                </ModalsProvider>
            </MantineProvider>
            {/*</ColorSchemeProvider>*/}
        </>
            );
        }

export default App;