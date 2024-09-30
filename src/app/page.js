'use client'
import Signup from './signup/page'
import Products from './products/page'
import Order from './orders/page'
export default function Home() {
  return (
    <div className='grid  grid-flow-col w-11/12 mx-auto'>
    <Signup />
    <Products />
    <Order />
    </div>
  )
}
