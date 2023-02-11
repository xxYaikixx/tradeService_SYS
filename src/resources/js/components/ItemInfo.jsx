import React from "react";
import { Badge, Box, Container, Image, WrapItem } from '@chakra-ui/react'
import { ModalWindow } from './ModalWindow';
import { STATUS } from '../config';
import { SHIPPING_METHOD } from '../config';

export const ItemInfo = (props) => {
    const { imageSrc, itemName, itemStatus, changeItemName, changeItemStatus, shippingMethod, itemComment, itemAuthor, nickname } = props;
    return (
        <>
            <WrapItem>
                <Container maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'  >
                    <Container align="center" py="2">
                        <Image src={imageSrc} borderRadius='lg' maxW='sm' boxSize='300px' />
                    </Container>
                    <Box p='6'>
                        <Box display='flex' alignItems='baseline'>
                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                New
                            </Badge>
                            <Box
                                color='gray.500'
                                fontWeight='semibold'
                                letterSpacing='wide'
                                fontSize='xs'
                                textTransform='uppercase'
                            >
                                <Container>
                                    商品名:{itemName}
                                </Container>
                                <Container>
                                    状態:{STATUS[itemStatus]}
                                </Container>
                                <Container>
                                    交換対象:{changeItemName}
                                </Container>
                                <Container>
                                    交換条件:{STATUS[changeItemStatus]}
                                </Container>
                                <Container>
                                    配送方法:{SHIPPING_METHOD[shippingMethod]}
                                </Container>
                                <ModalWindow imageSrc={imageSrc} itemComment={itemComment} itemAuthor={itemAuthor} nickname={nickname} />
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </WrapItem>
        </>
    );
};
