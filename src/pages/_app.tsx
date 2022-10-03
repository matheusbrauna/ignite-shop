import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { CartProvider } from '../contexts/CartContext'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

globalStyles()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
