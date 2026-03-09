import { Box, Button, Modal, Typography } from "@mui/material"
import type { ProdData } from "../Types/ProdData"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";

interface CardModalProps {
    product : ProdData
    setShowModal:(value: boolean) => void
    addToCart:(product: ProdData) => void
    setShowAlert: (value: boolean) => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const CardModal = ({product , setShowModal,addToCart,setShowAlert}:CardModalProps) => {

    const ratingColor = product.rating >= 4.5
        ? "green"
        : product.rating >= 3.5
        ? "#6b9f30"
        : product.rating >= 2.5
        ? "orange"
        :"red";

    return(
        <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            <div className="product-title">{product.title}</div>
          </Typography>

          <Typography id="modal-modal-description" sx={{ marginTop: 4 }}>
            <img src={product.images[0]} className="product-image"/>
          </Typography>

          <Typography id="modal-modal-description" sx={{fontSize:15 ,color: "#555", marginTop: 4  }}>
            {product.description}
          </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography id="modal-modal-description" sx={{color:product.availabilityStatus==="In Stock"? "green": "red", marginTop: 4 }}>
            {product.availabilityStatus}
          </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, mt: 4 }}>
          <Typography id="modal-modal-description" 
          sx={{ fontWeight:600 , color: ratingColor, marginTop:0.5}}>
            {product.rating.toFixed(1)}
          </Typography>

          <StarIcon sx={{ color: "#f5bd14", fontSize: 22, verticalAlign: "middle"}} />
          </Box>
        </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4 }}>
          <Typography id="modal-modal-description">
            <div style={{fontSize:20 , fontWeight: 600}}>
                Price : 
                <span style={{ marginLeft:10 , color: "green"}}>
                    ${product.price}
                </span>
            </div>
          </Typography>

          <Button
            variant="outlined"
            onClick={() => {
            addToCart(product)
            setShowAlert(true)
            setShowModal(false)
            }}
            endIcon={<ShoppingCartIcon />}
        >
           <span style={{fontSize:20, marginRight:-3}}>+</span>
          </Button>
          </Box>
          
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button variant="contained" onClick={() => setShowModal(false)}>
                Close
            </Button>
          </Box>
        </Box>
      </Modal>
    )
}