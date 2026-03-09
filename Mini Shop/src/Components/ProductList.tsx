import { useEffect, useState } from "react"
import type { ProdData, Products } from "../Types/ProdData"
import { fetchProducts, getProductsByCategory, getProductsBySearch, getSortedProducts } from "../apis/api";
import { ProductCard } from "./ProductCard";
import { Button } from "@mui/material";

interface ProductListProps{
    addToCart: (product: ProdData) => void
    search: string
    sortType : string
    setSortType:(value:string) => void
    category : string
    setCategory :(value : string) => void
}

export const ProductList = ({addToCart,search,sortType, setSortType,category,setCategory}:ProductListProps) => {
    const [products, setProducts] = useState<Products>();
    const limit = 15;
    const [skip, setSkip] = useState<number>(0);
    const [loadingMore,setLoadingMore] = useState(false);
    const [searchResults, setSearchResults] = useState<ProdData[]>()
    const [sortedResults, setSortedResults] = useState<ProdData[]>()
    const [categoryResults, setCategoryResults] = useState<ProdData[]>()

    useEffect(()=>{
        getProducts();
    },[skip])

    useEffect(()=>{
        fetchSearch();
        setSortType("");
        setCategory("");
    },[search])

    useEffect(()=>{
        if (!sortType) return
        fetchSortedProducts();
    },[sortType])

    useEffect(()=>{
        if (!category) return
        fetchProductsByCategory();
    },[category])

    const fetchProductsByCategory = async() => {
        const data = await getProductsByCategory(category);
        setCategoryResults(data.products);
    }

    const fetchSortedProducts = async () => {
        const data = await getSortedProducts(sortType);
        setSortedResults(data.products)

    }

    const fetchSearch = async () => {
        const data = await getProductsBySearch(search)
        setSearchResults(data.products)
    }

    const list = search ? searchResults : sortType? sortedResults: category? categoryResults: products?.products;

    const getProducts= async() =>{
        const data = await fetchProducts(limit,skip);
        (products? setProducts({...data,products: [...products.products, ...data.products]})
        : setProducts(data))
        setLoadingMore(false);
    }

    const handleLoadMore = () => {
        setSkip(skip + limit);
        setLoadingMore(true);
    }

    if (!products?.products) return (
        <div style={{ display: "flex" ,justifyContent: "center", marginTop:"30px"}}>
            Loading...</div>
    )

    return (
        <div>
            <div className="products-grid">

                    {list?.map((product)=>(
                        <div key={product.id}>
                        <ProductCard product={product} addToCart={addToCart} />
                        </div>
                ))}
              
            </div>
            {!search && !sortType && !category && (
                <div style={{ display: "flex" ,justifyContent: "center", marginTop:"30px"}}>
               {loadingMore ? (
                    <div>
                    Loading..
                    </div>
                ) :( 
                    <Button 
                    variant="outlined" 
                    onClick={handleLoadMore}>
                    Load More
                    </Button>
                 )} 
            </div>
            )}
        </div>
    )
}