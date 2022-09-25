import { ChangeEvent, SetStateAction, useState } from 'react'
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Checkbox,
  Button,
} from '@chakra-ui/react'
import Head from 'next/head'
import type { NextPage } from 'next'
import Image from 'next/image'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { Product } from '../../types'
import { pizzaSize } from '../../utils/dataTypes'
import { Cart } from '../../components'
import useBreadcrumbs from '../../hooks/useBreadCrumbs'

interface IProps {
  pizza: Product
}

const Detail: NextPage<IProps> = ({ pizza }) => {
  const [price, setPrice] = useState<number>(pizza.prices[0])
  const [size, setSize] = useState<number>(0)
  const [extras, setExtras] = useState<any>([])
  const [showCart, setShowCart] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [handleBreadCrumbs] = useBreadcrumbs()

  const changePrice = (number: number) => {
    setPrice(price + number)
  }

  const handleSize = (sizeIndex: SetStateAction<any>) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, option: any) => {
    const checked = e.target.checked

    if (checked) {
      changePrice(option.price)
      setExtras((prev: any) => [...prev, option])
    } else {
      changePrice(-option.price)
      setExtras(
        extras.filter((extra: { _id: any }) => extra._id !== option._id)
      )
    }
  }

  const handleAddToBag = () => {
    dispatch(addToCart({ ...pizza, extras, price }))
  }

  const showBag = () => {
    handleAddToBag()
    setShowCart(true)
  }

  const hoverStyle = {
    _hover: {
      color: 'teal.400',
    },
  }

  return (
    <>
      <Head>
        <title>{pizza.title}</title>
        <meta name='description' content='Pizza Detail' />
      </Head>
      <Box pos='relative'>
        <Box bg='paint.blue' py='6rem'>
          <Heading
            size='2xl'
            w='container.lg'
            mx='auto'
            px={4}
            pos='absolute'
            top='70%'
            left={{ base: '0%', xl: '13.5%'}}
          >
            {pizza.title}
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
      <Box maxW='container.lg' px={4} mx='auto' py='2rem'>
        <Box
          as={handleBreadCrumbs}
          href='/pizza'
          name='Pizza'
          page={pizza.title}
        />
        <Flex
          justify='space-between'
          direction={{ base: 'column', lg: 'row' }}
          gap='3rem'
          mt='2rem'
        >
          <Box h='500px' mx={{ base:'auto', lg:'0'}}>
            <Image
              src={pizza.img?.[0]}
              width='300px'
              height='500px'
              objectFit='cover'
              alt={pizza.title}
              blurDataURL='URL'
              placeholder='blur'
            />
          </Box>
          <Box w={{ base: 'full', lg: '550px' }}>
            <VStack spacing={3} align='start' mb='3rem'>
              <Text fontSize='lg'>{pizza.desc}</Text>
              <Heading as='h2' size='lg' mb={2}>
                From: ${pizza.prices[0]}
              </Heading>
            </VStack>
            <VStack spacing={3} align='start' mb='3rem'>
              <Heading as='h2' size='lg'>
                Make a selection
              </Heading>
              <Text fontSize='lg'>Choose a size</Text>
              <Flex gap={3}>
                <HStack spacing={4} cursor='pointer'>
                  {pizzaSize.map((item: any, index: number) => (
                    <Box key={index} onClick={() => handleSize(item.id)}>
                      <Image
                        src={item.img}
                        width={item.width}
                        height={item.height}
                        alt='pizza'
                        blurDataURL='URL'
                        placeholder='blur'
                      />
                      <Text sx={hoverStyle} textAlign='center'>
                        {item.size}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </Flex>
            </VStack>
            <VStack spacing={3} align='start' mb='3rem'>
              <Heading as='h2' size='lg'>
                Choose additional ingredients
              </Heading>
              {pizza.extraOptions.map((option) => (
                <Box key={option._id}>
                  <Checkbox
                    onChange={(e) => handleChange(e, option)}
                    id={option.text}
                  >
                    {option.text}
                  </Checkbox>
                </Box>
              ))}
            </VStack>
            <VStack
              spacing={4}
              align='start'
              mb='3rem'
              p={4}
              bg='whiteAlpha.400'
              direction='column'
              rounded='lg'
            >
              <Flex justify='space-between' align='center' w='full'>
                <Heading as='h2' size='md'>
                  SubTotal: ${price}
                </Heading>
                <Button colorScheme='whatsapp' onClick={showBag}>
                  Add To Bag
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Flex>
        {showCart && <Cart showCart={showCart} setShowCart={setShowCart} />}
      </Box>
    </>
  )
}
export default Detail

export async function getServerSideProps({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const res = await axios.get(`http://localhost:3000/api/products/${slug}`)
  return {
    props: {
      pizza: res.data,
    },
  }
}
