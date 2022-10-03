import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/future/image'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import Head from 'next/head'
import { IProduct, useCart } from '../../contexts/CartContext'
import { useRouter } from 'next/router'

interface HomeProps {
  product: IProduct
}

const Product: NextPage<HomeProps> = ({ product }) => {
  const { isFallback } = useRouter()

  const { addItemToCart, checkIfItemAlreadyExists } = useCart()

  if (isFallback) return <p>carregando</p>

  const itemAlreadyInCart = checkIfItemAlreadyExists(product.id)

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

          <button
            disabled={itemAlreadyInCart}
            onClick={() => addItemToCart(product)}
          >
            {itemAlreadyInCart
              ? 'Produto já está no carrinho'
              : 'Adicionar ao carrinho'}
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
        numberPrice: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}

export default Product
