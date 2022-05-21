import React, {useEffect, useState} from "react";
import {
    ActionIcon,
    Box,
    Modal,
    Grid,
    Group,
    Text,
    Title,
    TextInput,
    PasswordInput,
    RadioGroup,
    Radio, Button
} from "@mantine/core";
import {Adjustments, History, Home, Pencil, Plus, Settings, Trash, Users} from "tabler-icons-react";
import {observer} from "mobx-react-lite";
import {UseMST} from "storePath/RootStore";
import {listExpertsStore} from "storePath/ListExpertsStore/ListExpertsStore";
import RegisterExpert from "../AdminPage/RegisterExpert";
import {z} from "zod";
import {useForm, zodResolver} from "@mantine/form";

const Experts = observer(() => {

        const schema = z.object({
            name: z.string().min(2, { message: 'Имя должно содержать 2 симвода' }),
            email: z.string().email({ message: 'Не правильный email' }),
            password: z.string().min(8,{ message: 'Должен содержать 8 символов' }),
        });

        const {listExpertsStore}=UseMST();
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
        useEffect(() => {
            listExpertsStore.getListExperts()
        },[])

        let gender = [,'М','Ж'];

        const [opened, setOpened] = useState(false);

    return (
        <>
            <Modal
                centered
                size="80%"
                opened={opened}
                onClose={() => setOpened(false)}
                title="Добавить эксперта"
                styles={(theme) => ({
                    root: {
                        margin: "0px"
                    },
                    modal: {
                        backgroundColor: '#6A6A6A',
                    },
                    CloseIcon: {
                        width: "31",
                        height: "31"
                    },
                    title: {
                        color: "#FFFFFF",
                        marginLeft: "37%",
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
                <Box style={{width: "75%", marginLeft: '13%'}}>
                    <form onSubmit={form.onSubmit=(accept)}
                          styles={(theme) => ({
                              textInput: {
                                  backgroundColor: "#979797"
                              }
                          })}>
                        <TextInput
                            classname = 'input-register-expert'
                            required
                            placeholder="Иван"
                            mt="sm"
                            name="name"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            required
                            placeholder="Иванов"
                            mt="sm"
                            name="surname"
                            {...form.getInputProps('surname')}
                        />
                        <RadioGroup
                            spacing="xs"
                            required
                            name="gender"
                            {...form.getInputProps('gender')}
                        >
                            <Radio value="1" label="Мужской" />
                            <Radio value="2" label="Женский" />
                        </RadioGroup>
                        <TextInput
                            required
                            name="email"
                            placeholder="example@mail.com"
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            required
                            placeholder="Пароль"
                            name="password"
                            {...form.getInputProps('password')}
                        />
                        <Group position="center" mt="xl">
                            <Button type="submit">Зарегестрироваться</Button>
                        </Group>
                    </form>
                </Box>
            </Modal>
        <Group position="center" spacing="xl" style={{
            marginTop: "2%"
        }}>
            <ActionIcon>
                <Home size={48} color={'white'}/>
            </ActionIcon>
            <ActionIcon>
                <Users size={48} color={'#F7C978'}/>
            </ActionIcon>
            <ActionIcon onClick={() => setOpened(true)} size="xl" radius="xl" variant="filled" style={{background: "#37CEBF"}}>
                <Plus
                    size={60}
                    strokeWidth={3}
                    color={'white'}
                />
            </ActionIcon>
            <ActionIcon>
                <History size={48} color={'white'}/>
            </ActionIcon>
            <ActionIcon>
                <Settings size={48} color={'white'}/>
            </ActionIcon>
        </Group>
            <Box style={{
                position: "absolute", width: "63%",/* background: "red",*/ height: "100px",
                marginLeft: "19%"}}>
            <div>
                {listExpertsStore.listExperts && listExpertsStore.listExperts.map((experts, index) => {
                    return(
                        <Box
                            style={{width: "100%", background: "#37CEBF",borderRadius: "10px", marginTop:'3%'}}>
                            <Grid columns={8}>
                                <Grid.Col span={2} >
                                    <Title order={3} style={{
                                        marginLeft: "4%",
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: '400',
                                        fontSize: '32px',
                                        lineHeight: '39px',
                                        color: '#FFFFFF',
                                        paddingTop: "10%",
                                    }}>{experts.surname} {experts.name}</Title>
                                    <Text style={{
                                        marginLeft: "4%",
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: '300',
                                        fontSize: '20px',
                                        lineHeight: '24px',
                                        color: '#FFFFFF',
                                        marginBottom: "10%"
                                    }}>{experts.email}</Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text style={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        fontSize: '20px',
                                        lineHeight: '24px',
                                        color: '#FFFFFF',
                                        marginTop: "37%",
                                    }}>{gender[experts.gender]}</Text>
                                </Grid.Col>
                                <Grid.Col span={1} offset={3}>
                                    <ActionIcon size="60" radius="xs" variant="outline" style={{
                                        border: '2px solid #FFFFFF',
                                        marginTop: "20%",
                                        borderRadius: '5px'}}>
                                        <Trash color={'white'} size="60"/>
                                    </ActionIcon>
                                </Grid.Col>
                                <Grid.Col span={1} >
                                    <ActionIcon size="60" radius="xs" variant="outline" style={{
                                        border: '2px solid #FFFFFF',
                                        marginTop: "20%",
                                        borderRadius: '5px'}}>
                                        <Pencil color={'white'} size="60"/>
                                    </ActionIcon>
                                </Grid.Col>
                            </Grid>
                        </Box>
                    );})}
            </div>
            </Box>
        </>
    )
}
)
export default Experts;