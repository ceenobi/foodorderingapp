import React, { useState, useEffect } from 'react'
import { Box, Text, VStack, Heading, Link, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import Image from 'next/image'

export default function SlideBox({ category }: any) {
  const [animateCard, setAnimateCard] = useState<any>({ y: 0, opacity: 1 })

  useEffect(() => {
    setAnimateCard([{ y: 100, opacity: 0 }])
    setTimeout(() => {
      return setAnimateCard([{ y: 0, opacity: 1 }])
    }, 500)
  }, [])
  return (
    <Box ml='20px' flex='0 0 auto' pos='relative' rounded='lg'>
      <NextLink href='/' passHref>
        <Box
          width={{ base: '270px', md: '400px' }}
          height={{ base: '400px', lg: '600px' }}
        >
          <Image
            src={category.img}
            alt={category.caption}
            layout='fill'
            blurDataURL='URL'
            placeholder='blur'
            style={{ borderRadius: '10px' }}
            title={category.caption}
          />
        </Box>
      </NextLink>
      <Box
        pos='absolute'
        height={{ base: '400px', lg: '600px' }}
        w='full'
        bottom='0%'
        bgGradient={category.color}
        opacity='1'
        zIndex={1}
      />

      <VStack
        spacing={3}
        align='start'
        p={4}
        zIndex={3}
        pos='absolute'
        w='full'
        bottom='10%'
      >
        <Heading as='h2' size='lg'>
          {category.caption}
        </Heading>
        <Text>{category.desc}</Text>
        <NextLink href='/#' passHref>
          <Button as={Link} colorScheme='whatsapp'>
            View
          </Button>
        </NextLink>
      </VStack>
    </Box>
  )
}
