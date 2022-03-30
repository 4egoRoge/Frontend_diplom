import React, {useState, useEffect} from "react";
import {Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, useColorModeValue} from '@chakra-ui/react';
import {observer} from "mobx-react-lite";
import {UseMST} from "storePath/RootStore";

function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue;
}

const LoginPage = observer(() => {
        const useLocalStorage = (key, defaultValue) => {
            const [value, setValue] = useState(() => {
                return getStorageValue(key, defaultValue);
            });

            useEffect(() => {
                localStorage.setItem(key, JSON.stringify(value));
            }, [key, value]);

            return [value, setValue];
        };

    const [email, setEmail] = useLocalStorage("email", "");
    const [password, setPassword] = useLocalStorage("password", "");
    const {authStore}=UseMST();

    const accept = (event) => {
        event.preventDefault()
        authStore.tryLogin(event.target.email.value, event.target.password.value)
ч
    }

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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Пароль</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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