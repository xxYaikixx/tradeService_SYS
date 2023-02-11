
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, ChakraProvider, Container, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Radio, RadioGroup, Spacer, Stack, TagLabel, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { Header } from './Header';
import { useForm, Controller } from 'react-hook-form';

export const CreateItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const navigate = useNavigate();
    const [file, setFile] = useState('')
    const {
        getValues,
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting },
    } = useForm({ mode: 'onChange' })

    const onChangeFile = (e) => {
        const files = e.target.files
        if (files && files[0]) {
            setFile(files[0])
        }
    }

    function onSubmit() {
        return navigate('/create/confirm', { state: getValues() });
    }

    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                <Box my={5} >
                    <Container minWidth='max-content' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <Stack spacing={5}>
                            <form onSubmit={(e) => {
                                return handleSubmit(onSubmit)(e);
                            }}>
                                <FormControl isInvalid={errors.itemName}>
                                    <FormLabel htmlFor='itemName'>アイテム名 </FormLabel>
                                    <Input
                                        id='itemName'
                                        placeholder='アイテム名'
                                        {...register('itemName', {
                                            required: 'アイテム名を入力してください',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.itemName && errors.itemName.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.itemStatus}>
                                    <Controller
                                        render={
                                            ({ field }) => {
                                                return (
                                                    <>
                                                        <FormLabel htmlFor='itemStatus'> ステータス </FormLabel>
                                                        <RadioGroup {...field}>
                                                            <Stack direction='row'>
                                                                <Radio value='0'><Text fontSize='sm'>カプセル未開封</Text></Radio>
                                                                <Radio value='1'><Text fontSize='sm'>カプセルのみ開封済み</Text></Radio>
                                                                <Radio value='2'><Text fontSize='sm'>カプセルおよび内包装開封済み（新品同様）</Text></Radio>
                                                                <Radio value='3'><Text fontSize='sm'>開封済中古品</Text></Radio>
                                                            </Stack>
                                                        </RadioGroup>
                                                        <FormErrorMessage>
                                                            {errors.itemStatus && errors.itemStatus.message}
                                                        </FormErrorMessage>
                                                    </>
                                                );
                                            }
                                        }
                                        rules={{ required: 'ステータスを入力してください' }}
                                        name="itemStatus"
                                        control={control}
                                    />
                                </FormControl>
                                <FormControl isInvalid={errors.image}>
                                    <FormLabel>イメージ画像</FormLabel>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={onChangeFile}
                                        {...register("image", {
                                            onChange: (e) => { onChangeFile },
                                            required: 'イメージ画像を入力してください',
                                        })} />
                                    <FormErrorMessage>
                                        {errors.image && errors.image.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.comment}>
                                    <FormLabel htmlFor='comment'>コメント・補足 </FormLabel>
                                    <Input
                                        id='comment'
                                        placeholder='コメント・補足'
                                        {...register('comment', {
                                            required: 'コメント・補足を入力してください',
                                        })} />
                                    <FormErrorMessage>
                                        {errors.comment && errors.comment.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.itemTargetName}>
                                    <FormLabel htmlFor='itemTargetName'>交換対象 </FormLabel>
                                    <Input
                                        id='itemTargetName'
                                        placeholder='交換対象'
                                        {...register('itemTargetName', {
                                            required: '交換対象を入力してください',
                                        })} />
                                    <FormErrorMessage>
                                        {errors.itemTargetName && errors.itemTargetName.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.itemTargetStatus}>
                                    <Controller
                                        render={
                                            ({ field }) => {
                                                return (
                                                    <>
                                                        <FormLabel htmlFor='itemTargetStatus'> 交換条件 </FormLabel>
                                                        <RadioGroup {...field}>
                                                            <Stack direction='row'>
                                                                <Radio value='0'><Text fontSize='sm'>カプセル未開封</Text></Radio>
                                                                <Radio value='1'><Text fontSize='sm'>カプセルのみ開封済み</Text></Radio>
                                                                <Radio value='2'><Text fontSize='sm'>カプセルおよび内包装開封済み（新品同様）</Text></Radio>
                                                                <Radio value='3'><Text fontSize='sm'>開封済中古品</Text></Radio>
                                                            </Stack>
                                                        </RadioGroup>
                                                        <FormErrorMessage>
                                                            {errors.itemTargetStatus && errors.itemTargetStatus.message}
                                                        </FormErrorMessage>
                                                    </>
                                                );
                                            }
                                        }
                                        rules={{ required: '交換条件を入力してください' }}
                                        name="itemTargetStatus"
                                        control={control}
                                    />
                                </FormControl>
                                <FormControl isInvalid={errors.shippingMethod}>
                                    <Controller
                                        render={
                                            ({ field }) => {
                                                return (
                                                    <>
                                                        <FormLabel htmlFor='shippingMethod'> 郵送方法 </FormLabel>
                                                        <RadioGroup {...field}>
                                                            <Stack direction='row'>
                                                                <Radio value='0'><Text fontSize='sm'>手渡し</Text></Radio>
                                                                <Radio value='1'><Text fontSize='sm'>郵便（記名）</Text></Radio>
                                                                <Radio value='2'><Text fontSize='sm'>郵便（匿名）</Text></Radio>
                                                                <Radio value='3'><Text fontSize='sm'>宅配（記名）</Text></Radio>
                                                                <Radio value='4'><Text fontSize='sm'>宅配（匿名）</Text></Radio>
                                                            </Stack>
                                                        </RadioGroup>
                                                        <FormErrorMessage>
                                                            {errors.shippingMethod && errors.shippingMethod.message}
                                                        </FormErrorMessage>
                                                    </>
                                                );
                                            }
                                        }
                                        rules={{ required: '郵送方法を入力してください' }}
                                        name="shippingMethod"
                                        control={control}
                                    />
                                </FormControl>
                                <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
                                    確認
                                </Button>
                            </form>
                        </Stack>
                    </Container>
                </Box>
            </ChakraProvider >
        </>
    );
}
