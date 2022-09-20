import { AppProps } from 'next/app'
import Image from 'next/future/image'
import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app'

import logoImg from '../assets/logo.svg'
import Link from 'next/link'

globalStyles()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/" passHref prefetch={false}>
          <Image src={logoImg} alt="" style={{ cursor: 'pointer' }} />
        </Link>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
