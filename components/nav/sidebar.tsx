import {
  Box,
  Flex,
  Heading,
  useMediaQuery,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { BsPerson } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'

import { logoutSuccess } from '../../redux/userSlice'

export default function Sidebar({ showSide, setShowSide }: any) {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.auth.user)

  const logoutHandler = () => {
    dispatch(logoutSuccess())
  }

  const items = [
    { label: 'Pizza', href: 'pizza' },
    { label: 'Menu', href: '#' },
  ]

  return (
    <>
      {isMobile && (
        <Box
          w={{ base: 'full', md: '320px' }}
          pos='fixed'
          top='0%'
          left={0}
          px={4}
          h='full'
          bg='#000'
          as={motion.div}
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: '0.1' }}
          zIndex={3}
        >
          <Flex h='full' alignItems='center' direction='column' mt='4rem'>
            {user.username && (
              <Accordion allowToggle borderColor='transparent' w='full'>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Heading as='h2' size='md' flex='1' textAlign='left'>
                        Hello,&nbsp;{user.username}
                      </Heading>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <NextLink href='/admin' passHref>
                      <Link>Admin</Link>
                    </NextLink>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}
            <Accordion allowToggle borderColor='transparent' w='full'>
              {items.map((item, index) => (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <Heading as='h2' size='md' flex='1' textAlign='left'>
                        {item.label}
                      </Heading>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <NextLink href={`/${item.href}`} passHref>
                      <Link onClick={() => setShowSide(!showSide)}>
                        {item.label}
                      </Link>
                    </NextLink>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            {!user.username ? (
              <NextLink href='/login' passHref>
                <Button
                  leftIcon={<BsPerson />}
                  as={Link}
                  w='full'
                  mt='2rem'
                  bg='whiteAlpha.900'
                  color='blackAlpha.900'
                  onClick={() => setShowSide(!showSide)}
                >
                  Log in
                </Button>
              </NextLink>
            ) : (
              <Button
                leftIcon={<BsPerson />}
                as={Link}
                w='full'
                mt='2rem'
                bg='whiteAlpha.900'
                color='blackAlpha.900'
                onClick={logoutHandler}
              >
                Log out
              </Button>
            )}
          </Flex>
        </Box>
      )}
    </>
  )
}
