import type { Products } from "../Types/ProdData"; 

export const fetchProducts= async(limit:number, skip:number) : Promise<Products> =>{
        try{
            const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            const data = await res.json();
            console.log(data);
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }


export const getProductsByCategory= async(category:string) : Promise<Products> =>{
        try{
            const res = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await res.json();
            console.log(data);
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }

export const getSortedProducts= async(sortBy:string ) : Promise<Products> =>{
        try{
            const res = await fetch(`https://dummyjson.com/products?${sortBy}`);
            const data = await res.json();
            console.log(data);
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }

export const getCategoryList= async() : Promise<string[]> =>{
        try{
            const res = await fetch(`https://dummyjson.com/products/category-list`);
            const data = await res.json();
            console.log(data);
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }

export const getProductsBySearch= async(search:string) : Promise<Products> =>{
        try{
            const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
            const data = await res.json();
            console.log(data);
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }



