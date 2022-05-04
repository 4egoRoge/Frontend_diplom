import React from "react";
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import {TextInput, Button, Box, Group, Text, PasswordInput, Radio, RadioGroup} from '@mantine/core';
import {observer} from "mobx-react-lite";
import {UseMST} from "storePath/RootStore";

const schema = z.object({
    name: z.string().min(2, { message: 'Имя должно содержать 2 симвода' }),
    email: z.string().email({ message: 'Не правильный email' }),
    password: z.string().min(8,{ message: 'Должен содержать 8 символов' }),
});

const RegisterExpert = observer(() => {

    const {registerStore}=UseMST();

        const accept = (event) => {
            event.preventDefault()
            registerStore.tryRegister(event.target.email.value,
                                      event.target.password.value,
                                      event.target.name.value,
                                      event.target.surname.value,
                                      event.target.gender.value)
        }

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            name: '',
            email: '',
        },
    });
    return(

    <Box sx={{ maxWidth: 340 }} mx="auto">
        <Text align="center">Зарегестрировать эксперта</Text>
        <form onSubmit={form.onSubmit=(accept)}>
            <TextInput
                required
                label="Email"
                name="email"
                placeholder="example@mail.com"
                {...form.getInputProps('email')}
            />

            <PasswordInput
                required
                placeholder="Пароль"
                label="Пароль"
                name="password"
                {...form.getInputProps('password')}
            />
            <TextInput
                required
                label="Имя"
                placeholder="Иван"
                mt="sm"
                name="name"
                {...form.getInputProps('name')}
            />
            <TextInput
                required
                label="Фамилия"
                placeholder="Иванов"
                mt="sm"
                name="surname"
                {...form.getInputProps('surname')}
            />
            <RadioGroup
                orientation="vertical"
                label="Пол"
                spacing="xs"
                required
                name="gender"
                {...form.getInputProps('gender')}
            >
                <Radio value="1" label="Мужской" />
                <Radio value="2" label="Женский" />
            </RadioGroup>
            <Group position="center" mt="xl">
                <Button type="submit">Зарегестрироваться</Button>
            </Group>
        </form>
    </Box>
    )
}
)

export default RegisterExpert;