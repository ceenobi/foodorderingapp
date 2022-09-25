import type { NextPage } from 'next'
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Icon,
} from '@chakra-ui/react'
import Head from 'next/head'
import axios from 'axios'
import { IoIosCash } from 'react-icons/io'
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdPendingActions, MdOutlineHomeWork } from 'react-icons/md'
import { FiTruck } from 'react-icons/fi'

import useBreadcrumbs from '../../hooks/useBreadCrumbs'

type IProps = {
  order: {
    _id: string
    customer: string
    address: string
    total: number
    status?: any
  }
}

const Orders: NextPage<IProps> = ({
  order: { _id, customer, address, total, status },
}) => {
  const [handleBreadCrumbs] = useBreadcrumbs()
  const tracking = status


//   const statusUpdate = (index: number) => {
//     if (index - tracking < 1) return 'done' 
//     if (index - tracking === 1) return inProgress
//     if (index - tracking > 1) return undone
//   }

  const isPaid = tracking < 1 ? 'teal' : ''
  const isPreparing = tracking === 1 ? 'teal' : ''
  const isUndone = tracking > 1 ? 'teal' : ''
  const isDelivered= tracking  ? 'teal' : ''
  
  return (
    <>
      <Head>
        <title>Order id: {_id}</title>
        <meta name='description' content='Order status' />
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
            Order Details
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
      <Box maxW='container.lg' mx='auto' px={4} py='3rem'>
        <Box
          as={handleBreadCrumbs}
          page={'Orders'}
          href={'/pizza'}
          name={'Pizza'}
        />
        <TableContainer mt='2rem'>
          <Table variant='simple' colorScheme='teal'>
            <TableCaption>Your orders</TableCaption>
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Customer</Th>
                <Th>Address</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{_id}</Td>
                <Td>{customer}</Td>
                <Td>{address}</Td>
                <Td>$ {total}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Flex align='center' justify='space-between' mt='2rem'>
          <VStack>
            <Icon as={IoIosCash} boxSize='25px' />
            <Text>Payment</Text>
            <Icon as={AiFillCheckCircle} boxSize='15px' color={isPaid} />
          </VStack>
          <VStack>
            <Icon as={MdPendingActions} boxSize='25px' />
            <Text>Preparing</Text>
            <Icon as={AiFillCheckCircle} boxSize='15px' color={isPreparing} />
          </VStack>
          <VStack>
            <Icon as={FiTruck} boxSize='25px' />
            <Text>On the way</Text>
            <Icon as={AiFillCheckCircle} boxSize='15px' color={isUndone} />
          </VStack>
          <VStack>
            <Icon as={MdOutlineHomeWork} boxSize='25px' />
            <Text>Delivered</Text>
            <Icon as={AiFillCheckCircle} boxSize='15px' color={isDelivered} />
          </VStack>
        </Flex>
      </Box>
    </>
  )
}

export default Orders

export const getServerSideProps = async ({ params }: any) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`)
  return {
    props: { order: res.data },
  }
}
