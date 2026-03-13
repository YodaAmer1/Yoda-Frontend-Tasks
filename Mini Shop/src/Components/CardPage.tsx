import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import type { ProdData } from "../Types/ProdData"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { fetchSingleProduct, getProductsByCategory } from "../apis/api";
import { CustomAlert } from "./CustomAlert";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProductCard } from "./ProductCard";
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ProductsReviews } from "./ProductReviews";

interface CardPageProps {
    addToCart:(product: ProdData) => void
}

export const CardPage = ({addToCart}:CardPageProps) => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProdData | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [categoryProducts, setCategoryProducts] = useState<ProdData[]>([]);
    const navigate = useNavigate();
    const [startIndex, setStartIndex] = useState(0);
    const [showReviews, setShowReviews] = useState(false);

    const recommendedProducts = categoryProducts.filter((prod) => prod.id !== product?.id)

    useEffect(() => {
      getSingleProduct();
      setShowReviews(false);
      setStartIndex(0);
    }, [id])

    useEffect(()=>{
      getCategoryProducts();
    },[product])

    const getSingleProduct = async() => {
      if (!id) return;
      const data = await fetchSingleProduct(id);
      setProduct(data);
    }

    const getCategoryProducts = async() => {
      if (!product) return;
      const data = await getProductsByCategory(product.category);
      setCategoryProducts(data.products);
    }

    const rightArrow =() => {
      if(startIndex +4 < recommendedProducts.length)
        setStartIndex(startIndex +1)
    }

    const leftArrow =() => {
      if(startIndex> 0)
        setStartIndex(startIndex -1)
    }

    if (!product) return <div>Loading...</div>

    const ratingColor = product.rating >= 4.5
        ? "green"
        : product.rating >= 3.5
        ? "#6b9f30"
        : product.rating >= 2.5
        ? "orange"
        :"red";

    return(
        <>
        <Box className="header" sx={{position: "relative",display:"flex",justifyContent: "center", marginBottom: 4}}>
        <Button
          variant="outlined"
          sx={{position: "absolute",left: 10,bgcolor: "white"}}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
           Back
        </Button>
        <h2  style={{fontWeight:600}}>Product Page</h2>
        <Button
          variant="outlined"
          sx={{position: "absolute",right: 10,bgcolor: "white"}}
          onClick={() => navigate("/")}
        >
          <HomeIcon />
           Home
        </Button>
        </Box>

        <Box sx={{display:"flex", maxWidth: 900,flexDirection: "column", margin: "auto", padding:1, alignItems: "center", border: "1px solid cyan",borderRadius: 3,backgroundColor: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)"}}>
          <Typography id="modal-modal-title" variant="h6" sx={{ fontSize:30,fontWeight: 600,color:"crimson" ,textAlign:"center"}}>
            {product.title}
          </Typography>
          
          <Typography id="modal-modal-description" >
            <img src={product.images[0]} style={{width: "400px", borderRadius: "12px"}}/>
          </Typography>

          <Box sx={{display:"flex" , gap:3 ,flexDirection:"column", flex: 1}}>

          <Box sx={{border: "1px solid #e9e0e0" , borderRadius:2, padding: 3, backgroundColor:"#fdfbfb"}}>
            <Typography sx={{fontWeight: 700,fontSize: 18,marginBottom: 1}}>
              Product Description
            </Typography>
            <Typography id="modal-modal-description" sx={{fontSize:15 ,color: "#555",lineHeight: 1.8  }}>
              {product.description}
            </Typography>
          </Box>

        <Typography id="modal-modal-description" sx={{color:product.availabilityStatus==="In Stock"? "green": "red"}}>
            {product.availabilityStatus} : 
            <span style={{color:"black" , marginLeft:10}}>{product.stock} Left</span>
          </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3}}>
          <span style={{fontSize:18 , fontWeight:600}}>Rating :</span>
          <Typography id="modal-modal-description" 
            sx={{ fontWeight:600 , color: ratingColor, marginTop:0.5}}>
            <span style={{marginLeft:20}}>{product.rating.toFixed(1)}</span>
          </Typography>

          <StarIcon sx={{ color: "#f5bd14", fontSize: 22, verticalAlign: "middle"}} />
          </Box>
          <Box>
            <Button variant="text" size="small" 
            sx={{borderRadius: 6, fontWeight:600,padding:2, textTransform :"none"}}
            onClick={()=>setShowReviews(!showReviews)}>
              {showReviews ? "Hide Reviews" : `View Reviews (${product.reviews.length})`}
            </Button>
             {showReviews && (
              <ProductsReviews  reviews={product.reviews}/>
             )}
          </Box>
          <Box sx={{
            display: "flex",justifyContent: "space-between",
            alignItems: "center",padding: 2, border: "1px solid #eee",
            borderRadius: "10px"
            }}>
            <Typography id="modal-modal-description" sx={{fontSize:22 , fontWeight: 700}}>
                  Price : 
                  <span style={{ marginLeft:10 , color: "green"}}>
                      ${product.price}
                  </span>
            </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{width: 220,fontWeight: 600}}
            onClick={() => {
              addToCart(product)
              setShowAlert(true)
            }}
          >
          Add To Cart
          <ShoppingCartIcon sx={{marginLeft:2}}/>
          </Button>
            </Box>
          </Box>
          {showAlert && (
            <CustomAlert
              message="Item Added To Cart"
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          )}
        </Box>
          <Box sx={{justifyItems: "center", mt:4}}>
            <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
              Recommended For You
            </Typography>
          </Box>
        <Box sx={{display: "flex", width: 1100 ,margin:"auto" ,mt: 4, gap: 2 , justifyContent:"center"}}>
          {recommendedProducts.length > 4 && (
            <Button variant="text" onClick={leftArrow}>
            <ArrowBackIosIcon fontSize="medium"/>
          </Button>
          )}
          
          {recommendedProducts.slice(startIndex, startIndex + 4)
          .map((prod)=>
            <Box key={prod.id} sx={{ minWidth: 250 }}>
            <ProductCard product={prod} addToCart={addToCart}/>
            </Box>
          )}

          {recommendedProducts.length > 4 && (
            <Button variant="text" onClick={rightArrow}>
            <ArrowForwardIosIcon fontSize="medium"/>
          </Button>
          )}
        </Box>
        </>
    )
}