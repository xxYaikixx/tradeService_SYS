import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Center, ChakraProvider, Container, FormLabel, HStack, Input, InputGroup, InputRightElement, Spacer, Stack, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { STATUS } from '../config';
import { SHIPPING_METHOD } from '../config';

export const CreateItemConfirm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const location = useLocation();
    const navigate = useNavigate();
    const createPost = async () => {
        const data = {
            itemName: location.state.itemName,
            itemStatus: location.state.itemStatus,
            image: location.state.image[0],
            comment: location.state.comment,
            itemTargetName: location.state.itemTargetName,
            itemTargetStatus: location.state.itemTargetStatus,
            shippingMethod: location.state.shippingMethod,
        }
        const headers = { "content-type": "multipart/form-data" };
        axios.post('/api/posts/create', data, { headers })
            .then(res => {
                navigate("/", { state: { message: 'アイテムを追加しました' } });
            }
            )
            .catch(error => {
                console.log(error);
                if (error.response.status === 400) {
                    setFormData({ ...location.state, error_list: error.response.data.validation_errors });
                } else {
                    console.log('通信に失敗しました');
                }
            });
    }

    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                <Stack spacing={5}>
                    <Container minWidth='max-content' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <form>
                            <FormLabel
                                htmlFor=''
                                textAlign="center">アイテム名</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={location.state.itemName} />
                            <FormLabel htmlFor='' textAlign="center">ステータス</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={STATUS[location.state.itemStatus]} />
                            <FormLabel htmlFor='' textAlign="center">イメージ画像</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={location.state.image[0].name} />
                            <FormLabel htmlFor='' textAlign="center">コメント・補足</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={location.state.comment} />
                            <FormLabel htmlFor='' textAlign="center">交換対象</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={location.state.itemTargetName} />
                            <FormLabel htmlFor='' textAlign="center">交換条件</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={STATUS[location.state.itemTargetStatus]} />
                            <FormLabel htmlFor='' textAlign="center">郵送方法</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={SHIPPING_METHOD[location.state.shippingMethod]} />
                            <Center>
                                <HStack spacing='24px' textAlign="center">
                                    <Button onClick={() => { navigate("/create") }} colorScheme='teal' variant='outline'>戻る</Button>
                                    <Button onClick={createPost} colorScheme='teal' variant='solid'>作成</Button>
                                </HStack>
                            </Center>
                        </form>
                    </Container>
                </Stack>
            </ChakraProvider>
        </>
    )
}
