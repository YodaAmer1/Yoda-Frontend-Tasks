import { Button } from "@mui/material";
import type { ProdData } from "../Types/ProdData"
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CustomAlert } from "./CustomAlert";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite"



interface ProductCardProps{
    product: ProdData;
    addToCart: (product: ProdData) => void
    addToFavorite :(product: ProdData) => void
    favoriteList: ProdData[]
}

export const ProductCard = ({product,addToCart,addToFavorite,favoriteList} : ProductCardProps) => {
    const [showAlert, setShowAlert] = useState(false);
    const liked = favoriteList.some(p => p.id === product.id)

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
            <div style={{display: "flex", justifyContent: "center", position:"relative"}}>
                <div style={{position: "absolute", left: 0, marginTop: 6}}>
                    <Button 
                    variant="text"
                    onClick={() => {addToFavorite(product)}}>
                    {liked ? 
                    <FavoriteIcon fontSize="medium" sx={{color:"crimson"}}/>
                     : 
                    < FavoriteBorderIcon fontSize="medium" sx={{color:"black"}}/>
                    }
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
        </div>

        {showAlert && 
        <CustomAlert message={"Item Added To Cart"} 
        showAlert={showAlert} setShowAlert={setShowAlert}
        />}
        </div>
    )
}