import { useEffect, useState } from 'react';
import './App.css'
import { ProductList } from './Components/ProductList';
import type { CartItem, ProdData } from './Types/ProdData';
import { Header } from './Components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CardPage } from './Components/CardPage';

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [favoriteList, setFavoriteList] = useState<ProdData[]>(()=>{
    const savedFavoriteList = localStorage.getItem("favoriteList")
    return savedFavoriteList ? JSON.parse(savedFavoriteList) : []
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

  useEffect(() => {
    localStorage.setItem("favoriteList",JSON.stringify(favoriteList))
    console.log("Favorite:",favoriteList)
  },[favoriteList])

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

  const addToFavorite = (product: ProdData) => {
    const exists = favoriteList.find(p => p.id === product.id)

    if (exists) {
      setFavoriteList(
        favoriteList.filter(p => p.id !== product.id)
      )
    } else {
      setFavoriteList([...favoriteList, product])
    }
  }

  return (
    <BrowserRouter>

    <Routes>
     <Route
        path="/"
        element={
          <>
           <Header
            totalItems={totalItmes}
            cart={cart}
            setCart={setCart}
            search={search}
            setSearch={setSearch}
            setSortType={setSortType}
            sortType={sortType}
            category={category}
            setCategory={setCategory}
            favoriteList={favoriteList}
            addToFavorite={addToFavorite}
          />
          
          <ProductList 
          addToCart={addToCart}
          search={debouncedSearch} 
          sortType={sortType}
           setSortType={setSortType} 
           category={category} 
           setCategory={setCategory}
           favoriteList={favoriteList}
           addToFavorite={addToFavorite}
           />
          </>
        }/>
    
    <Route
      path="/products/:id"
      element={<CardPage addToCart={addToCart} addToFavorite={addToFavorite} favoriteList={favoriteList}/>}
      />
    </Routes>
    </BrowserRouter>
  )
}

export default App
