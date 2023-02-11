import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, ChakraProvider, FormControl, FormLabel, Input, Stack, useDisclosure, Container, FormErrorMessage, Text } from '@chakra-ui/react';
import { Header } from './Header';
import { usePostalJp } from 'use-postal-jp';
import { useForm } from 'react-hook-form';

export const Register = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [zipcode, setZipcode] = useState('')
    const [address, loading, error] = usePostalJp(zipcode, zipcode.length >= 7)
    const navigate = useNavigate();
    const [file, setFile] = useState('')
    /*
        利用するuseFormのメソッド
        getValues:フォームの値を読み取る処理
        handleSubmit:フォームをsubmitした時の処理
        register:フォームから入力された値のstate管理
        setValues:フォーム内のフィールドに値をセットする処理
        formState:フォームの状態をobjectで管理
    */
    const {
        getValues,
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({ mode: 'onChange' })

    const onChangeFile = (e) => {
        const files = e.target.files
        console.log(files[0]);
        if (files && files[0]) {
            setFile(files[0])
        }
    }

    // postalJPからもらったaddressをFormのaddressに保存
    useEffect(() => {
        setValue('address', zipcode.length < 7 || loading || error !== null || !address
            ? ''
            : address.prefecture + address.address1 + address.address2 + address.address3 + address.address4)
    }, [address])

    function onSubmit() {
        return navigate('/register/confirm', { state: getValues() });
    }

    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                <Stack spacing={5}>
                    <Box my={5} >
                        <Container minWidth='max-content' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                            <form onSubmit={(e) => {
                                return handleSubmit(onSubmit)(e);
                            }}>
                                <FormControl isInvalid={errors.name}>
                                    <FormLabel htmlFor='name'>氏名</FormLabel>
                                    <Input
                                        id='name'
                                        placeholder='氏名'
                                        {...register('name', {
                                            required: '氏名を入力してください',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.name && errors.name.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.nickname}>
                                    <FormLabel htmlFor='nickname'>表示名</FormLabel>
                                    <Input
                                        id='nickname'
                                        placeholder='表示名'
                                        {...register("nickname", {
                                            required: '表示名を入力してください',
                                        })} />
                                    <FormErrorMessage>
                                        {errors.nickname && errors.nickname.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.thumbnail}>
                                    <FormLabel>サムネイル</FormLabel>
                                    <Input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={onChangeFile}
                                        {...register("thumbnail", {
                                            onChange: (e) => { onChangeFile },
                                            required: 'サムネイルを入力してください',
                                        })} />
                                    <FormErrorMessage>
                                        {errors.thumbnail && errors.thumbnail.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.email}>
                                    <FormLabel htmlFor='email'>メールアドレス</FormLabel>
                                    <Input
                                        id='email'
                                        placeholder='メールアドレス'
                                        {...register("email", {
                                            required: 'メールアドレスを入力してください',
                                        })} />
                                    <FormErrorMessage>
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.zipcode}>
                                    <FormLabel htmlFor='zipcode'>郵便番号</FormLabel>
                                    <Input
                                        id='zipcode'
                                        placeholder='郵便番号'
                                        {...register("zipcode", {
                                            onChange: (e) => {
                                                setZipcode(e.target.value);
                                            },
                                            required: '郵便番号を入力してください',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.zipcode && errors.zipcode.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.address}>
                                    <FormLabel htmlFor='address'>住所</FormLabel>
                                    <Input isReadOnly={true}
                                        id='address'
                                        placeholder='住所'
                                        // useEffectで更新したuseFormのaddressの値を参照している
                                        {...register("address", {
                                            required: '郵便番号を正しく入力してください',
                                        })
                                        }
                                    />
                                    <FormErrorMessage>
                                        {errors.address && errors.address.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.address2}>
                                    <FormLabel htmlFor='address2'>住所（続き）</FormLabel>
                                    <Input
                                        id='address2'
                                        placeholder='住所（続き）'
                                        {...register("address2",
                                            {
                                                required: '住所（続き）を入力してください',
                                            })} />
                                    <FormErrorMessage>
                                        {errors.address2 && errors.address2.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.password}>
                                    <FormLabel htmlFor='password2'>パスワード</FormLabel>
                                    <Input
                                        type='password'
                                        id='password'
                                        placeholder='パスワード'
                                        {...register("password", {
                                            required: 'パスワードを入力してください',
                                        })} />
                                    <FormErrorMessage>
                                        {errors.password && errors.password.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.password2}>
                                    <FormLabel htmlFor='password2'>パスワード（確認）</FormLabel>
                                    <Input
                                        type='password'
                                        id='password2'
                                        placeholder='パスワード（確認）'
                                        {...register("password2", {
                                            validate: (value) => {
                                                return (
                                                    value === getValues("password") || "パスワードが一致しません"
                                                );
                                            }
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.password2 && errors.password2.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                                    確認
                                </Button>
                            </form>
                        </Container>
                    </Box>
                </Stack>
            </ChakraProvider >
        </>
    );
}
