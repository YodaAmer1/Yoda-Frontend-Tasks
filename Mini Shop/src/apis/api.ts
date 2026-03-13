import type { ProdData, Products } from "../Types/ProdData"; 

const API_URL = "https://dummyjson.com/products";

export const fetchProducts= async(limit:number, skip:number) : Promise<Products> =>{
        try{
            const res = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
            const data = await res.json();
            console.log(data)
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }

export const fetchSingleProduct= async(id: string) : Promise<ProdData> =>{
        try{
            const res = await fetch(`${API_URL}/${id}`);
            const data = await res.json();
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }


export const getProductsByCategory= async(category:string) : Promise<Products> =>{
        try{
            const res = await fetch(`${API_URL}/category/${category}?limit=100`);
            const data = await res.json();
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }

export const getSortedProducts= async(sortBy:string ) : Promise<Products> =>{
        try{
            const res = await fetch(`${API_URL}?${sortBy}`);
            const data = await res.json();
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }

export const getCategoryList= async() : Promise<string[]> =>{
        try{
            const res = await fetch(`${API_URL}/category-list`);
            const data = await res.json();
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }

export const getProductsBySearch= async(search:string) : Promise<Products> =>{
        try{
            const res = await fetch(`${API_URL}/search?q=${search}&limit=194`);
            const data = await res.json();
            return data
        }catch(error){
            console.error("My Error: ", error);
            throw error;
        }
    }



