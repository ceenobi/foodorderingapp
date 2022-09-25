import React, { useState, useId, useEffect } from 'react'
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Button,
  chakra,
  Text,
  Heading,
  Divider,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useForm, FormProvider } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import { loginSuccess, registerSuccess, loginFailure } from '../redux/userSlice'
import registerOptions from '../utils/inputValidation'

type Data = {
  username: string
  email: string
  password: string
}

const Login = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false)
  const [isSubmitting, setIsSubmiting] = useState<boolean>(false)
  const dispatch = useDispatch()
  const ID = useId()
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.user)
  const methods = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods
  const handleError = (errors: any) => {}
  const switchMode = () => {
    setIsSignup((previsSignup) => !previsSignup)
  }

  useEffect(() => {
    if (user.token) {
      router.push('/')
    }
  }, [router, user.token])

  const onSubmit = async ({ username, email, password }: Data) => {
    setIsSubmiting(true)
    try {
      if (isSignup) {
        const { data } = await axios.post(
          'http://localhost:3000/api/users/register',
          { username, email, password }
        )
        dispatch(registerSuccess(data))
      } else {
        const { data } = await axios.post(
          'http://localhost:3000/api/users/login',
          { username, password }
        )
        dispatch(loginSuccess(data))
      }
    } catch (err) {
      dispatch(loginFailure(toast.error('Wrong credentials')))
    }
    setIsSubmiting(false)
  }

  return (
    <>
      <Head>
        <title>User login</title>
        <meta name='description' content='user auth page' />
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
            {isSignup ? "I'm a new customer" : 'Already a customer'}
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
        <FormProvider {...methods}>{/* errors */}</FormProvider>
        <chakra.form
          id='userForm'
          mb={4}
          w={{ base: 'full', sm: '300px', lg: '400px' }}
          mx='auto'
          onSubmit={handleSubmit(onSubmit, handleError)}
          mt='2rem'
        >
          <VStack spacing={4} mb='2rem'>
            <FormControl id={`${ID}-username`}>
              <FormLabel>Your Username</FormLabel>
              <Input
                type='text'
                variant='flushed'
                placeholder='username'
                {...register('username', registerOptions.username)}
              />
              {errors?.username && (
                <Box as='span' color='red.400'>
                  {errors.username.message}
                </Box>
              )}
            </FormControl>
            {isSignup && (
              <FormControl id={`${ID}-email`}>
                <FormLabel>Your Email</FormLabel>
                <Input
                  placeholder='email@example.com'
                  type='email'
                  variant='flushed'
                  {...register('email', registerOptions.email)}
                />
                {errors?.email && (
                  <Box as='span' color='red.400'>
                    {errors.email.message}
                  </Box>
                )}
              </FormControl>
            )}
            <FormControl id={`${ID}-password`}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                placeholder='password'
                variant='flushed'
                {...register('password', registerOptions.password)}
              />
              {errors?.password && (
                <Box as='span' color='red.400'>
                  {errors.password.message}
                </Box>
              )}
            </FormControl>
          </VStack>
          <Button
            type='submit'
            bg='paint.blue'
            size='lg'
            w='full'
            isLoading={isSubmitting}
            _hover={{ bg: 'blue.800' }}
          >
            {isSignup ? 'Sign up' : 'Log In'}
          </Button>
        </chakra.form>
      </Box>
      <Divider />
      <Box maxW='container.lg' mx='auto' px={4} py='2rem' textAlign='center'>
        <Heading as='h2' size='md'>
          {"I'm a new customer"}
        </Heading>
        <Text
          fontSize='lg'
          textDecoration='underline'
          mt='2rem'
          my='1rem'
          onClick={switchMode}
          cursor='pointer'
        >
          Create account
        </Text>
      </Box>
    </>
  )
}

export default Login
