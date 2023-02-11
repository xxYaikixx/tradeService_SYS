
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, ChakraProvider, Container, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Spacer, Stack, TagLabel, Text, useDisclosure } from '@chakra-ui/react';
import { Header } from '../components/Header';
import axios from 'axios';
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

export const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const navigate = useNavigate();
    const location = useLocation()
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }
    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_id', res.data.id);
                    localStorage.setItem('auth_nickname', res.data.nickname);
                    localStorage.setItem('auth_thumbnail', res.data.url);
                    swal("ログイン成功", res.data.message, "success");
                    navigate('/');
                } else if (res.data.status === 401) {
                    swal("注意", res.data.message, "warning");
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            });
        });
    }

    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                <Box my={10}>
                    <Container maxW='xl' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <Stack spacing={3}>
                            <Text>{location.state && location.state.message}</Text>
                            <form onSubmit={loginSubmit}>
                                <FormLabel>ログインID（メールアドレス）</FormLabel>
                                <Input type='email' name="email"
                                    onChange={handleInput} value={loginInput.email} />
                                <span><Text fontSize='sm' color='red'>{loginInput.error_list.email}</Text></span>
                                <FormLabel>パスワード</FormLabel>
                                <Input type='password' name="password"
                                    onChange={handleInput} value={loginInput.password} />
                                <span><Text fontSize='sm' color='red'>{loginInput.error_list.password}</Text></span>
                                <br /><br />
                                <Button colorScheme='blue' type="submit">ログイン</Button>
                            </form>
                        </Stack>
                        <Link to='/register'><Text color='RoyalBlue' p={2}>会員登録</Text></Link>
                        <Link to='/forget'><Text color='RoyalBlue' p={2}>ログイン出来ない方はこちら</Text></Link>
                    </Container>
                </Box>

            </ChakraProvider>


        </>
    );
}
