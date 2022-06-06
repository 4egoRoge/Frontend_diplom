import React, {useState} from "react";
import { useForm } from '@mantine/form';
import $ from 'jquery';
import {
    Modal,
    Button,
    Grid,
    Box,
    SegmentedControl,
    Text,
    SimpleGrid,
    Title,
    Group,
    useMantineColorScheme, Textarea, TextInput, ActionIcon
} from '@mantine/core';
import './Room.scss';
import { useModals } from '@mantine/modals';
import {Camera, Microphone, Plus, Send, Settings, PhoneOff} from 'tabler-icons-react';
import space from "../../img/spaceBackground.png";
import {useClipboard, useToggle} from "@mantine/hooks";
import io from "socket.io-client";
import Fetch from "../../hooks/Fetch";
import Message from "/src/components/Room/Message"
import {PAGE_URL} from "../../hooks/urls";
import {useNavigate} from "react-router-dom";

const Room = () => {
    const modals = useModals();
    const [opened, setOpened] = useState(false);
    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Закончить звонок',
            centered: true,
            labels: {confirm: 'Да', cancel: "Нет"},
            confirmProps: {color: 'red'},
            cancelProps: {color: 'blue !important'},
            onCancel: () => console.log('Cancel'),
            onConfirm: () => navigate("/home"),
        });
    const clipboard = useClipboard({timeout: 500});
    const navigate = useNavigate();
    let invite = "Ссылка для приглашения";
    /*const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const standart = colorScheme === 'standart';*/

    /*const accept = (e) => {
        e.preventDefault()
    }*/

    const pc = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                }
            ],
        sdpSemantics:'unified-plan'
        }
    );

    let socket = io("https://api.future-mission.ru/socket.io/")

    pc.onicecandidate = event => onIceCandidate(pc, event);
    /*pc.oniceconnectionstatechange = event => onIceStateChange(pc, event);*/
    pc.ontrack = event => gotRemoteStream(event);

    let localStreamWeb;
    let remoteWidth;
    let remoteHeight;
    let remoteSocket;

    socket.on('setRemoteSocketId', (data) => {
        remoteSocket = data.from;
        remoteWidth = data.remoteWidth;
        remoteHeight = data.remoteHeight;
        const offerOptions = {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1,
            voiceActivityDetection: 1
        };
        navigator.mediaDevices
        .getUserMedia({
            audio: true,
            video: true
        }).then((stream) => {
            localStreamWeb = stream;
            stream.getTracks().forEach((track) => {
                pc.addTrack(track, stream)
            });
        try {
            pc.createOffer(offerOptions)
                .then((offer) => {
                    onCreateOfferSuccess(offer);
                });
        } catch (e) {
            onCreateSessionDescriptionError(e);
        }
        })
    });
    socket.on('message', (data) => {
        addChatHistory('message-from-them', data.message);
    });
    socket.on('link', (data) => {
        addChatHistory('link', {
            link: data.link,
            title: data.title
        });
    });
    let chat_history = [];
    socket.on('endCall', () => {
        clearCookie();
        let end_call_redirect = true;
    });

   function onAddIceCandidateSuccess(pc) {
        // console.log(`${pc} addIceCandidate success`);
    }

    function onAddIceCandidateError(pc, error) {
        // console.log(`${pc} failed to add ICE Candidate: ${error.toString()}`);
    }

    socket.on('iceCandidate', (data) => {
        pc.addIceCandidate(data.ice)
            .then(() => onAddIceCandidateSuccess(pc), err => onAddIceCandidateError(pc, err, data.ice));
    });

    function onSetRemoteSuccess(pc) {
        // console.log(`${pc} setRemoteDescription complete`);
    }
    function onSetSessionDescriptionError(error) {
        // console.log(`Failed to set session description: ${error.toString()}`);
    }

    socket.on('setRemoteDescriptionFromOffer', (data) => {
        try {
            pc.setRemoteDescription(data.offer)
                .then(() => {
                    onSetRemoteSuccess(pc);
                });
        } catch (e) {
            onSetSessionDescriptionError();
        }
        try {
            pc.createAnswer()
                .then((answer) => {
                    onCreateAnswerSuccess(answer);
                });
        } catch (e) {
            onCreateSessionDescriptionError(e);
        }
    });
    socket.on('setRemoteDescriptionFromAnswer', (data) => {
        try {
            pc.setRemoteDescription(data.offer)
                .then(() => {
                    onSetRemoteSuccess(pc);
                });
        } catch (e) {
            onSetSessionDescriptionError();
        }
    });

    socket.on('toggleCamera', (data) => {
        if (remote_cam_status === 0 && remoteStream !== null){
            remote_cam_status = 1;
        } else {
            remote_cam_status = 0;
        }
    });

    let remote_mic_status = 1
    let remote_sound_status = 1

    socket.on('toggleMic', (data) => {
        if (remote_mic_status === 0){
            if (remote_sound_status === 1){
                remoteVideo.muted = false;
            }
            remote_mic_status = 1;
        } else {
            remoteVideo.muted = true;
            remote_mic_status = 0;
        }
    });

    socket.on('sendReport', (data) => {
        let report = data.report;
        let report_status = true;
    });

    socket.on('closeReport', (data) => {
        closeReport();
    });

    let remoteStream = null
    let remote_cam_status = 0

    function gotRemoteStream(e) {
        if (remoteVideo.srcObject !== e.streams[0]) {
            remoteVideo.srcObject = e.streams[0];
            remoteStream = e.streams[0];
            remote_cam_status = 1;
        }
    }

    let localSocket = '';

    function onCreateOfferSuccess(desc) {
        pc.setLocalDescription(desc).then(() => {
            onSetLocalSuccess();
            socket.emit('setRemoteDescription', {to: remoteSocket, from:localSocket, offer: desc});
        }, onSetSessionDescriptionError);
    }

    function onSetLocalSuccess(pc) {
        // console.log(`${pc} setLocalDescription complete`);
    }

    function onCreateAnswerSuccess(desc) {
        pc.setLocalDescription(desc).then(() =>
            onSetLocalSuccess(pc), onSetSessionDescriptionError);
        socket.emit('setRemoteDescriptionAnswer',
            {to: remoteSocket, from: localSocket, answer: desc});
    }

    function onIceCandidate(pc, event) {
        socket.emit('addIceCandidate',
            {to: remoteSocket, from: localSocket, ice: event.candidate});
    }

    let local_cam_status = 0;

    function switchLocalCam(){
        if (local_cam_status === 0){
            local_cam_status = 1;
        } else {
            local_cam_status = 0;
        }
        socket.emit('toggleCamera', {
            localSocket,
            remoteSocket
        })
    }

    let local_mic_status = 1;

    function switchLocalMic(){
        if (local_mic_status === 0){
            local_mic_status = 1;
        } else {
            local_mic_status = 0;
        }
        socket.emit('toggleMic', {
            from: localSocket,
            to: remoteSocket
        })
    }

    function switchRemoteSound(){
        if (remote_sound_status === 0){
            if (remote_mic_status === 1){
                remoteVideo.muted = false;
            }
            remote_sound_status = 1;
        } else {
            remoteVideo.muted = true;
            remote_sound_status = 0;
        }
    }

    function sendMessage(message) {
        let textarea = document.getElementById('message-text');
        let message_text = message;
        if (message_text && message_text !== ''){
            textarea.value='';
            addChatHistory('message-from-me', message_text);
            socket.emit('sendMessage', {
                message: message_text,
                from: localSocket,
                to: remoteSocket
            })
        }
    }

    function sendGameLink(){
        addChatHistory('link', {
            link: "http://corpus-future.net/",
            title: "Агенты будущего"
        });
        socket.emit('sendLink', {
            link: "http://corpus-future.net/",
            title: "Агенты будущего",
            from: localSocket,
            to: remoteSocket
        })
    }

    let end_call_redirect = false;

    function endSession(e){
        e.preventDefault();
        if (chat_history.length > 0){
            Fetch.post('/session/save', {
                date: new Date().toISOString(),
                chat_history: chat_history,
            })
                .then(res => {
                    clearCookie();
                    socket.emit('initEndSession', {
                        from: localSocket,
                        to: remoteSocket
                    });
                    end_call_redirect = true;
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            clearCookie();
            socket.emit('initEndSession', {
                from: localSocket,
                to: remoteSocket
            });
            end_call_redirect = true;
        }
    }

    function clearCookie() {
        localStorage.clear()
    }

    function onCreateSessionDescriptionError(error) {
    }

    function addChatHistory(type, content) {
        chat_history.push({
            type: type,
            content: content
        });
        updateChatHistory();
    }

    function updateChatHistory(){
        clearCookie();
        localStorage.setItem('chat_history', JSON.stringify(chat_history));
    }

    let report_status = false;
    let link = ('.invite-link');
    function closeReport() {
        report_status = false;
        let report = undefined;
            socket.emit('closeReport', {
                from: this.store.localSocket,
                to: this.store.remoteSocket
            })
    }

    function setChat() {
        return chat_history.map((element, index) => {
            switch (element.type) {
                case 'message-from-me':
                    return <Message key={index} class={"from-me"} text={element.content}/>;
                case 'message-from-them':
                    return <Message key={index} class={"from-them"} text={element.content}/>;
                default:
                    break;
            }
        }).reverse();
    }

    const form = useForm({
        initialValues: {
            message: '',
        },
    });

    let remoteVideo;
    let localVideo;

    function componentDidMount() {
        localVideo = document.getElementById('localCamRTC');
        remoteVideo = document.getElementById('remoteCamRTC');

        let cam_container = ('.my-cam');
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    width: cam_container.width(),
                    height: cam_container.height(),
                    frameRate: {ideal: 40, min: 25},
                }
            })
            .then((stream) => {
                localVideo.srcObject = stream;
                localVideo.muted = true;
                let localStream = stream;
                let local_cam_status = 1;
            })
            .catch(e => {
                alert(`Не удалось получить доступ к веб-камере \n проверьте настройки и обновите страницу`);
                console.log(`Local web-cam error: ${e}`);
            });

        socket.on('connect', () => {
            localSocket = socket.io.engine.id;
            if (remoteSocket){
                    if (remoteWidth && remoteHeight){
                    navigator.mediaDevices
                        .getUserMedia({
                            audio: true,
                            video: {
                                width: remoteWidth,
                                height: remoteHeight,
                                frameRate: {ideal: 40, min: 25},
                            }
                        })
                        .then((stream) => {
                            localStreamWeb = stream;
                            stream.getTracks().forEach(track => pc.addTrack(track, stream));
                            socket.emit('connectToSocket', {
                                from: localSocket,
                                to: remoteSocket,
                                remoteWidth: localVideo.clientWidth,
                                remoteHeight: localVideo.clientHeight
                            });
                        })
                        .catch(e => {
                            alert(`Не удалось получить доступ к веб-камере \n проверьте настройки и обновите страницу`);
                            console.log(`Remote web-cam error: ${e}`);
                        });
                }
            }
                link.text(`https://${PAGE_URL}/session/joiner/${localSocket}/${localVideo.clientWidth}/${localVideo.clientHeight}`);
        });
    }

    return (
        <div className="box-room">
            <Modal
                centered
                size="80%"
                id="2"
                opened={opened}
                onClose={() => setOpened(false)}
                title="Настройки"
                styles={(theme) => ({
                    root: {
                        margin: "0px"
                    },
                    modal: {
                        backgroundColor: '#3C3C3C',
                    },
                    CloseIcon: {
                        width: "31",
                        height: "31"
                    },
                    title: {
                        color: "#FFFFFF",
                        marginLeft: "43%",
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '32px',
                        lineHeight: '39px',
                    },
                    close: {
                        color: "#FFFFFF",
                        height: "31px",
                        width: "31px",
                    },
                    header: {
                        backgroundColor: '#37CEBF',
                        width: "100%",
                        height: "45px",
                        padding: "0px",
                        margin: "0px"
                    }
                })}
            >
                <Grid color={"#000000"}
                      style={{marginTop: "15px", width: "100%", padding: "0px"}}
                      styles={(theme) => ({
                          root: {
                              backgroundColor: '#000000',
                          },
                          link: {
                              color: "#FFFFFF",
                          }
                      })}
                >
                    <Grid.Col span={6} offset={0.5}>
                        <Text style={{
                            color: "#FFFFFF",
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: '300',
                            fontSize: '24px',
                            lineHeight: '29px',
                            paddingTop: "1%"
                        }} variant="link" size="xl" align="center">{invite}</Text>
                    </Grid.Col>
                    <Grid.Col span={2} offset={2.5}>
                        <Button
                            onClick={() => clipboard.copy(invite)}
                            style={{backgroundColor: "#37CEBF"}} align="center" size="md">Копировать</Button>
                    </Grid.Col>
                </Grid>
                <Title style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '24px',
                    lineHeight: '29px',
                    color: "#FFFFFF",
                    paddingTop: "2%"
                }} order={4} align="center">Настройки камеры и микрофона</Title>
                <Group style={{paddingTop: "30px"}} spacing="xl" position="center">
                    <Button rightIcon={<Camera size={38}/>} size="sm" style={{
                        backgroundColor: "#37CEBF",
                        display: "block", fontSize: "20px", paddingLeft: "10px", width: "115px"
                    }}>
                    </Button>
                    <Button rightIcon={<Microphone size={34}/>} size="sm" style={{
                        backgroundColor: "#37CEBF",
                        display: "block", fontSize: "20px", paddingLeft: "10px", width: "115px"
                    }}>
                    </Button>
                </Group>
                <Title style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '24px',
                    lineHeight: '29px',
                    color: "#FFFFFF",
                    paddingTop: "2%"
                }} order={4} align="center">Выбрать тему</Title>
                <SimpleGrid cols={3} position="center" spacing="xs" style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '300',
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: "#FFFFFF",
                    paddingTop: "2%",
                    paddingLeft: "18%",
                }}>
                    <Text>Стандартная</Text>
                    <Text>Космическая</Text>
                    <Text>Сказочный</Text>
                </SimpleGrid>
                <Group position="center" spacing="xl" style={{paddingTop: "2%", height: "300px"}}>
                    <Button variant="subtle" style={{
                        width: "25%",
                        height: "100%",
                        border: "1px solid #37CEBF",
                        background: "#5B5B5B"
                    }}/>
                    <Button onClick={() => toggleColorScheme()} variant="subtle" style={{
                        width: "25%",
                        height: "100%",
                        background: "linear-gradient(90deg, #5F72BD 0%, #9B23EA 100%)"
                    }}/>
                    <Button variant="subtle" style={{
                        width: "25%",
                        height: "100%",
                        background: "linear-gradient(90deg, #E0C3FC 0%, #8EC5FC 100%)"
                    }}/>
                </Group>
            </Modal>
            <Button onClick={() => clipboard.copy(invite)}
                    radius="md" style={{
                backgroundColor: "#37CEBF",
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '20px',
                lineHeight: '24px',
                color: '#FFFFFF',
                width: '60%',
                left: "25%"
            }}
            >
                {link}
            </Button>
            <Grid>
                <Grid.Col span={8}>
                    <Box>
                        <div style={{background: '#808080'}}>
                            <form onSubmit={form.onSubmit((values) => sendMessage(values))} id="message-form">
                            <Grid columns={10}>
                                <Grid.Col span={10}>
                                    <div
                                        id="message-text"
                                        /*autosize
                                        minRows={20}
                                        maxRows={20}*/
                                        style={{
                                            paddingTop: "3%",
                                            border: "0"
                                        }}
                                        /*styles={{
                                            input: {color: '#FFFFFF'},
                                            defaultVariant: {backgroundColor: '#C4C4C4'},
                                        }}*/>
                                        {setChat()}
                                    </div>
                                </Grid.Col>
                                <Grid.Col span={8} offset={0.5}>
                                    <TextInput
                                        placeholder="Введите сообщение"
                                        size="lg"
                                        styles={{
                                            input: {backgroundColor: '#C4C4C4 !important',},
                                        }}
                                        {...form.getInputProps('message')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Button leftIcon={<Send size={40} />} size="lg" style={{background: "#37CEBF"}}
                                                variant="filled"
                                                type="submit"
                                                styles={{leftIcon: {paddingLeft: "9px"}}}>
                                                form="message-from"
                                    </Button>
                                </Grid.Col>
                            </Grid>
                            </form>
                        </div>
                        <SegmentedControl
                            style={{marginTop: "3%", backgroundColor: "#3C3C3C"}}
                            styles={{
                                label: {
                                    backgroundColor: "#37CEBF",
                                    color: 'white',
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: '300',
                                    fontSize: '16px',
                                    lineHeight: '19px',
                                },
                                labelActive: {
                                    backgroundColor: "#37CEBF",
                                    color: 'white',
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: '300',
                                    fontSize: '16px',
                                    lineHeight: '19px',
                                }
                            }}
                            fullWidth
                            radius='lg'
                            data={[
                                {label: 'Таблица', value: '1'},
                                {label: 'Вопрос с вариантами ответов', value: '2'},
                                {label: 'Сетка возможностей', value: '3'},
                                {label: ' Игра "Агенты будущего"', value: '4'},
                            ]}
                        />
                    </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Grid columns={1}>
                        <Grid.Col>
                            <video className="camera-video" id="localCamRTC" autoPlay/>
                        </Grid.Col>
                        <Grid.Col>
                            <video className="camera-video" id="remoteCamRTC" autoPlay />
                        </Grid.Col>
                        <Grid.Col>
                            <Button leftIcon={<Settings/>} style={{width: '100%'}} onClick={() => setOpened(true)}
                                    size="md">
                                Настройки звонка
                            </Button>
                        </Grid.Col>
                        <Grid.Col>
                            <Button leftIcon={<PhoneOff/>} style={{width: '100%'}} onClick={openDeleteModal} color="red"
                                    size="md">
                                Закончить звонок
                            </Button>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default Room;