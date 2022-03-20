import React from "react";
import {Link} from "react-router-dom";
import './AdminPage.scss';
import RegisterExpert from "./RegisterExpert";

const CreateNewText = () => {
    return(
        <body>
        <aside>
            <div>
                <Link as="router-link" to="/AccountSettings">
                    Настройки аккаунта
                </Link>
            </div>
            <div>
                <Link as="router-link" to="/CreateNewTest">
                    Создать новый тест
                </Link>
            </div>
            <div>
                <Link as="router-link" to="/ListTest">
                    Список доступных тестов
                </Link>
            </div>
            <div>
                <Link as="router-link" to="/ResultTest">
                    Результат тестов
                </Link>
            </div>
            <div>
                <Link as="router-link" to="/RegisterExpert">
                    Зарегестрировать эксперта
                </Link>
            </div>
            <div className="last">
                <Link as="router-link" to="/ListExpert">
                    Список экспертов
                </Link>
            </div>
        </aside>
        <article>
            <h1>Создать новый тест</h1>
        </article>
        </body>
    )
}

export default CreateNewText;