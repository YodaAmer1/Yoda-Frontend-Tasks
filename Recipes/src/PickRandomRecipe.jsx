import { useEffect, useState } from "react";

export const RandomRecipes = () => {
    const [recipes,setRecipes] = useState([])
    const [randomRecipe, setRandomRecipe] = useState([]);
    const [search, setSearch] = useState("");
    const [showList, setShowList] = useState(false);

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase())
     );

    useEffect(() => {
        fetchRecipes();
    },[]);

    const fetchRecipes = async() => {
        try{
            const response = await fetch("https://dummyjson.com/recipes");
            const data = await response.json();
            setRecipes(data.recipes);
            pickRandom(data.recipes);
            console.log("Recipes:",data.recipes)
        }catch(error){
            console.log("My Error:", error)
        }
    }

    const pickRandom = (recipes) => {
        if (recipes.length === 0) return;
        const randomIndex = Math.floor(Math.random() * recipes.length);
        setRandomRecipe(recipes[randomIndex]);
    }
    

    return (
        <div style={{backgroundColor : "white" , color:"black", minHeight: "100vh"}}>
          <div style={{ position: "relative", width: "300px" }}>
           <input 
           value={search}
           onFocus={() => setShowList(true)}
           onChange={(e) => setSearch(e.target.value)}
           placeholder="Search For Recipe"
           style={{width:"300px", height: "25px",background:"white",marginTop:10, color:"black"}}/>

           {showList && (
            <div className="dropdown">
                {filteredRecipes.map((recipe) => (
                <div
                    onClick={() => {
                    setRandomRecipe(recipe);
                    setSearch("");
                    setShowList(false);
                    }}
                >
                    {recipe.name}
                </div>
                ))}
            </div>
            )}
         </div>
            <div>
                <div className="Title">Name:</div> 
                {randomRecipe?.name} 
            </div>
            <div>
                <div className="Title">Cuisine:</div> 
                 {randomRecipe?.cuisine} 
             </div>
            <div>
                <div className="Title">Instructions: </div> 
                <div>{randomRecipe?.instructions} </div>
            </div>
            <div>
                <div className="Title">Rating: </div> 
                {randomRecipe?.rating} 
            </div>
            <div>
                <div className="Title">Image:</div> 
                <img src={randomRecipe?.image} style={{width : "250px" }}/>
            </div>
            <button onClick={() => pickRandom(recipes)}>Regenerate</button>
        </div>
    )
}