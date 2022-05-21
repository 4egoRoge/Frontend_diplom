import React, {useState, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {UseMST} from "storePath/RootStore";
import {useNavigate} from "react-router-dom";
import {Box, Button, Group, PasswordInput, TextInput} from "@mantine/core";
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
            navigate("/admin/*")
        }
    },[authStore.status])

    return (
        <Box>
            <img src={logo}/>
            <h1>
                FutureMission
            </h1>
        <form className="form-login" onSubmit={form.onSubmit=(accept)}>
                <TextInput className="email-input"
                           size="lg"
                    required
                    name="email"
                    placeholder="Email"
                    {...form.getInputProps('email')}
                />
            <PasswordInput className="password-input"
                           size="xl"
                required
                placeholder="Пароль"
                name="password"
                {...form.getInputProps('password')}
            />
            <div className="button-login-form">
            <Group>
                <Button type="submit">Войти</Button>
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