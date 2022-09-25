import React from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Navbar from './nav/navbar'
import Footer from './footer'

type Props = {
  title: string
  description: string
  children?: React.ReactNode
}
export default function Layout({ title, description, children }: Props) {
  return (
    <>
      <Head>
        <title>{title ? `${title}` : 'Munch'}</title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <header>
        <Navbar />
      </header>
      <Box
        className='viewBox'
        as={motion.div}
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: '0.5' }}
      >
        <main>{children}</main>
      </Box>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}
