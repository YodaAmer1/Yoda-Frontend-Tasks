import { Button, TextField } from "@mui/material"
import type { ReposData } from "../types/RepsData"

interface Props {
    repos: ReposData[],
    search: string,
    setSearch: (serach:string) => void,
    setSortType: (sortType: "name" | "updated") => void,
}


export const RepoControls =(props: Props) => {

    const repos = props.repos;
    const search = props.search;
    const setSearch = props.setSearch;
    const setSortType = props.setSortType;

    return(
        <div>
             {repos.length > 0 &&(
                    <div>
                    <TextField 
                        size="small"
                        value={search} 
                        onChange={(e)=> setSearch(e.target.value)} 
                        placeholder="Search Repo"
                    />
                    <div>
                        <Button 
                    variant="outlined" 
                    style={{marginBottom: " 10px" , marginTop: " 20px" , marginRight: 25}} 
                    onClick={() => setSortType("name")}>
                        Sort By Name
                    </Button>
                    <Button 
                    variant="outlined" 
                    style={{marginBottom: " 10px" , marginTop: " 10px"}} 
                    onClick={() => setSortType("updated")}>
                        Sort By Updated
                    </Button>
                    </div>
                    </div> 
                    )}
        </div>
    )
}