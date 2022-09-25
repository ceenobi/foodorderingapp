import { useState, useEffect, useRef } from 'react'
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import axios from 'axios'

import { Product } from '../types'
import { NoResult, PizzaCard } from '../components'
import useBreadcrumbs from '../hooks/useBreadCrumbs'
import autoAnimate from '@formkit/auto-animate'

interface IProps {
  pizzaList: Product[]
}

const Pizza = ({ pizzaList }: IProps) => {
  const [handleBreadCrumbs] = useBreadcrumbs()

  const parentRef = useRef()

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current)
    }
  }, [parentRef])

  return (
    <>
      <Head>
        <title>Pizza list</title>
        <meta name='description' content='List all Products' />
      </Head>
      <Box pos='relative'>
        <Box bg='paint.blue' py='6rem'>
          <Heading
            size='2xl'
            maxW='container.lg'
            mx='auto'
            px={4}
            pos='absolute'
            top='70%'
            left={{ base: '0%', lg: '13.5%' }}
          >
            Pizza
          </Heading>
          <Box
            bg='blackAlpha.800'
            pos='absolute'
            top='90%'
            w='100%'
            h='50px'
            opacity='0.6'
          />
        </Box>
      </Box>
      <Box maxW='container.lg' mx='auto' px={4} py='2rem'>
        <Box as={handleBreadCrumbs} page={'Pizza'} href={''} name={''} />
        <Flex
          justify='space-between'
          direction={{ base: 'column', lg: 'column' }}
          mt='2rem'
        >
          <VStack spacing={3} align='center' mb={6}>
            <Text fontSize='lg'>
              Looking for inspiration? Whether you’re celebrating a special
              occasion, or you just want to chill alone, a carefully chosen
              pizza makes a good companion. Choose from a wide range of pizzas,
              and don’t forget we offer a range of personalisation and delivery
              options too.
            </Text>
          </VStack>
          <Box w='full' mx='auto' ref={parentRef}>
            {pizzaList.length ? (
              pizzaList?.map((pizza: Product) => (
                <PizzaCard item={pizza} key={pizza._id} />
              ))
            ) : (
              <NoResult text={'No Results to display'} />
            )}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Pizza

export async function getServerSideProps() {
  const response = await axios.get('http://localhost:3000/api/products')
  return {
    props: {
      pizzaList: response.data,
    },
  }
}
