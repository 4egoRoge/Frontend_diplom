import React, {useEffect} from "react";
import {Table, Text} from '@mantine/core';
import * as elements from "zod";
import {UseMST} from "storePath/RootStore";
import {listTestStore} from "storePath/ListTestStore/ListTestStore";
import {observer} from "mobx-react-lite";

const ListTest = observer(() => {

    const {listTestStore}=UseMST();

    listTestStore.listTest.map( () => {
    })

    useEffect(() => {
        listTestStore.getListTest()
    },[])

    const ths = (
        <tr>
            <th>Название</th>
            <th>Объект</th>
            <th>Тип</th>
        </tr>
    );

    const rows = listTestStore.listTest.map((element) => {

        return(<tr key={element.id}>
            <td>{element.title}</td>
            <td>{element.title}</td>
            <td>{element.type}</td>
        </tr>)
});

    return(
    <Table>
        <caption>Список тестов</caption>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
    </Table>
    )
}
)

export default ListTest;