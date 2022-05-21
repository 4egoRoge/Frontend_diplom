import React, {useEffect, useState} from "react";
import './Home.scss';
import logo from "../../img/logo.png";
import peoples from "../../img/peoples.png";
import camera from "../../img/camera.png";
import clock from "../../img/clock.png";
import settings from "../../img/settings.png";

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
        <div className="background-time">
            <img src={logo}/>
            <div className="time-data">
                <span className="data">
                {days[date.getDay()]}, {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
                </span>
            <span className="clock">
                {date.toLocaleTimeString().slice(0,-3)}
            </span>
            </div>
        </div>
        <div className="experts">
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
        <div className="setting">
            <h1 className="text-setting">Настройки</h1>
            <div className="rectangle-setting"/>
            <img src={settings}/>
        </div>
        </>
    )
}

export default Home;