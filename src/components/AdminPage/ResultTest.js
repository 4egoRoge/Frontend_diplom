import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Table} from "@mantine/core";
import {UseMST} from "storePath/RootStore";
import {listTestResultStore} from "storePath/ListTestResultStore/ListTestResultStore";

const ResultTest = observer(() => {

    const {listTestResultStore}=UseMST();

    listTestResultStore.listTestResult.map( () => {
        })

        useEffect(() => {
            listTestResultStore.getListTestResult()
        },[])

        const ths = (
            <tr>
                <th>Дата</th>
                <th>Пользователь</th>
                <th>История чата</th>
                <th>Ответы на вопросы</th>
            </tr>
        );

        const rows = listTestResultStore.listTestResult.map((element) => {

            return(<tr key={element.id}>
                <td>{element.date}</td>
                <td>{element.user_id}</td>
                <td>{element.chat_history}</td>
                <td>{element.questions_answers}</td>
            </tr>)
        });

        return(
            <Table>
                <caption>Результаты тестов</caption>
                <thead>{ths}</thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    }
)

export default ResultTest;