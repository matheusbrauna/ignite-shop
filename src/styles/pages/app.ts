import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '2rem 0',
  gap: '2rem',
})

export const Header = styled('header', {
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})
