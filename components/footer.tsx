import React from 'react'
import {
  Box,
  Flex,
  Text,
  Stack,
} from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box px={4} mt='3rem' bg='blackAlpha.800'>
      <Flex
        justify='space-between'
        direction='row'
        textAlign='left'
        flexWrap='wrap'
        color='#fff'
        py='3rem'
        maxW='container.lg'
        mx='auto'
        align='center'
      >
        <Box mb={4}>
          <Stack
            direction='row'
            spacing={3}
            fontSize='xs'
            flexWrap='wrap'
            align='center'
          >
            <Text>ABOUT</Text>
            <Text>MUNCH</Text>
            <Text>BLOG</Text>
          </Stack>
          <Text mt={2} fontSize='xs'>
            © 2022 Ceenobi, inc. All rights reserved. Not certified.
          </Text>
        </Box>
        <Stack
          direction='row'
          spacing={3}
          fontSize='xs'
          flexWrap='wrap'
          align='center'
        >
          <Text>PIZZA</Text>
          <Text>LOCATION</Text>
          <Text>DEAL</Text>
        </Stack>
      </Flex>
    </Box>
  )
}
