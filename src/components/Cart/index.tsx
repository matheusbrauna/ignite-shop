import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import Image from 'next/future/image'
import { X } from 'phosphor-react'
import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { CardButton } from '../CartButton'
import {
  CartClose,
  CartConfirmation,
  CartContent,
  CartOverlay,
  CartProduct,
  CartProductDetails,
  CartProductImage,
  ConfirmationDetails,
} from './styles'

export function Cart() {
  const { cartItems, removeItemFromCart, cartTotal } = useCart()
  const cartItemsQuantity = cartItems.length

  const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleRedirectToCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: cartItems,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Error ao redirecionar ao checkout')
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CardButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartOverlay />

        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>

          <h2>Sacola de compras</h2>

          <section>
            {cartItemsQuantity < 1 && <p>Parece que se carrinho está vazio</p>}

            {cartItems.map((cartItem) => (
              <CartProduct key={cartItem.id}>
                <CartProductImage>
                  <Image
                    src={cartItem.imageUrl}
                    alt={cartItem.name}
                    width={100}
                    height={93}
                  />
                </CartProductImage>

                <CartProductDetails>
                  <p>{cartItem.name}</p>
                  <strong>{cartItem.price}</strong>
                  <button onClick={() => removeItemFromCart(cartItem.id)}>
                    Remover
                  </button>
                </CartProductDetails>
              </CartProduct>
            ))}
          </section>

          <CartConfirmation>
            <ConfirmationDetails>
              <div>
                <span>Quantidade</span>
                <p>
                  {cartItemsQuantity}{' '}
                  {cartItemsQuantity === 1 ? 'item' : 'itens'}
                </p>
              </div>

              <div>
                <span>Valor Total</span>
                <p>{formattedCartTotal}</p>
              </div>
            </ConfirmationDetails>
            <button
              onClick={handleRedirectToCheckout}
              disabled={isCreatingCheckoutSession || cartItemsQuantity <= 0}
            >
              Finalizar compra
            </button>
          </CartConfirmation>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
