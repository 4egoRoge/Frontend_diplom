import React, {useState, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {UseMST} from "storePath/RootStore";
import {useNavigate} from "react-router-dom";
import {Box, Button, Group, PasswordInput, TextInput, Title, MediaQuery, Text} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import { z } from 'zod';
import './LoginPage.scss';
import logo from "../../img/logo.png";
import {CSSObject} from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';

const schema = z.object({
    email: z.string().email({ message: 'Не правильный email' }),
    password: z.string().min(8,{ message: 'Должен содержать 8 символов' }),
});

const LoginPage = observer(() => {

    const {authStore}=UseMST();
    const navigate = useNavigate();

        const form = useForm({
            schema: zodResolver(schema),
            initialValues: {
                name: '',
                email: '',
            },
        });

    const accept = (event) => {
        event.preventDefault()
        authStore.tryLogin(event.target.email.value, event.target.password.value)
    }

    useEffect(() => {
        if(authStore.status === "200") {
            authStore.changeStatus("")
            navigate("/home")
        }
    },[authStore.status])

    const mobile = useMediaQuery('(max-width: 489px)');

    return (
        <MediaQuery
            query="(max-width: 489px)"
            styles={{
                img: {
                    marginTop: "50% !important",
                    paddingLeft: '15% !important',
                },
                form: {
                    width: '300px !important',
                    paddingTop: '15%',
                    paddingLeft: '7%',
                    marginLeft: "0% !important"
                }
            }}
        >
        <Box style={{position: "absolute", width: '90%',marginLeft: "6%", marginTop: "5%",marginRight: "10%",}} >
            <img src={logo} style={{paddingLeft:'42%'}}/>
            <Text align="center"
                  weight="900" style={{color: "white", fontFamily: 'Inter',fontSize: '48px', fontStyle: 'normal',marginTop: "2%", marginBottom: "3%"}}>{mobile ? '' : 'FutureMission'}
                </Text>
        <form className="form-login" onSubmit={form.onSubmit=(accept)} style={{width: "60%", marginLeft: '20%'}}>
                <TextInput style={{marginBottom: "3%"}}
                    size={mobile ? 'xs' : 'xl'}
                    pb={mobile ? 'md' : 'xs'}
                    fw="xs"
                    required
                    name="email"
                    placeholder="Email"
                    {...form.getInputProps('email')}
                />
            <PasswordInput className="password-input" style={{marginBottom: "3%"}}
                           size={mobile ? 'xs' : 'xl'}
                           pb={mobile ? 'md' : 'xs'}
                required
                placeholder="Пароль"
                name="password"
                {...form.getInputProps('password')}
            />
            <div className="button-login-form">
            <Group>
                <Button size={mobile ? 'xs' : 'xl'} style={{width: "100%", background: '#37CEBF',fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '24px',
                    lineHeight: '29px',
                    color: '#FFFFFF'}} type="submit">Войти</Button>
            </Group>
            </div>
                        <div>
                            {authStore.status}
                        </div>
        </form>
        </Box>
        </MediaQuery>
    );
}
)

export default LoginPage;