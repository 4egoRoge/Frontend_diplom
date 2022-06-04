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
    Radio, Button, MediaQuery
} from "@mantine/core";
import {Adjustments, History, Home, Pencil, Plus, Settings, Trash, Users} from "tabler-icons-react";
import {observer} from "mobx-react-lite";
import {UseMST} from "storePath/RootStore";
import {z} from "zod";
import {useForm, zodResolver} from "@mantine/form";
import './experts.scss';
import {useMediaQuery} from "@mantine/hooks";

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

        const mobile = useMediaQuery('(max-width: 489px)');

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
                        height: "20%",
                        padding: "0px",
                        margin: "0px"
                    },
                })}
            >
                <Box style={{
                    width: "75%",
                    marginLeft: '13%',
                    }}>
                    <form onSubmit={form.onSubmit=(accept)} className = 'input-register-expert' >
                        <TextInput
                            required
                            size="lg"
                            placeholder="Имя"
                            mt="sm"
                            name="name"
                            {...form.getInputProps('name')}
                            style={{marginTop: "3%",marginBottom: "3%"}}
                        />
                        <TextInput
                            required
                            size="lg"
                            placeholder="Фамилия"
                            mt="sm"
                            name="surname"
                            {...form.getInputProps('surname')}
                            style={{marginBottom: "3%"}}
                        />
                        <RadioGroup
                            spacing="xs"
                            required
                            name="gender"
                            {...form.getInputProps('gender')}
                            style={{marginBottom: "3%"}}
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
                        <TextInput
                            required
                            size="lg"
                            name="email"
                            placeholder="example@mail.com"
                            {...form.getInputProps('Email')}
                            style={{marginBottom: "3%"}}
                        />
                        <PasswordInput
                            size="lg"
                            required
                            placeholder="Пароль"
                            name="password"
                            {...form.getInputProps('password')}
                            style={{marginBottom: "3%"}}
                        />
                        <Group position="center" mt="xl">
                            <Button size="lg" style={{width: "100%", background: '#37CEBF',fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '32px',
                                lineHeight: '39px',
                                color: '#FFFFFF'}} type="submit">Добавить</Button>
                        </Group>
                    </form>
                </Box>
            </Modal>
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
                        marginTop: "205%",
                        marginLeft: "3% !important",
                        paddingLeft: '0% !important'
                    },
                    ".col2": {
                        order: 0,
                        marginTop: "10%",
                        marginLeft: "0%",
                    },
                    ".mobileGroup": {
                        gap: "0%",
                    },
                    ".containerMobile": {
                        margin: "0",
                    },
                    ".mobileWidth": {
                        width: "98% !important",
                        marginLeft: "3% !important",
                    },
                    ".fiMobile": {
                        fontSize: "14px !important",
                        lineHeight: "17px !important",
                        paddingTop: "15% !important"
                    },
                    ".emailMobile": {
                        fontSize: "14px !important",
                        lineHeight: "17px !important",
                    },
                    ".genderMobile": {
                        fontSize: "12px !important",
                        lineHeight: "15px !important",
                        paddingTop: "29% !important",
                        marginLeft: "0% !important"
                    },
                    ".editMobile": {
                        visibility: "hidden"
                    },
                    ".deleteMobile": {
                        svg: {
                            width: "48px !important",
                            height: "48px !important"
                        }
                    },
                    ".lastColMobile": {
                        padding: '0'
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
                <Users size={48} color={'#F7C978'}/>
            </ActionIcon>
            <ActionIcon size={80} onClick={() => setOpened(true)} variant="filled" style={{background: "#37CEBF", borderRadius: "40px"}}>
                <Plus
                    size={60}
                    strokeWidth={3}
                    color={'white'}
                />
            </ActionIcon>
            <ActionIcon component="a" href="#/history-tests" size={80}>
                <History size={48} color={'white'}/>
            </ActionIcon>
            <ActionIcon component="a" href="#/settings" size={80}>
                <Settings size={48} color={'white'}/>
            </ActionIcon>
        </Group>
                    </div>
                    <div className="col2">
            <Box className="mobileWidth"
                style={{
                position: "absolute", width: "63%",
                marginLeft: "19%"}}>
            <div>
                {listExpertsStore.listExperts && listExpertsStore.listExperts.map((experts, index) => {
                    return(
                        <Box
                            style={{width: "100%", background: "#37CEBF",borderRadius: "10px", marginTop:'3%', marginBottom: '3%'}}>
                            <Grid className="containerMobile" columns={8}>
                                <Grid.Col className="colMobile" span={3} >
                                    <Text className="fiMobile" style={{
                                        marginLeft: "4%",
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: '400',
                                        fontSize: '32px',
                                        lineHeight: '39px',
                                        color: '#FFFFFF',
                                        paddingTop: "5%",
                                    }}>{experts.surname} {experts.name}</Text>
                                    <Text className="emailMobile" style={{
                                        marginLeft: "4%",
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: '300',
                                        fontSize: '20px',
                                        lineHeight: '24px',
                                        color: '#FFFFFF',
                                        marginTop: "5%",
                                        marginBottom: "5%"
                                    }}>{experts.email}</Text>
                                </Grid.Col>
                                <Grid.Col className="colMobile" span={1}>
                                    <Text className="genderMobile" style={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        fontSize: '20px',
                                        lineHeight: '24px',
                                        color: '#FFFFFF',
                                        marginTop: "37%",
                                    }}>{gender[experts.gender]}</Text>
                                </Grid.Col>
                                <Grid.Col className="colMobile" span={1} offset={2}>
                                    <ActionIcon className="deleteMobile" size="80"variant="outline" style={{
                                        border: '2px solid #FFFFFF',
                                        marginTop: "20%",
                                        borderRadius: '5px'}}
                                    >
                                        <Trash color={'white'} size="80"/>
                                    </ActionIcon>
                                </Grid.Col>
                                <Grid.Col className="lastColMobile" span={1} >
                                    <ActionIcon className='editMobile' size="80" variant="outline" style={{
                                        border: '2px solid #FFFFFF',
                                        marginTop: "20%",
                                        borderRadius: '5px'}}>
                                        <Pencil color={'white'} size="80"/>
                                    </ActionIcon>
                                </Grid.Col>
                            </Grid>
                        </Box>
                    );})}
            </div>
            </Box>
                    </div>
                </div>
            </MediaQuery>
        </>
    )
}
)
export default Experts;