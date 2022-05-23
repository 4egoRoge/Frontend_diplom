import React, {useEffect, useState} from "react";
import './Home.scss';
import logo from "../../img/logo.png";
import peoples from "../../img/peoples.png";
import camera from "../../img/camera.png";
import clock from "../../img/clock.png";
import settings from "../../img/settings.png";
import {ActionIcon, Box, Grid, Text} from "@mantine/core";
import {History, Settings, Users, Video} from "tabler-icons-react";
import background from "../../img/background.png";

const Home = () => {

    const [date, setDate] = useState(new Date());

    function refreshClock() {
        setDate(new Date());
    }
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);

    const days =["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const months =["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    return(
        <>
        <Box style={{position: "absolute", width: "83%", marginTop: "3%", marginLeft: "8%"}}>
            <Box style={{/*backgroundImage: {background},*/ background: 'linear-gradient(90deg, #F6D365 0%, #FDA085 100%)',borderRadius: "20px"}}>
                <Grid columns={3}>
                    <Grid.Col span={1}>
                        <img src={logo} style={{paddingTop: "4%", paddingBottom: "4%", marginLeft: "10%"}}/>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Text align="center" style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "96px",
                            lineHeight: "116px",
                            color: "#FFFFFF",
                        }}>{date.toLocaleTimeString().slice(0,-3)}</Text>
                        <Text align="center" style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: "300",
                            fontSize: "40px",
                            lineHeight: "48px",
                            color: "#FFFFFF",
                        }}>{days[date.getDay()]}, {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Text>
                    </Grid.Col>
                </Grid>
            </Box>
            <Box style={{paddingTop: '4%'}}>
                <Grid columns={6} gutter="50">
                    <Grid.Col offset={2} span={1}>
                        <Box style={{background: "#37CEBF", borderRadius: '10px', paddingTop: "20%"}}>
                            <ActionIcon  component="a" href="#/room" variant="outline" size={120} style={{border: "3px solid #FFFFFF",
                                borderRadius: "5px", marginLeft: "29%",}}>
                                <Video color={'white'} size={100}/>
                            </ActionIcon>
                            <Text align="center" style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '300',
                                fontSize: '24px',
                                lineHeight: '29px',
                                color:' #FFFFFF',
                                paddingTop: '15%',
                                paddingBottom: '15%'
                            }}>Начать занятие</Text>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Box style={{background: "#5BA5FF", borderRadius: '10px', paddingTop: "20%"}}>
                            <ActionIcon component="a" href="#/experts" variant="outline" size={120} style={{border: "3px solid #FFFFFF",
                                borderRadius: "5px", marginLeft: "29%",}}>
                                <Users color={'white'} size={90}/>
                            </ActionIcon>
                            <Text align="center" style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '300',
                                fontSize: '24px',
                                lineHeight: '29px',
                                color:' #FFFFFF',
                                paddingTop: '15%',
                                paddingBottom: '15%'
                            }}>Эксперты</Text>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={1} offset={2}>
                        <Box style={{background: "#5BA5FF", borderRadius: '10px', paddingTop: "20%"}}>
                            <ActionIcon component="a" href="#/history-tests" variant="outline" size={120} style={{border: "3px solid #FFFFFF",
                                borderRadius: "5px", marginLeft: "29%",}}>
                                <History color={'white'} size={90}/>
                            </ActionIcon>
                            <Text align="center" style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '300',
                                fontSize: '24px',
                                lineHeight: '29px',
                                color:' #FFFFFF',
                                paddingTop: '15%',
                                paddingBottom: '15%'
                            }}>История занятий</Text>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Box style={{background: "#5BA5FF", borderRadius: '10px', paddingTop: "20%"}}>
                            <ActionIcon variant="outline" size={120} style={{border: "3px solid #FFFFFF",
                                borderRadius: "5px", marginLeft: "29%",}}>
                                <Settings color={'white'} size={90}/>
                            </ActionIcon>
                            <Text align="center" style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '300',
                                fontSize: '24px',
                                lineHeight: '29px',
                                color:' #FFFFFF',
                                paddingTop: '15%',
                                paddingBottom: '15%'
                            }}>Настройки</Text>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Box>
        {/*<div className="experts">
            <h1 className="text-experts">Эксперты</h1>
            <div className="rectangle-experts"/>
            <img src={peoples}/>
        </div>
        <div className="call-start">
            <h1 className="text-call-start">Начать занятие</h1>
            <div className="rectangle-call-start"/>
            <img src={camera}/>
        </div>
        <div className="lessons-history">
            <h1 className="text-lessons-history">История занятий</h1>
            <div className="rectangle-lessons-history"/>
            <img src={clock}/>
        </div>
        <Box className="setting">
            <h1 className="text-setting">Настройки</h1>
            <div className="rectangle-setting"/>
            <img src={settings}/>
        </Box>*!/*/}
        </Box>
        </>
    )
}

export default Home;