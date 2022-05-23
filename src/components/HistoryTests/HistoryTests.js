import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {ActionIcon, Box, Grid, Group, Text, Title, Collapse} from "@mantine/core";
import {UseMST} from "storePath/RootStore";
import {ArrowDownRight, ArrowsDiagonalMinimize, History, Home, Plus, Settings, Users} from "tabler-icons-react";

const HistoryTests = observer(() => {

    const {historyTestsStore}=UseMST();
    const [opened, setOpen] = useState(false);

    return (
        <>
        <Group position="center" spacing="xl" style={{
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
        </Group>
            <Box style={{
                position: "absolute", width: "63%",/* background: "red",*/ height: "100px",
                marginLeft: "19%"}}>
    <Collapse in={close}
        style={{width: "100%", background: "#37CEBF",borderRadius: "10px", marginTop:'3%'/*, marginBottom: '3%'*/}}>
        <Grid columns={8}>
            <Grid.Col span={3} >
                <Text style={{
                    marginLeft: "4%",
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    paddingTop: "5%",
                }}>
                    12/02/2222
                </Text>
                <Title order={3} style={{
                    marginLeft: "4%",
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '32px',
                    lineHeight: '39px',
                    color: '#FFFFFF',
                    paddingTop: "5%",
                }}>Эксперт:</Title>
                <Text style={{
                    marginLeft: "4%",
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '300',
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                    marginTop: "5%",
                    marginBottom: "5%"
                }}>Иванов Иван</Text>
            </Grid.Col>
            <Grid.Col span={1}>
                <Text style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                    marginTop: "37%",
                }}>3</Text>
            </Grid.Col>
            <Grid.Col span={1} offset={3}>
                <ActionIcon onClick={() => setOpen((o) => !o)} variant="outline" size={90} style={{border: "3px solid #FFFFFF",
                    borderRadius: "5px", marginLeft: "20%", marginTop: "40%"}}>
                    <ArrowsDiagonalMinimize color={'white'} size={70}/>
                </ActionIcon>
            </Grid.Col>
        </Grid>
    </Collapse>
                <Collapse in={opened} style={{background: "black", paddingTop: '0'}}>
                    1111
                </Collapse>
            </Box>
        </>
    )
}
)
export default HistoryTests;