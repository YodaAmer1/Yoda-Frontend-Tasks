import { Modal, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface CustomAlertProps {
    message: string;
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    backgroundColor: "#eaf9ea",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
  };

export const CustomAlert =({message, showAlert, setShowAlert}:CustomAlertProps) => {
    
     useEffect(() => {
        if (showAlert) {
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
        }
    }, [open])

    return(
        <Modal open={showAlert}>
        <Box sx={style}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
            }}>

            <CheckCircleIcon sx={{color: "green",fontSize: 45}}/>

            <Typography sx={{ fontWeight: 600 ,fontSize:20}}>{message}</Typography>
            </Box>
        </Box>
        </Modal>
    )
}