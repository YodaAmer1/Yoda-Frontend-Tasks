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
    reviews: Reviews[];
    availabilityStatus: string;
    rating:number;
    stock: number
}

export interface CartItem{
    product:ProdData,
    quantity:number
}

export interface Reviews{
    rating: number;
    comment: string;
    reviewerName : string
}