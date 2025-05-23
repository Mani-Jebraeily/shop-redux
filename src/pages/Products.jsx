import React, { use, useEffect, useState } from 'react'
import Card from '../components/Card'
import {BarLoader } from 'react-spinners'
import { searchProducts,filterProducts, createQueryObject, getInitialQuery } from '../helper/helper'
import { useSearchParams } from 'react-router-dom'
import SearchBox from '../components/SearchBox'
import SideBar from '../components/SideBar'
import { fetchProducts } from '../features/product/productsSlice.js'
import {useSelector,useDispatch} from "react-redux"
// import { useProducts } from '../context/ProductsContext'



function Products() {
  const dispatch=useDispatch()
  const {products,loading}=useSelector((store)=>store.products)
  // const products=[]
  // const products=useProducts()
  const [displayed,setDisplayed]=useState([])

  const [search,setSearch]=useState("")
  const [query,setQuery]=useState([])
  const [searchParams,setSearchParams]=useSearchParams()

// console.log(query)

useEffect(()=>{
  dispatch(fetchProducts())
},[])


  useEffect(()=>{
    setDisplayed(products)

    setQuery(getInitialQuery(searchParams))
  },[products])

  useEffect(()=>{
    setSearchParams(query)
    setSearch(query.search || "")

   let finalProducts= searchProducts(products,query.search)
   finalProducts=filterProducts(finalProducts,query.category)
   setDisplayed(finalProducts)
  //  console.log(query)
  },[query])


  return (
    <>
    <SearchBox setSearch={setSearch} search={search} setQuery={setQuery}/>
     <div className='flex flex-col-reverse  justify-center lg:flex-row'> 

        <div className='w-[100%] flex flex-wrap justify-between justify -center items-center'> 
          {loading&&(
            <div className='h-100 w-[100%] text-center  m-auto grid place-items-center '>
              <BarLoader />
             </div> 
          )}
          <div className='m-auto sm:m-0'>
          <div className='flex  flex-col sm:flex-row flex-wrap  gap-y-5 gap-x-3 justify-around '>
            {displayed.map((p)=>(<Card key={p.id} data={p}/>))}
          </div>

          </div>
         
        </div>
        <SideBar setQuery={setQuery} query={query}/>
     </div>
    
    </>

  )
}

export default Products