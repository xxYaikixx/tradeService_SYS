import React from "react";
import { Badge, Box, Button, ChakraProvider, Container, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'

export const ModalWindow = (props) => {
    const { imageSrc, itemComment, itemAuthor, nickname } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen} m={4}>詳細を確認</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>詳細</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container>
                            <Image src={imageSrc} boxSize='300px' />
                        </Container>
                        <Container>
                            <label>【投稿者】</label>
                            <Text>{nickname}さん</Text>
                        </Container>
                        <Container>
                            <label>【コメント】</label>
                            <Text>{itemComment}</Text>
                        </Container>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
