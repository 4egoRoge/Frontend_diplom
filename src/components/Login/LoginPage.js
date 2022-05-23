import React, {useState, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {UseMST} from "storePath/RootStore";
import {useNavigate} from "react-router-dom";
import {Box, Button, Group, PasswordInput, TextInput, Title} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import { z } from 'zod';
import './LoginPage.scss';
import logo from "../../img/logo.png";

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

    return (
        <Box style={{position: "absolute", width: '60%',marginLeft: "20%", marginTop: "10%",marginRight: "20%"}}>
            <img src={logo} style={{marginLeft: "41%"}}/>
            <Title align="center" order={1} style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '900',
                fontSize: '48px',
                lineHeight: '58px',
                color: '#FFFFFF',
                marginTop: "2%",
                marginBottom: "3%"
            }}>FutureMission</Title>
        <form className="form-login" onSubmit={form.onSubmit=(accept)}>
                <TextInput className="email-input" style={{marginBottom: "3%"}}
                    size="xl"
                    required
                    name="email"
                    placeholder="Email"
                    {...form.getInputProps('email')}
                />
            <PasswordInput className="password-input" style={{marginBottom: "3%"}}
                size="xl"
                required
                placeholder="Пароль"
                name="password"
                {...form.getInputProps('password')}
            />
            <div className="button-login-form">
            <Group>
                <Button size='xl' style={{width: "100%", background: '#37CEBF',fontFamily: 'Inter',
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
    );
}
)

export default LoginPage;