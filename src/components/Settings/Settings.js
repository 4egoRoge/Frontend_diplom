import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {ActionIcon, Group} from "@mantine/core";
import {History, Home, Users} from "tabler-icons-react";

const Settings = observer(() => {
    return (
        <>
            {/*<Group position="center" spacing="xl" style={{
                marginTop: "2%"
            }}>
                <ActionIcon component="a" href="#/home" size={80}>
                    <Home size={48} color={'white'}/>
                </ActionIcon>
                <ActionIcon component="a" href="#/experts" size={80}>
                    <Users size={48} color={'white'}/>
                </ActionIcon>
                <ActionIcon size={80}>
                    <History size={80} color={'#F7C978'}/>
                </ActionIcon>
                <ActionIcon size={80}>
                    <Settings size={48} color={'white'}/>
                </ActionIcon>
            </Group>*/}
        </>
    )
}
)

export default Settings;