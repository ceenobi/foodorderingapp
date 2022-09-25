import React from 'react'
import { Text, Box, Flex } from '@chakra-ui/react'
import useTotal from '../hooks/useTotal'

export default function Total() {
  const [getTotal] = useTotal()
  
  return (
    <>
      <Flex justify='space-between' mb={4}>
        <Text fontSize='lg' fontWeight='bold'>
          Subtotal
        </Text>
        <Text fontSize='lg' fontWeight='bold'>
          ${getTotal().totalPrice.toFixed(2)}
        </Text>
      </Flex>
      <Flex justify='space-between'>
        <Text fontSize='lg' fontWeight='bold'>
          Total Order
        </Text>
        <Text>
          ({getTotal().totalQuantity} items) :{' '}
          <Box as='span' fontWeight='bold' fontSize='lg'>
            ${getTotal().totalPrice.toFixed(2)}
          </Box>
        </Text>
      </Flex>
    </>
  )
}
