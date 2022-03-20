import React from "react";
import {Link} from "react-router-dom";
import './AdminPage.scss';

const ListExpert = () => {
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
            <h1>Список экспертов</h1>
        </article>
        </body>
    )
}

export default ListExpert;