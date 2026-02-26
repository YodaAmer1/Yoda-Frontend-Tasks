import { useEffect, useState } from "react";
import type { ReposData } from "../types/RepsData";
import { RepoDetails } from "./RepoDetails";
import { Button} from "@mui/material";
import { RepoControls } from "./RepoControls";

interface Props{
    username: string,
    repos: ReposData[]
}
export const ListReposComponent = (props:Props) => {
    const [selectedRepo, setSelectedRepo] = useState<ReposData>();
    const [search, setSearch] = useState("");
    const [hasSelected , setHasSelected] = useState(false);
    const [sortType, setSortType] = useState<"name" | "updated">("name");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const repos =props.repos;
    const username = props.username

    const filteredNames = repos.filter((repo) => repo.name.toLowerCase().includes(debouncedSearchTerm.toLocaleLowerCase()));

    const sortedRepos = [...filteredNames].sort((a, b) => {
        if (sortType === "name") {
            return a.name.localeCompare(b.name);
        } else {
            return (
            b.updated_at.localeCompare(a.updated_at));
        }
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(search);
        }, 400);
        
        return () => clearTimeout(timer);
    }, [search]);

    return(
        <div>
            
            {hasSelected && selectedRepo ? (
                <div>
                    <Button 
                    variant="outlined" 
                    style={{marginBottom: " 10px" , marginTop: " 10px"}} 
                    onClick={() =>setHasSelected(false)}>
                        Back To Repos List
                    </Button>

                    <RepoDetails username={username} name={selectedRepo.name} />
                </div>
             ):(
                <div>
                    {repos.length > 0 &&(
                    <div>
                        <h2> <strong style={{color : "green"}}>Github Username: </strong>{username}</h2>
                        <RepoControls repos={repos} search={search} setSearch={setSearch} setSortType={setSortType}/>
                    </div>
                    )}
                    <div style={{marginRight : 50, padding: 20}}>
                    {sortedRepos.map((repo)=>{
                        return(
                            <div 
                            className="Border"
                            key={repo.id}
                            onClick={() => {setSelectedRepo(repo) , setHasSelected(true)}}>
                            {repo.name}
                        </div>
                        )
                    })}
                </div>
            </div>
             )}
        </div>
    )


}