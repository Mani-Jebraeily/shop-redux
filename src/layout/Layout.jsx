import React from 'react'
import { Link } from 'react-router-dom'
import { PiShoppingCartSimple } from 'react-icons/pi'
import { useSelector } from 'react-redux'

function Layout({children}) {
  const state=useSelector((store)=>store.cart)
  return (
    <>
    <header className='flex items-center justify-between bg-[#fe5d42] text-[#fff] p-[10px_20px] m-[0_10px_60px] rounded-[10px]'>
      <Link className='text-[1.5rem] font-semibold' to="/products">Shop</Link>
      <Link className='text-[1.5rem] font-semibold' to="/checkout">
      <div className='text-[1.6rem] bg-[#fff] items-center text-[#fe5d42] size-9 rounded-[10px] p-0.5 relative '>
        <PiShoppingCartSimple className='m-auto' />
        {!!state.itemsCounter&&<p className='text-[0.9rem] size-5 leading-5 bg-[#000] text-center  text-[#fff] rounded-[50%] absolute top-[-10px] right-[-10px]'> {state.itemsCounter}</p>}

      </div>
  
      </Link>
    </header>
     {children}
    <footer className='text-center bg-[#fe5d42] p-5 m-2.5 mt-20 rounded-[10px] text-[#fff]'>
      <p>Developed by <Link to="https://github.com/Mani-Jebraeily"><span className='text-[#5e5d63] text-[21px]'> Mani Jebraeily </span> </Link></p>
        
    </footer>
    </>
  )
}

export default Layout