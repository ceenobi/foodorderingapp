import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

interface IProps {
  text : string
}

export default function NoResult({text}: IProps) {
  return (
    <Box py='5rem'>
      <Flex justify='center' align='center'>
        <Text fontSize='lg' fontWeight='bold'>
          {text}
        </Text>
      </Flex>
    </Box>
  )
}
