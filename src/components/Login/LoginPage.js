import React, {useState, useEffect} from "react";
import {Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, useColorModeValue} from '@chakra-ui/react';
import {observer} from "mobx-react-lite";
import {UseMST} from "storePath/RootStore";
import {useNavigate} from "react-router-dom";

const LoginPage = observer(() => {

    const {authStore}=UseMST();
    const navigate = useNavigate();

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
        <form onSubmit={accept}>
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Войти в свой аккаунт</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Email адрес</FormLabel>
                            <Input
                                type='email'
                                name="email"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Пароль</FormLabel>
                            <Input
                                type="password"
                                name="password"
                            />
                        </FormControl>
                        <Button type="submit"
                            bg={'blue.400'}
                            color={'black'}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Войти
                        </Button>
                        <div>
                            {authStore.status}
                        </div>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
        </form>
    );
}
)

export default LoginPage;