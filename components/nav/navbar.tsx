import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Heading,
  useMediaQuery,
  HStack,
  IconButton,
  Link,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { RiMenu2Fill, RiCloseLine } from 'react-icons/ri'
import { BsMinecartLoaded } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import Sidebar from './sidebar'
import Cart from '../cart'
import useTotal from '../../hooks/useTotal'
import { logoutSuccess } from '../../redux/userSlice'

const items = [
  { label: 'Pizza', href: 'pizza' },
  { label: 'Menu', href: '#' },
]

export default function Navbar() {
  const [showSide, setShowSide] = useState<boolean>(false)
  const [showCart, setShowCart] = useState<boolean>(false)
  const [navbar, setNavbar] = useState<boolean>(false)
  const [isLarge] = useMediaQuery('(max-width: 960px)')
  const router = useRouter()
  const dispatch = useDispatch()
  const [getTotal] = useTotal()
  const user = useSelector((state: any) => state.auth.user)

  const changeNavHeight = () => {
    if (window.scrollY >= 80) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    changeNavHeight()
    window.addEventListener('scroll', changeNavHeight)
    return () => {
      window.removeEventListener('scroll', changeNavHeight)
    }
  })

  const logoutHandler = () => {
    dispatch(logoutSuccess())
  }
  return (
    <Box
      zIndex={10}
      position='fixed'
      top={0}
      w='full'
      h={{ base: '16', lg: '7rem' }}
      className={navbar ? 'navbar-active' : 'navbar'}
    >
      <Flex
        maxW='container.xl'
        align='center'
        justify={{ base: 'space-between', lg: 'end' }}
        px={2}
        py={2}
      >
        {isLarge && (
          <Box onClick={() => setShowSide(!showSide)} zIndex={5}>
            {showSide ? (
              <IconButton
                variant='unstyled'
                aria-label='close menu'
                icon={<RiCloseLine />}
                fontSize='3xl'
              />
            ) : (
              <IconButton
                variant='unstyled'
                aria-label='open menu'
                icon={<RiMenu2Fill />}
                fontSize='3xl'
              />
            )}
          </Box>
        )}
        {isLarge && (
          <NextLink href='/' passHref>
            <Heading as={Link} size='lg'>
              {`MUNCH 'N' EAT`}
            </Heading>
          </NextLink>
        )}
        <HStack
          spacing={6}
          borderBottom={{ base: '0px', lg: '1px' }}
          ml={{ base: '0', lg: 'auto' }}
          mt={{ base: 'none', lg: '2rem' }}
          zIndex={3}
          mb={2}
        >
          {!isLarge && (
            <>
              <NextLink href='/' passHref>
                <Heading as={Link} size='lg'>
                  {`MUNCH 'N' EAT`}
                </Heading>
              </NextLink>
              {items.map((item, index) => (
                <NextLink key={index} href={`/${item.href}`} passHref>
                  <Link
                    className={
                      router.pathname === `/${item.href}` ? 'active' : ''
                    }
                  >
                    {item.label}
                  </Link>
                </NextLink>
              ))}
              {user.username ? (
                <>
                  <Menu>
                    <MenuButton transition='all 0.3s'>
                      <HStack spacing='1'>
                        <VStack alignItems='flex-start' spacing='1px' ml='2'>
                          <Text>Hello,&nbsp;{user.username}</Text>
                        </VStack>
                        <Box>
                          <FiChevronDown />
                        </Box>
                      </HStack>
                    </MenuButton>
                    <MenuList bg='charcoal.400' minWidth='130px'>
                      {router.pathname !== '/admin' && (
                        <MenuItem
                          onClick={() => router.push('/admin')}
                          _focus={{ bg: 'teal.400' }}
                        >
                          Admin
                        </MenuItem>
                      )}
                      <MenuItem
                        onClick={logoutHandler}
                        _focus={{ bg: 'teal.400' }}
                      >
                        Log out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <NextLink href='/login' passHref>
                  <Link
                    className={router.pathname === '/login' ? 'active' : ''}
                  >
                    Log in
                  </Link>
                </NextLink>
              )}
            </>
          )}
          <Box pos='relative' onClick={() => setShowCart(!showCart)}>
            <IconButton
              variant='unstyled'
              aria-label='cart'
              icon={<BsMinecartLoaded />}
              fontSize='2xl'
            />
            <Badge
              colorScheme='whatsapp'
              pos='absolute'
              right='2px'
              borderRadius='xl'
              variant='solid'
            >
              {getTotal().totalQuantity || 0}
            </Badge>
          </Box>
        </HStack>
        {showSide && <Sidebar showSide={showSide} setShowSide={setShowSide} />}
        {showCart && <Cart showCart={showCart} setShowCart={setShowCart} />}
      </Flex>
    </Box>
  )
}
