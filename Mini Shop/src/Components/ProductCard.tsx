import { Button } from "@mui/material";
import type { ProdData } from "../Types/ProdData"
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CustomAlert } from "./CustomAlert";
import { useNavigate } from "react-router-dom";


interface ProductCardProps{
    product: ProdData;
    addToCart: (product: ProdData) => void
}

export const ProductCard = ({product,addToCart} : ProductCardProps) => {
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    return(
        <div>
        <div className="product-card">
            <div className="product-title">{product.title}</div>
            <img src={product.images[0]} className="product-image"/>
           <div style={{display:"flex",justifyContent:"center" ,fontSize:"18px", marginBottom:"10px"}}>
            ${product.price}
            </div>

            <div style={{justifyContent:"left", display: "flex"}}>
            <Button
                variant="text"
                size="small"
                sx={{ textTransform: "none" }}
                onClick={() => navigate(`/products/${product.id}`)}
            >
                Show more...
            </Button>
            </div>

             <Button
                variant="outlined"
                title="Add To Cart"
                onClick={() => {
                addToCart(product)
                setShowAlert(true)
                }}
                endIcon={<ShoppingCartIcon />}
            >
            <span style={{fontSize:15, marginRight:-5}}>+</span>
            </Button>

        </div>

        {showAlert && 
        <CustomAlert message={"Item Added To Cart"} 
        showAlert={showAlert} setShowAlert={setShowAlert}
        />}
        </div>
    )
}