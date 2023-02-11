import { Box, ChakraProvider, Flex, Heading, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { Header } from './Header';
import { ItemInfo } from './ItemInfo';
import axios from 'axios';

export const Top = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

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
                    <Box bg='white' w='100%' p={4} color='gray.900' >
                        <Heading as='h3' size='lg' color='steelblue' > 新着 </Heading>
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