import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Flex,
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import useBreadcrumbs from '../../hooks/useBreadCrumbs'
import { Product, Order } from '../../types'
import { ProductModal } from '../../components'

interface IProps {
  pizzas: Product[]
  orders: Order[]
}

const Index: NextPage<IProps> = ({ orders, pizzas }: IProps) => {
  const [pizzaList, setPizzaList] = useState(pizzas)
  const [orderList, setOrderList] = useState(orders)
  const [handleBreadCrumbs] = useBreadcrumbs()
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.user)

  useEffect(() => {
    if (user.username && user.isAdmin === true) {
      ;({ redirectTo: '/admin' })
    } else {
      router.push('/')
    }
  }, [user, router])

  const status = ['preparing', 'on the way', 'delivered']
  const handleDelete = async (slug: string) => {
    try {
      await axios.delete('http://localhost:3000/api/products/' + slug)
      setPizzaList(pizzaList.filter((pizza) => pizza.slug !== slug))
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }
  const handleStatus = async (id: string) => {
    const item = orderList.filter((order) => order._id === id)[0]
    const currentStatus = item.status
    try {
      const res = await axios.put('http://localhost:3000/api/orders/' + id, {
        status: currentStatus + 1,
      })
      setOrderList([res.data, ...orderList.filter((order) => order._id !== id)])
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name='description' content='Admin status' />
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
            Admin
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
        <Flex justify='space-between' align='center' mt={2}>
          <Box as={handleBreadCrumbs} page={'Admin'} href={''} name={''} />
          <ProductModal />
        </Flex>
        <TableContainer mt='2rem'>
          <Table variant='simple' colorScheme='teal'>
            <TableCaption>Products</TableCaption>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Id</Th>
                <Th>Title</Th>
                <Th>Price</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            {pizzaList.map((item: Product, index: number) => (
              <Tbody key={index}>
                <Tr>
                  <Td>
                    <Image
                      src={item.img[2] || item.img[0]}
                      alt={item.title}
                      width='50px'
                      height='50px'
                      objectFit='cover'
                      blurDataURL='URL'
                      placeholder='blur'
                    />
                  </Td>
                  <Td>{item._id}</Td>
                  <Td>{item.title}</Td>
                  <Td>${item.prices[0]}</Td>
                  <Td>
                    <Button colorScheme='whatsapp' variant='solid' mr={3}>
                      Edit
                    </Button>
                    <Button
                      colorScheme='cyan'
                      variant='ghost'
                      onClick={() => handleDelete(item.slug)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
        <TableContainer mt='2rem'>
          <Table variant='simple' colorScheme='teal'>
            <TableCaption>Orders</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Customer</Th>
                <Th>Total</Th>
                <Th>Payment</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            {orderList.map((item: Order, index: number) => (
              <Tbody key={index}>
                <Tr>
                  <Td>{item._id}</Td>
                  <Td>{item.customer}</Td>
                  <Td>${item.total}</Td>
                  <Td>{item.method === 0 ? 'Cash' : 'Paid'}</Td>
                  <Td>{status[item.status]}</Td>
                  <Td>
                    <Button
                      colorScheme='whatsapp'
                      variant='solid'
                      onClick={() => handleStatus(item._id)}
                    >
                      Next
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default Index

export const getServerSideProps = async () => {
  const productRes = await axios.get('http://localhost:3000/api/products')
  const orderRes = await axios.get('http://localhost:3000/api/orders')
  return {
    props: {
      pizzas: productRes.data,
      orders: orderRes.data,
    },
  }
}
