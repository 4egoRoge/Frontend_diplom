import React, {useEffect, useState} from "react";
import './Home.scss';
import logo from "../../img/logo.png";
import peoples from "../../img/peoples.png";
import camera from "../../img/camera.png";
import clock from "../../img/clock.png";
import settings from "../../img/settings.png";
import {ActionIcon, Box, Grid, Text, MediaQuery} from "@mantine/core";
import {History, Settings, Users, Video} from "tabler-icons-react";
import background from "../../img/background.png";
import backgroundMobile from "../../img/backgroundMobile.png";
import {useMediaQuery} from "@mantine/hooks";

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

    const mobile = useMediaQuery('(max-width: 489px)');

    return(
        <>
            <MediaQuery
                query="(max-width: 489px)"
                styles={{
                    "&.boxMain": {
                        marginLeft: "0% !important",
                        paddingLeft: "0% !important",
                        marginTop: '0% !important',
                        paddingTop: '0% !important',
                        marginRight: "0% !important",
                        paddingRight: "0% !important",
                        width: "100% !important",
                        overflow: "hidden"
                    },
                    ".boxImg": {
                        backgroundImage: `url(${backgroundMobile}) !important`,
                        marginLeft: "0% !important",
                        marginRight: "0% !important",
                        paddingLeft: "0% !important",
                        paddingRight: "0% !important",
                        borderRadius: "0px !important",
                        backgroundSize: "cover",
                        paddingBottom: "25%",
                        marginTop: '0%',
                        backgroundPosition: 'top !important',
                        width: "100% !important"
                    },
                    ".logo": {
                        marginTop: '15%',
                        paddingBottom: '0%',
                        marginBottom: "0%"
                    },
                    img: {
                        width: '105px',
                        marginLeft: '65% !important',
                        paddingTop: '15% !important',
                        marginBottom: '0% !important',
                        paddingBottom: "0% !important",
                    },
                    ".timeMobile": {
                        fontWeight: "900 !important",
                        fontSize: "40px !important",
                        lineHeight: "48px !important",
                        paddingLeft: "35% !important"
                    },
                    ".dataMobile": {
                        fontWeight: "300 !important",
                        fontSize: "16px !important",
                        lineHeight: "19px !important",
                        paddingLeft: "30% !important"
                    },
                    ".menu" : {
                        marginTop: "13%",
                        marginLeft: "0% !important"
                    },
                    ".tiles": {
                        marginLeft: "0% !important",
                    },
                    ".mobileIcon": {
                        paddingTop: '15% !important',
                    },
                    svg: {
                        width: "60px !important"
                    },
                    ".textMobile": {
                        fontSize: "15px !important",
                        paddingTop: '10% !important',
                    },
                    a: {
                        marginLeft: "27% !important"
                    },
                    ".colMobileRight": {
                        padding: '6% !important',
                    },
                    ".colMobile": {
                        padding: '6% !important',
                    }
                }}
            >
        <Box style={{position: "absolute",width: "90%", marginTop: "3%"}} className="boxMain">
            <Box style={{ backgroundImage: `url(${background})`,borderRadius: "40px",
                backgroundRepeat: 'no-repeat',  backgroundPosition: 'center',marginLeft: '10%', marginRight: "0%"}} className="boxImg">
                <Grid columns={mobile ? "2" : '3'}>
                    <Grid.Col span={1} className="logo">
                        <img src={logo} style={{paddingTop: "4%", paddingBottom: "4%", marginLeft: '10%'}}/>
                    </Grid.Col>
                    <Grid.Col span={2} style={{paddingLeft: '0%'}}>
                        <Text style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "96px",
                            lineHeight: "116px",
                            color: "#FFFFFF",
                            paddingLeft: '10%'
                        }} className="timeMobile">{date.toLocaleTimeString().slice(0,-3)}</Text>
                        <Text style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: "300",
                            fontSize: "40px",
                            lineHeight: "48px",
                            color: "#FFFFFF",
                            paddingLeft: "2%"
                        }} className="dataMobile">{days[date.getDay()]}, {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Text>
                    </Grid.Col>
                </Grid>
            </Box>
           {/* <div>
                {mobile ? "{}" : ''}
            </div>*/}
            <Box style={{paddingTop: '3%'}} className="menu">
                <Grid columns={mobile ? "2" : '6'} gutter={mobile ? "20" : '30'} style={{marginLeft: '10%'}} className="tiles">
                    <Grid.Col offset={mobile ? "0" : '2'} span={1} className="colMobile">
                        <Box className="mobileIcon" style={{background: "#37CEBF", borderRadius: '10px', paddingTop: "20%"}}>
                            <ActionIcon component="a" href="#/room" variant="outline" size={80} style={{border: "3px solid #FFFFFF",
                                borderRadius: "5px", marginLeft: "29%",}}>
                                <Video color={'white'} size={100}/>
                            </ActionIcon>
                            <Text className="textMobile" align="center" style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '300',
                                fontSize: '20px',
                                lineHeight: '29px',
                                color:' #FFFFFF',
                                paddingTop: '15%',
                                paddingBottom: '15%'
                            }}>Начать занятие</Text>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={1} className="colMobileRight">
                        <Box className="mobileIcon" style={{background: "#5BA5FF", borderRadius: '10px', paddingTop: "20%"}}>
                            <ActionIcon component="a" href="#/experts" variant="outline" size={80} style={{border: "3px solid #FFFFFF",
                                borderRadius: "5px", marginLeft: "29%",}}>
                                <Users color={'white'} size={90}/>
                            </ActionIcon>
                            <Text  className="textMobile" align="center" style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '300',
                                fontSize: '20px',
                                lineHeight: '29px',
                                color:' #FFFFFF',
                                paddingTop: '15%',
                                paddingBottom: '15%'
                            }}>Эксперты</Text>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={1} offset={mobile ? "0" : '2'} className="colMobile">
                        <Box className="mobileIcon" style={{background: "#5BA5FF", borderRadius: '10px', paddingTop: "20%"}}>
                            <ActionIcon component="a" href="#/history-tests" variant="outline" size={80} style={{border: "3px solid #FFFFFF",
                                borderRadius: "5px", marginLeft: "29%",}}>
                                <History color={'white'} size={90}/>
                            </ActionIcon>
                            <Text  className="textMobile" align="center" style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '300',
                                fontSize: '20px',
                                lineHeight: '29px',
                                color:' #FFFFFF',
                                paddingTop: '15%',
                                paddingBottom: '15%'
                            }}>История занятий</Text>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={1} className="colMobileRight">
                        <Box className="mobileIcon" style={{background: "#5BA5FF", borderRadius: '10px', paddingTop: "20%"}}>
                            <ActionIcon component="a" href="#/settings" variant="outline" size={80} style={{border: "3px solid #FFFFFF",
                                borderRadius: "5px", marginLeft: "29%",}}>
                                <Settings color={'white'} size={90}/>
                            </ActionIcon>
                            <Text  className="textMobile" align="center" style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '300',
                                fontSize: '20px',
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
            </MediaQuery>
        </>
    )
}

export default Home;