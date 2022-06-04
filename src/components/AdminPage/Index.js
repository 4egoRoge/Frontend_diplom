import React from "react";
import {Link, Route, Routes, Navigate} from "react-router-dom";
import './AdminPage.scss';
import AdminSettings from "./AccountSettings";
import CreateNewTest from "./CreateNewTest";
import ListExpert from "./ListExpert";
import ListTest from "./ListTest";
import RegisterExpert from "./RegisterExpert";
import ResultTest from "./ResultTest";

const AdminContainer = () => {
    return(
        <div className="admin-panel">
            <aside>
                <div>
                    <Link to="/admin/account">Настройки аккаунта</Link>
                </div>
                <div>
                    <Link to="/admin/create-test">Создать новый тест</Link>
                </div>
                <div>
                    <Link to="/admin/list-tests">Список доступных тестов</Link>
                </div>
                <div>
                    <Link to="/admin/result-tests">Результат тестов</Link>
                </div>
                <div>
                    <Link to="/admin/register-expert">Зарегестрировать эксперта</Link>
                </div>
                <div className="last">
                    <Link to="/admin/list-experts">Список экспертов</Link>
                </div>
            </aside>
            <article>
                <Routes>
                    <Route path="" element={<Navigate to="/admin/account" replace={false}/>} />
                    <Route path="account" element={<AdminSettings />} />
                    {/*<Route path="create-test" element={<CreateNewTest />} />*/}
                    <Route path="list-experts" element={<ListExpert />} />
                    <Route path="list-tests" element={<ListTest />} />
                    <Route path="register-expert" element={<RegisterExpert />} />
                    <Route path="result-tests" element={<ResultTest />} />
                </Routes>
            </article>
        </div>

    )
}

export default AdminContainer;