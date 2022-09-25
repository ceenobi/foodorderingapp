import React from 'react'
import { Box, Flex, Container, Heading, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function Custom404() {
  return (
    <Box py='6rem'>
      <Container maxW='container.lg'>
        <Flex justify='center' align='center' direction='column' mt='6rem'>
          <Heading as='h2' size='md' mb='2rem'>
            oops! - Page Not Found
          </Heading>
          <Link href='/'>
            <Button variant='outline' colorScheme='whatsapp'>GO HOME</Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
