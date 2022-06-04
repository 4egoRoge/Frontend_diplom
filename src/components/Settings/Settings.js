import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {ActionIcon, Box, Button, Group, PasswordInput, Radio, RadioGroup, TextInput, MediaQuery} from "@mantine/core";
import {History, Home, Users, Settings, Plus} from "tabler-icons-react";
import {useForm, zodResolver} from "@mantine/form";
import {z} from "zod";
import './Settings.scss';
import {useMediaQuery} from "@mantine/hooks";

const SettingsAccount = observer(() => {

    const schema = z.object({
        name: z.string().min(2, { message: 'Имя должно содержать 2 симвода' }),
        email: z.string().email({ message: 'Не правильный email' }),
        password: z.string().min(8,{ message: 'Должен содержать 8 символов' }),
    });
    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            name: '',
            email: '',
        },
    });
        const accept = (event) => {
            event.preventDefault()
        }

        const mobile = useMediaQuery('(max-width: 489px)');

    return (
<>
    <MediaQuery
        query="(max-width: 489px)"
        styles={{
            "&.main": {
                display: "flex !important",
                flexFlow: "wrap !important",
                overflow: "hidden",
            },
            ".col1": {
                order: "1",
                marginTop: "30%",
                marginLeft: "8% !important",
            },
            ".col2": {
                order: 0,
                marginTop: "30% !important",
                marginLeft: "3%",
                width: "100% !important"
            },
            label: {
                fontWeight: "300",
                fontSize: "16px",
                lineHeight: "19px",
                },
            input: {
                width: "100%",
                root: {
                    fontWeight: "300 !important",
                    fontSize: "12px !important",
                    lineHeight: "15px !important",
                }
            },
            ".mobileForm": {
                width: "88% !important",
                marginLeft: "5% !important"
            },
            ".mobileBut": {
                marginTop: "5%",
                span: {
                    fontWeight: "400 !important",
                    fontSize: "16px !important",
                    lineHeight: "19px !important",
                }
            },
            ".mobileRadio": {
                marginTop: '5%',
                input: {
                    width: "20px !important"
                }
            }
        }}>
        <div className='main'>
            <div className="col1">
                <Group className="mobileGroup" position={mobile ? "apart" : 'center'} spacing={mobile ? "xs" : 'xl'} style={{
                    marginTop: "2%"
                }}>
                    <ActionIcon className="mobileIcon" component="a" href="#/home" size={80}>
                        <Home size={48} color={'white'}/>
                    </ActionIcon>
                    <ActionIcon className="usersIcon" component="a" href="#/experts" size={80}>
                        <Users size={48} color={'white'}/>
                    </ActionIcon>
                    <ActionIcon component="a" href="#/history-tests" size={80}>
                        <History size={48} color={'white'}/>
                    </ActionIcon>
                    <ActionIcon component="a" href="#/settings" size={80}>
                        <Settings size={48} color={'#F7C978'}/>
                    </ActionIcon>
                </Group>
            </div>
            <div className="col2">
    <Box className="mobileForm" style={{width: "52%", marginLeft: "24%"}}>
        <form onSubmit={form.onSubmit=(accept)}>
        <TextInput
            className="mobileInput"
            size={mobile ? "xs" : 'lg'}
            placeholder="Иван"
            name="name"
            label="Изменить данные"
            {...form.getInputProps('name')}
            style={{marginTop: "3%",marginBottom: "2%"}}
            styles={(theme) => ({
                label: {
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '32px',
                    lineHeight: '39px',
                    color: '#FFFFFF',
                    marginBottom: "2%"
                },
            })}
        />
            <TextInput
                required
                size={mobile ? "xs" : 'lg'}
                placeholder="Иванов"
                name="surname"
                {...form.getInputProps('surname')}
                style={{marginBottom: "2%"}}
            />
            <RadioGroup
                className="mobileRadio"
                spacing="xs"
                required
                name="gender"
                {...form.getInputProps('gender')}
                style={{marginBottom: "1%"}}
                styles={(theme) => ({
                    label: {
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '24px',
                        lineHeight: '29px',
                        color: '#FFFFFF'}
                })}
            >
                <Radio value="1" label="М" />
                <Radio value="2" label="Ж" />
            </RadioGroup>
            <Button className="mobileBut" size={mobile ? "xs" : 'lg'} style={{width: "100%", background: '#37CEBF',fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '32px',
                lineHeight: '39px',
                color: '#FFFFFF'}} type="submit">Сохранить</Button>
        </form>
        <form onSubmit={form.onSubmit=(accept)} style={{marginTop: "2%"}}>
            <TextInput
                label="Изменить email"
                size={mobile ? "xs" : 'lg'}
                name="email"
                placeholder="Email"
                {...form.getInputProps('Email')}
                style={{marginBottom: "2%"}}
                styles={(theme) => ({
                    label: {
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '32px',
                        lineHeight: '39px',
                        color: '#FFFFFF',
                        marginBottom: "2%"}
                })}
            />
            <Button className="mobileBut" size={mobile ? "xs" : 'lg'} style={{width: "100%", background: '#37CEBF',fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '32px',
                lineHeight: '39px',
                color: '#FFFFFF'}} type="submit">Сохранить</Button>
        </form>
        <form onSubmit={form.onSubmit=(accept)} style={{marginTop: "2%"}}>
            <PasswordInput
                label="Изменить пароль"
                size={mobile ? "xs" : 'lg'}
                placeholder="Старый пароль"
                name="old-password"
                {...form.getInputProps('old-password')}
                style={{marginBottom: "2%"}}
                styles={(theme) => ({
                    label: {
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '32px',
                        lineHeight: '39px',
                        color: '#FFFFFF',
                        marginBottom: "2%"}
                })}
            />
            <PasswordInput
                size={mobile ? "xs" : 'lg'}
                placeholder="Новый пароль"
                name="new-password"
                {...form.getInputProps('new-password')}
                style={{marginBottom: "2%"}}
            />
            <PasswordInput
                size={mobile ? "xs" : 'lg'}
                placeholder="Повторите новый пароль"
                name="new-password-again"
                {...form.getInputProps('new-password-again')}
                style={{marginBottom: "2%"}}
            />
            <Button className="mobileBut" size={mobile ? "xs" : 'lg'} style={{width: "100%", background: '#37CEBF',fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '32px',
                lineHeight: '39px',
                color: '#FFFFFF'}} type="submit">Сохранить</Button>
        </form>
    </Box>
            </div>
        </div>
        </MediaQuery>
</>
    )
}
)

export default SettingsAccount;