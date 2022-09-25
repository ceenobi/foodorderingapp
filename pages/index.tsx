import { useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Link,
  IconButton,
} from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Lazy, Autoplay, EffectFade } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/lazy'
import 'swiper/css/effect-fade'
import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import autoAnimate from '@formkit/auto-animate'

import useScroll from '../hooks/useScroll'
import { SlideBox } from '../components'
import { categories, images } from '../utils/dataTypes'

interface Category {
  img: string
  caption: string
  color: string
  desc: string
}

const Home: NextPage = () => {
  const [scroll, scrollRef]: any = useScroll()
  const parentRef = useRef(null)

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current)
    }
  }, [parentRef])

  return (
    <>
      <Head>
        <title>Munch</title>
        <meta name='description' content='Landpage view' />
      </Head>
      <Box py={5} pos='relative'>
        <Flex
          justify='space-between'
          mx='auto'
          align='center'
          direction={{ base: 'column', lg: 'row' }}
          mt={{ base: '1rem', lg: '6rem' }}
        >
          <Flex
            direction='column'
            ml={{ base: 'none', lg: '5rem' }}
            alignItems={{ base: 'center', lg: 'start' }}
            gap={4}
            h={{ base: '400px', lg: '600px' }}
            justify='center'
          >
            <Heading as='h2' size={{ base: '2xl', lg: '3xl' }}>
              Hot & Spicy Pizza
            </Heading>
            <Text fontSize='xl' lineHeight='tall'>
              A tasty meal for everybody
            </Text>
            <NextLink href='/product' passHref>
              <Button as={Link} colorScheme='whatsapp'>
                ORDER NOW
              </Button>
            </NextLink>
          </Flex>
          <Box
            w={{ base: 'full', lg: '800px' }}
            h={{ base: '300px', lg: '400px' }}
          >
            <Swiper
              style={{
                '--swiper-navigation-color': '#fff',
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              lazy={true}
              effect={'fade'}
              navigation={true}
              modules={[Navigation, Lazy, Autoplay, EffectFade]}
              className='mySwiper'
            >
              {images.map((item, index) => (
                <SwiperSlide key={index}>
                  <Box
                    pos='relative'
                    h={{ base: '400px', lg: '600px' }}
                    w='800px'
                  >
                    <Image
                      src={item.original}
                      alt='pizza'
                      layout='responsive'
                      width='100%'
                      height='100%'
                      blurDataURL='URL'
                      placeholder='blur'
                      objectFit='cover'
                    />
                    <Heading
                      as='h2'
                      size='lg'
                      pos='absolute'
                      top='60%'
                      left='0%'
                      right='0%'
                    >
                      {item.caption}
                    </Heading>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Flex>
        <Flex
          justify='center'
          direction='column'
          mx='auto'
          maxW='container.lg'
          align='center'
          mt={{ base: '3rem', lg: '6rem' }}
          ref={parentRef}
        >
          <Heading as='h2' size='xl' mb={4} textAlign='center'>
            {"Small, Medium, Large, there's a Pizza for you"}
          </Heading>
          <Text
            fontSize='lg'
            w={{ base: '90%', md: '400px' }}
            textAlign='center'
          >
            Whichever Pizza you choose, we are guranteed to deliver maximum
            satisfaction
          </Text>
        </Flex>
        <Flex
          align='center'
          pos='relative'
          py={4}
          mt={{ base: '3rem', lg: '6rem' }}
          ref={parentRef}
        >
          <Flex overflowX='auto' flexWrap='nowrap' ref={scrollRef} mb={6}>
            {categories.map((category: Category, index: number) => (
              <SlideBox key={index} category={category} />
            ))}
          </Flex>
          <Flex
            display={{ base: 'none', lg: 'block' }}
            position='absolute'
            bottom='50%'
            w='100%'
          >
            <Flex justify='space-between' px={3}>
              <IconButton
                icon={<IoIosArrowBack />}
                fontSize='2xl'
                cursor='pointer'
                aria-label='Scroll-button'
                onClick={() => scroll('left')}
                variant='unstyled'
                _hover={{ color: 'blue.200' }}
              />
              <IconButton
                icon={<IoIosArrowForward />}
                fontSize='2xl'
                cursor='pointer'
                aria-label='Scroll-button'
                onClick={() => scroll('right')}
                variant='unstyled'
                _hover={{ color: 'blue.200' }}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justify='center'
          direction='column'
          align='center'
          mt={{ base: '3rem', lg: '6rem' }}
          gap='3rem'
          textAlign='center'
          px={4}
        >
          <Box w={{ base: '80%', md: '600px' }}>
            <Heading as='h2' size='xl' mb={4}>
              Become a Munch member today!
            </Heading>
            <Text fontSize='lg'>
              {`Sign up for an account and we'll help you find the perfect
              Representative so you can start shopping and enjoy all of the
              perks like`}
            </Text>
          </Box>
          <Flex
            justify='space-between'
            gap='3rem'
            direction={{ base: 'column', md: 'row' }}
          >
            <Box w={{ base: '80%', md: '300px' }} mx='auto'>
              <Heading as='h2' size='xl'>
                1
              </Heading>
              <Text>
                Check out quicker and easier when you’re signed into your
                account.
              </Text>
            </Box>
            <Box w={{ base: '80%', md: '300px' }} mx='auto'>
              <Heading as='h2' size='xl'>
                2
              </Heading>
              <Text>
                Enjoy insider discounts up to 50% off and exclusive online
                offers!
              </Text>
            </Box>
            <Box w={{ base: '80%', md: '300px' }} mx='auto'>
              <Heading as='h2' size='xl'>
                3
              </Heading>
              <Text>
                Get personalized recommendations that will become new faves.
              </Text>
            </Box>
          </Flex>
          <NextLink href='/login' passHref>
            <Button
              variant='solid'
              colorScheme='whatsapp'
              as={Link}
              w={{ base: '200px', md: '300px' }}
            >
              SIGN UP
            </Button>
          </NextLink>
        </Flex>
      </Box>
    </>
  )
}

export default Home
