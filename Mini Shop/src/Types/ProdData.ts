export interface Products{
    limit: number;
    products: ProdData[];
    skip: number;
    total:number;
}

export interface ProdData{
    id: number;
    title: string;
    description: string;
    category: string;
    price: number
    images:string[];
    availabilityStatus: string;
    rating:number
}

export interface CartItem{
    product:ProdData,
    quantity:number
}