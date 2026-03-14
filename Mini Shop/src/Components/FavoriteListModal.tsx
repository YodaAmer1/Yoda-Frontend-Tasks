import { Box, Button, Modal, Typography } from "@mui/material";
import type { CartItem, ProdData } from "../Types/ProdData";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface FavoriteListModalProps{
    favoriteList: ProdData[];
    setCart: (item: CartItem[]) => void;
    showFavorite: boolean;
    setShowFavorite : (value: boolean) => void;
    addToFavorite : (product: ProdData) => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
  };

export const FavoriteListModal =({favoriteList,showFavorite,setShowFavorite,addToFavorite}:FavoriteListModalProps) => {
    const navigate = useNavigate();

    return(
        <Modal open={showFavorite}
         slotProps={{
            backdrop: {
            sx: { backdropFilter: "blur(6px)",backgroundColor: "rgba(0,0,0,0.3)"}}}}>
            <Box sx={style}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
            }}>
            <Typography className="header"
            sx={{justifyContent: "center",width:"105%", fontSize:22 ,gap: 1}}>
            Favorite List
            <FavoriteBorderIcon fontSize="large"/>
            </Typography>

            <Box sx={{maxHeight:400, overflowY: "auto",display: "flex",flexDirection: "column",gap: 2,padding: 1, border: "1px solid #c6c6c6"}}>
                {favoriteList.map((product)=>
            <Box key={product.id} sx={{display:"flex",gap:2 }}>
            <Box sx={{display:"flex",gap: 10, border: "1px solid cyan", borderRadius:10 , width:380, padding: 2,  position: "relative"}}>
                <Box sx={{display: "flex", flexDirection:"column", gap: 2}}>
                    <span style={{fontSize: 18, fontWeight:600, color :"crimson"}}>
                        {product.title}
                    </span>
                    <img  src={product.images[0]}  width="60"/>
                </Box>
                <Box sx={{display: "flex", flexDirection:"column", gap: 2}}>
                    <Typography sx={{fontSize: 18, fontWeight: 600}}>
                      Price
                    </Typography>

                    <Typography sx={{fontSize: 15, fontWeight: 600, color: "#656363",marginTop: 2}}>
                        ${product.price}
                    </Typography>
                </Box>
                <Button 
                variant="text" 
                size="small" 
                onClick={()=> addToFavorite(product)}
                sx={{textTransform: "none", color:"red"}}>
                  <DeleteForeverIcon />
                  Remove
                </Button>
            
                <Button
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: "none" , position: "absolute", right:18, bottom:10 ,borderRadius:10}}
                    onClick={() => navigate(`/products/${product.id}`)}
                >
                    View
                </Button>

            </Box>      
            </Box>
            )}
            </Box>
            <Button variant="contained" sx={{mt: 2}} onClick={() => setShowFavorite(false)}>
                Close
            </Button> 
            </Box>
            </Box>
        </Modal>
    )
}