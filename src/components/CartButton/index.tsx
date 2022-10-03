import { CardButtonContainer } from './styles'
import { Handbag } from 'phosphor-react'
import { ComponentProps } from 'react'

type CardButtonProps = ComponentProps<typeof CardButtonContainer>

export function CardButton({ ...rest }: CardButtonProps) {
  return (
    <CardButtonContainer {...rest}>
      <Handbag weight="bold" />
    </CardButtonContainer>
  )
}
