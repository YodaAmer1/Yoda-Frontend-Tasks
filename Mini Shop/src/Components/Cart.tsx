import { Button } from "@mui/material";
import type { CartItem } from "../Types/ProdData";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface CartProps {
  cart: CartItem[]
  setCart: (item : CartItem[]) => void
}

export const Cart = ({cart, setCart}:CartProps) => {
    let total = 0
    for (const item of cart)
        total += item.product.price * item.quantity 

    if(cart?.length === 0){
        return (
        <div>
            <h2 className="header">My Cart</h2>
            Your cart is empty
        </div>
        )
    }

    const increaseQuantity = (id: number) =>{
        setCart(cart.map(item =>
            item.product.id === id
            ? {...item, quantity: item.quantity + 1}
            : item
        ))
    }

    const decreaseQuantity = (id: number) => {
        setCart(cart.map(item =>
            item.product.id === id
            ? {...item, quantity: item.quantity - 1}
            : item
        )
        .filter((item) => item.quantity > 0)
    )
    }

    const removeItem = (id: number) => {
        setCart(cart.filter(item => item.product.id !== id))
    }

    return(
        <div>
            <h2 className="header" style={{justifyContent: "center"}}>My Cart</h2>
             {cart.map((item) => (
                <div className="cart-item" key={item.product.id}>
                    
                <div className="cart-left">
                    <div className="cart-title">{item.product.title}</div>
                    <img src={item.product.images[0]} width="60" />
                </div>

                <div className="cart-quantity">
                    Quantity: 
                    <button style={{marginRight:3}} onClick={()=> decreaseQuantity(item.product.id)}>-</button>
                    {item.quantity}
                    <button style={{marginLeft:3}} onClick={()=> increaseQuantity(item.product.id)}>+</button>
                </div>

                <div className="cart-price">
                    ${item.product.price * item.quantity}
                </div>
                <Button
                variant="outlined"
                    style={{ marginLeft: 10,color:"red",border:"none" }}
                    onClick={() => removeItem(item.product.id)}
                    >
                    <DeleteForeverIcon />
                    </Button>
                </div>
            ))}
            <div style={{fontSize:20, fontWeight:600}}>
                Total Price :
                <span style={{ marginLeft:10 ,fontSize:18, color: "green"}}>${total.toFixed(2)}</span>
                </div>
        </div>
    )
}