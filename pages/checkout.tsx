import { FormEventHandler, useEffect, useState, useId } from 'react'
import { usePaystackPayment } from 'react-paystack'
import { PaystackProps } from 'react-paystack/dist/types'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Button,
  chakra,
  Text,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import useTotal from '../hooks/useTotal'
import { reset } from '../redux/cartSlice'
import Loader from '../hooks/loader'

type order = {
  customer: string
  address: string
  total: number
  method: number
}

type referenceObj = {
  message: string
  reference: string
  status: 'success' | 'failure'
  trans: string
  transaction: string
  trxref: string
}

const Checkout = () => {
  const [email, setEmail] = useState<string>('')
  const [customer, setCustomer] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [ref, setRef] = useState('')
  const [success, setSuccess] = useState<boolean>(false)
  const [cash, setCash] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [getTotal] = useTotal()
  const user = useSelector((state: any) => state.auth.user)
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY
  const amount = getTotal().totalPrice
  const dispatch = useDispatch()
  const router = useRouter()
  const ID = useId()
  const currency = 'USD'
  const style: any = { layout: 'vertical' }
  const name = customer

  useEffect(() => {
    if (user.username) {
      ;({ redirectTo: '/checkout' })
    } else {
      router.push('/login')
    }
  }, [user, router])

  //   implement paypal
  const createOrder = async (data: order) => {
    try {
      const res = await axios.post('http://localhost:3000/api/orders', data)
      if (res.status === 201) {
        dispatch(reset())
        router.push(`/orders/${res.data._id}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const ButtonWrapper = ({ currency, showSpinner }: any) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()
    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      })
    }, [currency, showSpinner])
    return (
      <>
        {showSpinner && isPending && <Loader />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions: any) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId: any) => {
                return orderId
              })
          }}
          onApprove={function (data, actions: any) {
            return actions.order
              .capture()
              .then(function (details: {
                purchase_units: { shipping: any }[]
              }) {
                const shipping = details.purchase_units[0].shipping
                createOrder({
                  customer: shipping.name.full_name,
                  address: shipping.address.address_line_1,
                  total: getTotal().totalPrice,
                  method: 1,
                })
                toast.success('Payment successfull')
              })
          }}
        />
      </>
    )
  }

  //  implement paystack
  useEffect(() => {
    setSuccess(false)
    setRef('' + Math.floor(Math.random() * 1000000000 + 1))
  }, [success])

  const config: PaystackProps = {
    reference: ref,
    email: email,
    firstname: name,
    amount: amount * 100,
    publicKey: publicKey as string,
    currency: 'NGN',
  }
  const initializePayment = usePaystackPayment(config)

  const onSuccess : any = async (reference: referenceObj) => {
    const res = await fetch(`/api/verify/${reference.reference}`)
    const verifyData = await res.json()
    if (verifyData.status === 'success') {
      setSuccess(true)
    }
  }

  const onClose: Function = () => {
    alert('Payment cancelled.')
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (cash) {
      createOrder({
        customer,
        address,
        total: getTotal().totalPrice,
        method: 0,
      })
      setIsSubmitting(false)
      toast.success('Payment successfull')
    } else {
      initializePayment(onSuccess)
    }
     onClose()
  }

  const switchMode = () => {
    setCash((prevCash) => !prevCash)
  }

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name='description' content='checkout items' />
      </Head>
      <Box maxW='container.lg' mx='auto' px={4} py='3rem'>
        <Flex
          direction='column'
          justify='center'
          w={{ base: 'full', sm: '300px', lg: '400px' }}
          m='auto'
          bg='whiteAlpha.400'
          p={5}
          rounded='lg'
          mt='6rem'
        >
          <Text fontSize='lg' mb={5}>
            {cash ? 'Pay CASH' : 'Pay using PAYSTACK'}
          </Text>
          <chakra.form id='paymentForm' onSubmit={handleSubmit} mb={4}>
            <FormControl isRequired mb={3} id={`${ID}-customer`}>
              <FormLabel htmlFor='customer'>Name</FormLabel>
              <Input
                type='text'
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mb={3} id={`${ID}-address`}>
              <FormLabel htmlFor='address'>Address</FormLabel>
              <Input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
            {!cash && (
              <>
                <FormControl isRequired mb={3} id={`${ID}-email`}>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Button
                  size='lg'
                  w='full'
                  type='submit'
                  colorScheme='cyan'
                  mt={4}
                >
                  Pay ${amount}
                </Button>
                <Text py={4} textAlign='center'>
                  OR
                </Text>
                <PayPalScriptProvider
                  options={{
                    'client-id': process.env
                      .NEXT_PUBLIC_PAYPAL_CLIENT_KEY as string,
                    components: 'buttons',
                    currency: 'USD',
                    'disable-funding': 'credit,card,p24',
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider>
              </>
            )}
            {cash && (
              <Button
                size='lg'
                w='full'
                type='submit'
                bg='red.400'
                mt={4}
                isLoading={isSubmitting}
              >
                Pay ${amount}
              </Button>
            )}
          </chakra.form>
          <Text
            fontSize='lg'
            mt={4}
            onClick={switchMode}
            cursor='pointer'
            color='red.400'
          >
            {cash ? 'Switch Payment' : 'Pay Cash'}
          </Text>
        </Flex>
      </Box>
    </>
  )
}

export default Checkout
