import React from 'react'
import { Box, Flex, HStack, VStack, Icon, Text } from '@chakra-ui/react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from '../redux/cartSlice'

const CartItems = ({
  id,
  img,
  title,
  price,
  extras,
  slug,
  quantity = 0,
}: any) => {
  const dispatch = useDispatch()
  return (
    <HStack w='full' justify='space-between'>
      <Image
        src={img[1]}
        alt={title}
        width='100px'
        height='100px'
        objectFit='cover'
      />
      <VStack spacing={3} align='start'>
        <Text fontSize='lg'>{title}</Text>
        {extras && (
          <Flex flexWrap='wrap' gap='4px' align='start'>
            <Box as='span'>Extras:</Box>
            {extras.map((extra: any) => (
              <Flex key={extra._id}>
                <Box as='span'>{extra.text},&nbsp;</Box>
              </Flex>
            ))}
          </Flex>
        )}
        <HStack justify='space-between' border='1px solid grey' p={2} w='150px'>
          <Icon
            as={AiOutlineMinus}
            w={8}
            h={6}
            onClick={() => dispatch(decrementQuantity(id))}
            cursor='pointer'
            color='teal.400'
          />
          <Text>
            <Box as='span' w={8} h={6} fontWeight='bold'>
              {quantity}
            </Box>
          </Text>
          <Icon
            as={AiOutlinePlus}
            w={8}
            h={6}
            onClick={() => dispatch(incrementQuantity(id))}
            cursor='pointer'
            color='teal.400'
          />
        </HStack>
      </VStack>
      <VStack spacing={4}>
        <Icon
          as={MdDelete}
          boxSize='30px'
          onClick={() => dispatch(removeItem(slug))}
          cursor='pointer'
          color='teal.400'
        />
        <Text> ${price}</Text>
      </VStack>
    </HStack>
  )
}

export default CartItems
