import { styled } from '../../styles'

export const CardButtonContainer = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 0,
  borderRadius: 6,
  position: 'relative',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },

  variants: {
    variant: {
      gray: {
        background: '$gray800',
        color: '$gray500',
      },

      green: {
        background: '$green500',
        color: '$white',

        '&:not(:disabled):hover': {
          background: '$green300',
        },
      },
    },
    size: {
      md: {
        width: '3rem',
        height: '3rem',

        svg: {
          fontSize: 24,
        },
      },
      lg: {
        width: '3.5rem',
        height: '3.5rem',

        svg: {
          fontSize: 32,
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'gray',
  },
})
