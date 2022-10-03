import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/future/image'
import { HomeContainer, Product } from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'
import { CardButton } from '../components/CartButton'
import { IProduct, useCart } from '../contexts/CartContext'
import { MouseEvent } from 'react'

interface HomeProps {
  products: IProduct[]
}

const Home: NextPage<HomeProps> = ({ products }) => {
  const { addItemToCart, checkIfItemAlreadyExists } = useCart()

  const [sliderRef] = useKeenSlider({
    mode: 'free-snap',
    slides: {
      origin: 0,
      perView: 3,
      spacing: 48,
    },
  })

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) {
    e.preventDefault()
    addItemToCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            passHref
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <CardButton
                  size="lg"
                  variant="green"
                  disabled={checkIfItemAlreadyExists(product.id)}
                  onClick={(e) => handleAddToCart(e, product)}
                />
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}

export default Home
