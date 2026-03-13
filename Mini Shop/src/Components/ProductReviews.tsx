import type { Reviews } from "../Types/ProdData"
import StarIcon from "@mui/icons-material/Star";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ProductsReviewsProps{
    reviews: Reviews[]
}

export const ProductsReviews = ({reviews}: ProductsReviewsProps) => {

    const ratingColor =(review:Reviews) => {
        const color = review.rating >= 4.5
        ?  "green"
        : review.rating >= 3.5
        ? "#6b9f30"
        : review.rating >= 2.5
        ? "orange"
        :"red";
        return color
    } 
        
    return(
        <div style={{display: "flex" ,justifyContent:"center" ,gap:16,maxWidth:900, margin:"auto",marginTop: 5}}>
            
            {reviews.map((review) =>
            <div key={review.reviewerName} style={{
                display: "flex",flexDirection:"column",
                gap: 10,padding:14, border : `2px solid ${ratingColor(review)}`,
                borderRadius: 12,backgroundColor: "#fff",width: 250
                 }}>
                    
                <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",fontWeight: 600}}>
                   <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <AccountCircleIcon fontSize="small" sx={{ color: "#cfcfcf" }}/>
                        <span style={{ fontWeight: 600 }}>
                            {review.reviewerName}
                        </span>
                        </div>
                    <div style={{display: "flex", gap: 2, alignItems: "center"}}>
                    <div style={{ fontWeight:600 , color: ratingColor(review), marginTop:0.5}}>
                        <span style={{marginLeft:20}}>{review.rating}</span>
                    </div>
                    <StarIcon sx={{ color: "#f5bd14", fontSize: 22, verticalAlign: "middle"}} />
                    </div>
                </div>
                <div style={{ color: "#555" }}>
                    {review.comment}
                </div>
            </div>
            )}
        </div>
    )
}