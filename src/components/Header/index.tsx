import Image from 'next/future/image'
import Link from 'next/link'
import { Container } from './styles'
import logoImg from '../../assets/logo.svg'
import { Cart } from '../Cart'
import { useRouter } from 'next/router'

export function Header() {
  const { pathname } = useRouter()

  const showCartButton = pathname !== '/success'

  return (
    <Container>
      <Link href="/" passHref prefetch={false}>
        <Image src={logoImg} alt="" style={{ cursor: 'pointer' }} />
      </Link>

      {showCartButton && <Cart />}
    </Container>
  )
}
