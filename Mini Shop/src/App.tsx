import { useEffect, useState } from 'react';
import './App.css'
import { ProductList } from './Components/ProductList';
import type { CartItem, ProdData } from './Types/ProdData';
import { Header } from './Components/Header';

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 400)

    return () => clearTimeout(timer)
  }, [search])
  
  let totalItmes = 0;
  for (const item of cart){
    totalItmes += item.quantity
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: ProdData) => {
    const existing = cart.find(item => item.product.id === product.id)
    if (existing){
      setCart(cart.map(item=> 
        item.product.id === product.id 
        ? {...item,quantity:item.quantity + 1}
        : item
      ))
    }else{
      setCart([...cart, { product, quantity: 1 }])
    }
  }
  return (
    <>
    <Header totalItems={totalItmes} cart={cart} setCart={setCart}
     search={search} setSearch={setSearch} setSortType={setSortType}
      sortType={sortType} category={category} setCategory={setCategory}/>
      
    <ProductList addToCart={addToCart} search={debouncedSearch} 
    sortType={sortType} setSortType={setSortType} category={category} setCategory={setCategory}/>
    </>
  )
}

export default App
