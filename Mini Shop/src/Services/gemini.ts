import { GoogleGenerativeAI } from "@google/generative-ai";

type CartForAI = {
  name: string
  price: number
  quantity: number
}

type ProductForAI = {
  name: string
  price: number
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const geminiResponse = async(cart : CartForAI[],products: ProductForAI[], question : string) => {
    try{
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const prompt = `
            You are a shopping assistant.

            Use the provided cart items and product catalog to answer the user's question.

            * You can answer:
            - total cart price
            - most expensive item
            - cheapest item
            - suggest cheaper alternatives
            - detect too many items from the same category     
            
            Cart items:
            ${JSON.stringify(cart)}
            
            Available products:
            ${JSON.stringify(products)}
            
            User question:
            ${question}
            
            Give a short helpful answer.
            don't answer with a question, the user will not able to response to the same thread
            `;

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        console.log("AI Text Response:" , response);
        return response;
    }catch(e){
        console.error("My Error:", e);
        return "AI error. Please try again."
    }
}