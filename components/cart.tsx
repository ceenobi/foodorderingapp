import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  HStack,
  Button,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { RiCloseLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { Product } from '../types'
import CartItems from './cartItems'
import Total from './total'

interface IProps {
  [x: string]: any
  item: Product[]
}

export default function Cart({ showCart, setShowCart }: any) {
  const cart = useSelector((state: any) => state.cart.cart)
  const router = useRouter()

  const proceedToPay = () => {
    router.push('/checkout')
    setShowCart(!showCart)
  }

  return (
    <>
      <Box
        w={{ base: 'full', md: '500px' }}
        pos='fixed'
        top='0%'
        right={0}
        p={4}
        bg='#000'
        zIndex={15}
        as={motion.div}
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: '0.1' }}
      >
        <Flex
          h='100vh'
          overflow='auto'
          alignItems='center'
          direction='column'
          gap='3rem'
          pos='relative'
          w={{ base: 'full', lg: '90%' }}
          mx='auto'
          color='whiteAlpha.900'
        >
          <HStack spacing={4} w='full'>
            <IconButton
              variant='unstyled'
              aria-label='close menu'
              icon={<RiCloseLine />}
              fontSize='4xl'
              onClick={() => setShowCart(!showCart)}
            />
            <Heading as='h2' size={['md', 'lg']}>
              Your shopping Bag
            </Heading>
          </HStack>
          {cart.length < 1 && (
            <Text fontSize='lg'>Your Shopping Bag is empty</Text>
          )}
          {cart.length >= 1 &&
            cart?.map((item: IProps, index: number) => (
              <CartItems
                key={index}
                id={item._id}
                img={item.img}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                extras={item.extras}
                slug={item.slug}
              />
            ))}
          <Box w='full' borderTop='1px' py={2}>
            <Total />
          </Box>
          <Box pos='absolute' bottom='10%'>
            <VStack spacing={3}>
              <Button colorScheme='teal' onClick={proceedToPay} size='lg'>
                Proceed To Checkout
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
