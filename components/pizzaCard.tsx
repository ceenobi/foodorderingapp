import { useState} from 'react'
import type { NextPage } from 'next'
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Button,
  Link,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

import { Product } from '../types'

interface IProps {
  item: Product
}

const PizzaCard: NextPage<IProps> = ({
  item: { title, img, desc, prices, slug },
}: IProps) => {
  const [index, setIndex] = useState<number>(0)

  const imgPic = img.slice(1)

  // const hoverStyle = {
  //   _hover: {
  //     base: 'none',
  //     xl: {
  //       bg: 'whiteAlpha.400',
  //       transition: '0.5s ease-in-out',
  //       transform: 'scale(1.1, 1.1)',
  //       rounded: 'lg',
  //       h: '600px',
  //       py: '2rem',
  //     },
  //   },
  // }

  return (
    <Flex
      justify='space-around'
      mb='6rem'
      direction={{ base: 'column', md: 'row' }}
      mx='auto'
    >
      <Flex
        direction='column'
        gap={8}
        w={{ base: '100%', md: '400px' }}
        // sx={hoverStyle}
      >
        <Flex justify='center' p={2} mx='auto' align='center'>
          <Image
            src={imgPic && imgPic[index]}
            width='240px'
            height='240px'
            alt={title}
            blurDataURL='URL'
            placeholder='blur'
          />
        </Flex>
        <VStack align='center'>
          <Heading as='h2' size='lg'>
            {title}
          </Heading>
          <Text fontSize='lg'>From: ${prices[0]}</Text>
        </VStack>
        <Flex flexWrap='wrap' gap={4} justify='center' cursor='pointer'>
          {imgPic?.map((item, i) => (
            <Image
              src={item}
              key={i}
              width='80px'
              height='80px'
              alt={title}
              blurDataURL='URL'
              placeholder='blur'
              onClick={() => setIndex(i)}
            />
          ))}
        </Flex>
        <Flex gap={4} justify='center' mb={6}>
          <NextLink href={`/product/${slug}`} passHref>
            <Button as={Link} colorScheme='whatsapp'>
              See Details
            </Button>
          </NextLink>
        </Flex>
      </Flex>
      <Box
        pos='relative'
        w='350px'
        h='550px'
        display={{ base: 'none', md: 'block' }}
      >
        <Image
          src={img?.[0]}
          layout='fill'
          alt={title}
          blurDataURL='URL'
          placeholder='blur'
        />
        <Box
          pos='absolute'
          bottom='0%'
          bgGradient='linear(to-r, rgba(0, 0 ,0 ,0.7), rgba(0, 0 ,0 ,0.2))'
          h='200px'
          w='full'
          opacity='1'
        >
          <Text fontSize='lg' p={4} zIndex={3}>
            {desc}
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default PizzaCard
