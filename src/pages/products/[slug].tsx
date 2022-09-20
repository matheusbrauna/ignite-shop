import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/future/image'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import axios from 'axios'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import { useState } from 'react'
import Head from 'next/head'

type Product = {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
}

interface HomeProps {
  product: Product
}

const Product: NextPage<HomeProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsLoading(true)

      const res = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = res.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsLoading(false)

      alert('Falha ao redirecionar para o checkout')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={520}
            height={480}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button disabled={isLoading} onClick={handleBuyProduct}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { slug: 'prod_MOulmCj70FooaW' } }],
    fallback: true,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { slug: string }> = async ({
  params,
}) => {
  const productSlug = params.slug

  const product = await stripe.products.retrieve(productSlug, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}

export default Product
