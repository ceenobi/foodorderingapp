import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { persistor, store } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'
import { usePageLoading } from '../hooks/usePageLoading'

import '../styles/globals.css'
import { Layout } from '../components'
import theme from '../styles/customTheme'
import Loader from '../hooks/loader'

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState<boolean>(true)
  const { isPageLoading } = usePageLoading()

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null

  return (
    <>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <Layout title={''} description={''}>
              <Toaster />
              {isPageLoading ? <Loader /> : <Component {...pageProps} />}
            </Layout>
          </PersistGate>
        </ChakraProvider>
      </Provider>
    </>
  )
}

export default MyApp
