import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { fetchRepos } from "../hooks/useGithubExplorer";
import type { ReposData } from "../types/RepsData";
import { ListReposComponent } from "./ListReposComponent";

export const SearchBarComponent = () => {
    const [username, setUsername] = useState("");
    const [repos, setRepos] = useState<ReposData[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    
    const handleSearch = async() => {
         const data = await fetchRepos(username);
         setRepos(data);
         setHasSearched(true)
    }

    const handleNewSearch = () => {
    setHasSearched(false);
    setUsername("");
    setRepos([]);
  };

    return(
        <div>
            {!hasSearched ? (
            <div>
                <TextField 
                    size="small"
                    value={username} 
                    onChange={(e)=> setUsername(e.target.value)} 
                    placeholder="Enter Username"
                />
                <Button variant="contained" onClick={handleSearch}>Search</Button>
                
            </div>
            ):(
                <Button variant="outlined" onClick={handleNewSearch}>
          New Search
        </Button>
            )}
            <ListReposComponent username={username} repos={repos}/>
        </div>
    )
}