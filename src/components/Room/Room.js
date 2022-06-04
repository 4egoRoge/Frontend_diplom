import React, {useState} from "react";
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

const Room = () => {
    const modals = useModals();
    const [opened, setOpened] = useState(false);
    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Закончить звонок',
            centered: true,
            labels: { confirm: 'Да', cancel: "Нет"},
            confirmProps: { color: 'red' },
            cancelProps: { color: 'blue !important'},
            onCancel: () => console.log('Cancel'),
            onConfirm: () => console.log('Confirmed'),
        });
        const clipboard = useClipboard({ timeout: 500 });
    let invite = "Ссылка для приглашения";
    /*const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const standart = colorScheme === 'standart';*/
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
                         style={{ marginTop: "15px", width: "100%", padding: "0px"}}
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
                           <Text style={{ color: "#FFFFFF",
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
                               style={{ backgroundColor: "#37CEBF" }} align="center" size="md">Копировать</Button>
                       </Grid.Col>
                   </Grid>
                   <Title style={{ fontFamily: 'Inter',
                       fontStyle: 'normal',
                       fontWeight: '400',
                       fontSize: '24px',
                       lineHeight: '29px',
                       color: "#FFFFFF",
                       paddingTop: "2%"
                   }} order={4} align="center">Настройки камеры и микрофона</Title>
                   <Group style={{paddingTop: "30px"}} spacing="xl" position="center">
                   <Button rightIcon={<Camera size={38}/>} size="sm" style={{ backgroundColor: "#37CEBF",
                       display: "block", fontSize: "20px", paddingLeft: "10px", width: "115px"}}>
                   </Button>
                   <Button rightIcon={<Microphone size={34}/>} size="sm" style={{ backgroundColor: "#37CEBF",
                       display: "block",fontSize: "20px", paddingLeft: "10px", width: "115px"}}>
                   </Button>
                   </Group>
                   <Title style={{ fontFamily: 'Inter',
                       fontStyle: 'normal',
                       fontWeight: '400',
                       fontSize: '24px',
                       lineHeight: '29px',
                       color: "#FFFFFF",
                       paddingTop: "2%"
                   }} order={4} align="center">Выбрать тему</Title>
                   <SimpleGrid cols={3} position="center" spacing="xs" style={{ fontFamily: 'Inter',
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
               <Modal>
               </Modal>
               <Button onClick={() => clipboard.copy(invite)}
                   radius="md" style={{
                   backgroundColor: "#37CEBF",
                   fontFamily: 'Inter',
                   fontStyle: 'normal',
                   fontWeight: '300',
                   fontSize: '20px',
                   lineHeight:'24px',
                   color: '#FFFFFF',
                   width: '60%',
                   left: "25%"
               }}
               >
                   {invite}
               </Button>
               <Grid>
                   <Grid.Col span={8}>
               <Box>
                   <div style={{background: '#808080'}}>
                   <Grid columns={10}>
                       <Grid.Col span={10}>
                   <Textarea
                       autosize
                       minRows={20}
                       maxRows={20}
                       style={{
                           paddingTop: "3%",
                           border: "0"
                       }}
                       styles={{
                       input: { color: '#FFFFFF' },
                       defaultVariant: { backgroundColor: '#C4C4C4' },
                   }}
                   />
                       </Grid.Col>
                       <Grid.Col span={8} offset={0.5}>
                       <TextInput
                           placeholder="Введите сообщение"
                           size="lg"
                           styles={{
                               input: { backgroundColor: '#C4C4C4 !important',},
                           }}
                       />
                       </Grid.Col>
                       <Grid.Col span={1}>
                           <ActionIcon size={50} style={{paddingLeft: '2% !important'}} variant="filled" style={{background: "#37CEBF"}}>
                               <Send
                                   size={40}
                                   strokeWidth={2}
                                   color={'white'}
                               />
                           </ActionIcon>
                       </Grid.Col>
                   </Grid>
                   </div>
                   <SegmentedControl
                       style={{marginTop: "3%", backgroundColor: "#3C3C3C"}}
                       styles={{label: {
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
                           { label: 'Таблица', value: '1' },
                           { label: 'Вопрос с вариантами ответов', value: '2' },
                           { label: 'Сетка возможностей', value: '3' },
                           { label: ' Игра "Агенты будущего"', value: '4' },
                       ]}
                   />
               </Box>
                   </Grid.Col>
                       <Grid.Col span={4}>
                               <Grid columns={1}>
                                   <Grid.Col>
                                       <Box
                                           style={{backgroundColor:"black", width: "100%", height: '250px', marginLeft: '24%'}}>
                                       </Box>
                                   </Grid.Col>
                                   <Grid.Col>
                                       <Box
                                           style={{backgroundColor:"black", width: "100%", height: '250px', marginLeft: '24%'}}>
                                       </Box>
                                   </Grid.Col>
                                   <Grid.Col>
                                       <Button leftIcon={<Settings />} style={{width: '100%'}} onClick={() => setOpened(true)} size="md">
                                            Настройки звонка
                                       </Button>
                                   </Grid.Col>
                                   <Grid.Col>
                                        <Button leftIcon={<PhoneOff />} style={{width: '100%'}} onClick={openDeleteModal} color="red" size="md">
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