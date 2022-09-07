import type { NextPage } from 'next'
import Image from 'next/future/image'
import { HomeContainer, Product } from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'

import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png'

import 'keen-slider/keen-slider.min.css'

const Home: NextPage = () => {
  const [sliderRef] = useKeenSlider({
    mode: 'free-snap',
    slides: {
      origin: 0,
      perView: 3,
      spacing: 48,
    },
    loop: true,
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 65,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta2} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 65,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 65,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

export default Home
