import { Box, ChakraProvider, Input, Heading, useDisclosure, Wrap, FormControl, FormLabel, Stack, RadioGroup, Radio, Text, Flex, Button, Container, ButtonGroup, Center } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { Header } from './Header';
import { ItemInfo } from './ItemInfo';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';

export const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const location = useLocation();
    const toast = useToast();
    const message = location.state !== null ? location.state.message : null;
    useEffect(() => {
        if (message !== null) {
            toast({
                title: message,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
    }, [message]);


    //postsの状態を管理する
    const [items, setItems] = useState([]);
    useEffect(() => {
        getItemsData();
    }, [])
    //バックエンドからpostsの一覧を取得する処理
    const getItemsData = () => {
        axios
            .get('/api/posts')
            .then(response => {
                setItems(response.data);     //バックエンドから返ってきたデータでpostsを更新する
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    let contents = [];
    items.map((item) =>
        contents.push({
            name: item.name,
            status: item.status,
            comment: item.comment,
            image: item.image,
            userId: item.user_id,
            changeItemName: item.change_item_name,
            changeItemStatus: item.change_item_status,
            shippingMethod: item.shipping_method,
            nickname: item.nickname,
        })
    );

    return (
        <>
            <div >
                <ChakraProvider>
                    <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                    <Center>
                        <Box borderWidth='1px' borderRadius='lg' my="12" mx="8" w='80%' >
                            <FormControl>
                                <Box p="4" w="640px">
                                    <FormLabel>ガチャガチャ名</FormLabel>
                                    <Flex>
                                        <Input type='text' bgColor="white" size='lg' />
                                        <Button mx={4} my={1} >しぼる</Button>
                                    </Flex>
                                </Box>
                                <Flex>
                                    <Box p="4" w="640px">
                                        <FormLabel>欲しい商品名</FormLabel>
                                        <Input type='text' bgColor="white" size='md' />
                                        <Box p="4">
                                            <FormLabel as='legend'>状態</FormLabel>
                                            <RadioGroup defaultValue='4' >
                                                <Stack>
                                                    <Radio value='4'><Text fontSize='sm'>どちらでもよい</Text></Radio>
                                                    <Radio value='0'><Text fontSize='sm'>カプセル未開封</Text></Radio>
                                                    <Radio value='1'><Text fontSize='sm'>カプセルのみ開封済み</Text></Radio>
                                                    <Radio value='2'><Text fontSize='sm'>カプセルおよび内包装開封済み（新品同様）</Text></Radio>
                                                    <Radio value='3'><Text fontSize='sm'>開封済中古品</Text></Radio>
                                                </Stack>
                                            </RadioGroup>
                                        </Box>
                                    </Box>
                                    <Box py="8"><Text fontSize='4xl'>⇔</Text></Box>
                                    <Box p="4" w="640px">
                                        <FormLabel>交換できる物</FormLabel>
                                        <Input type='text' bgColor="white" size='md' />
                                        <Box p="4">
                                            <FormLabel as='legend' >状態</FormLabel>
                                            <RadioGroup defaultValue='0' >
                                                <Stack>
                                                    <Radio value='0'><Text fontSize='sm'>カプセル未開封</Text></Radio>
                                                    <Radio value='1'><Text fontSize='sm'>カプセルのみ開封済み</Text></Radio>
                                                    <Radio value='2'><Text fontSize='sm'>カプセルおよび内包装開封済み（新品同様）</Text></Radio>
                                                    <Radio value='3'><Text fontSize='sm'>開封済中古品</Text></Radio>
                                                </Stack>
                                            </RadioGroup>
                                        </Box>
                                    </Box>
                                </Flex>
                                <Container textAlign="center" p="4">
                                    <ButtonGroup gap='4'>
                                        <Button my={4} colorScheme='gray'>
                                            クリア
                                        </Button>
                                        <Button my={4} colorScheme='blue'>さがす！</Button>
                                    </ButtonGroup>
                                </Container>
                            </FormControl>
                        </Box>
                    </Center>
                    <Box bg='white' w='100%' p={4} color='gray.900' >
                        <Heading as='h3' size='lg' color='steelblue' > 検索結果 </Heading>
                    </Box>
                    <Wrap spacing='16px' justify='center'>
                        {contents.map((content, index) => (
                            <ItemInfo key={index}
                                imageSrc={content.image}
                                itemName={content.name}
                                itemStatus={content.status}
                                itemAuthor={content.userId}
                                changeItemName={content.changeItemName}
                                changeItemStatus={content.changeItemStatus}
                                shippingMethod={content.shippingMethod}
                                itemComment={content.comment}
                                nickname={content.nickname} />
                        ))}
                    </Wrap>
                </ChakraProvider>
            </div >
        </>
    );
}