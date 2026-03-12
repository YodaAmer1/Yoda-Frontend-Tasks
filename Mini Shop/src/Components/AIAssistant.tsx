import { Box, Button, CircularProgress, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import type { CartItem, ProdData } from "../Types/ProdData";
import { geminiResponse } from "../Services/gemini";

interface AIAssistantProps {
    cart:CartItem[];
    helpModal: boolean;
    setHelpModal : (value: boolean) => void;
    allProducts: ProdData[];
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

export const AIAssistant = ({ cart, helpModal, setHelpModal,allProducts}: AIAssistantProps) => {
    const [inputText, setInputText] = useState("");
    const [question, setQuestion] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [loading, setLoading] = useState(false); 

    const suggestedQuestions = [
        "What is the total price of my cart?",
        "Which item is the most expensive?",
        "Suggest a cheaper item",
        "What is the average price of items in my cart?",
        "Do I have too many items from the same category?",
        "Suggest a cheaper alternative for an item in my cart?"
    ]

    useEffect(()=>{
        if (!question) return
        handleSendPrompt();
    },[question])

    const handleSendPrompt= async() => {
        const response = await geminiResponse(minimizedCart,minimizedProducts,question);
        setAiResponse(response);
        setLoading(false);
    }

    const minimizedCart = cart.map(item => ({
        name: item.product.title,
        price: item.product.price,
        quantity: item.quantity
    }))

    const minimizedProducts = allProducts.map(product => ({
        name: product.title,
        price: product.price
    }))

    return(
         <Modal open={helpModal}
         slotProps={{
            backdrop: {
            sx: {
                backdropFilter: "blur(6px)",
                backgroundColor: "rgba(0,0,0,0.3)"
            }
           }
        }}>
            <Box sx={style}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
            }}>
            <Typography className="header"
            sx={{justifyContent: "center",width:"100%", fontSize:22}}>
            AI Shopping Assistant
            </Typography>

            <Box sx={{display: "flex" ,alignItems:"center"}}>
             <TextField value={inputText}
                onChange={(e)=> setInputText(e.target.value)}
                placeholder="Ask AI"  variant="outlined" size="small"
                style={{width: 300 , backgroundColor: "white", marginBottom :4}}
                multiline
                minRows={1}
                maxRows={4}
                slotProps={{
                    input: {
                    startAdornment: (
                        <InputAdornment position="start">
                        <SupportAgentIcon />
                        </InputAdornment>
                    )
                    }
                }}
                />
                <Button variant="outlined" 
                style={{marginLeft:10 , height:35}} 
                disabled={loading}
                onClick={()=>{
                    setQuestion(inputText)
                    setInputText("") 
                    setLoading(true)}}>
                    Send
                </Button>
                </Box>

                {!loading && !aiResponse && (
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Typography sx={{fontSize:16,mb:2, color:"gray", fontWeight:600}}>
                    Suggested Questions: 
                </Typography>
                {suggestedQuestions.map((q) => (
                    <Button
                    key={q}
                    size="small"
                    variant="text"
                    onClick={() => {
                        setQuestion(q)
                        setLoading(true)
                    }}
                    >
                    <span style={{fontSize:12}}>{q}</span>
                    </Button>
                ))}
                </Box>
                )}
                
                {loading && (
                <Box sx={{ display: "flex", alignItems: "center",justifyContent: "center", gap: 2 }}>
                {question ? (
                    <>
                    <CircularProgress size={20}/>
                    <Typography sx={{fontSize:14 }}>
                        Waitnig For Response...
                    </Typography>
                    </>
                ):(
                     <Typography sx={{fontSize:14 , color: "red"}}>
                        Question cannot be empty!!
                    </Typography>
                )}
                
                </Box>
                )}
                {aiResponse && !loading && (
                <Box>
                <Typography sx={{fontSize:16 , color : "green" , marginBottom : 2}}>
                   Response :
                </Typography>
                <Box sx={{width:400 ,maxHeight:200,height: 100, border: 2 , borderRadius : 5, padding:1 , overflowY: "auto", mb : 2}}>
                <Typography sx={{fontSize:14}}>
                    {aiResponse}
                </Typography>
                </Box>
                </Box>
                )}
                
             <Button variant="contained" onClick={() => setHelpModal(false)}>
                Close
            </Button>            
            </Box>
        </Box>
        </Modal>
    )
}