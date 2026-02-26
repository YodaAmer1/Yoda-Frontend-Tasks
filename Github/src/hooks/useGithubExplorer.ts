import type { ReposData } from "../types/RepsData";

export const fetchRepos= async(username: string) : Promise<ReposData[]> =>{
        try{

            const res = await fetch(`https://api.github.com/users/${username}/repos`);
            const data = await res.json();
            console.log(data);
            return data
        }catch(error){
            console.error("My Error: ", error);
            return [];
        }
    }

export const fetchRepoDetails = async (username: string, repo: string)  => {
    try{
        const res = await fetch(`https://api.github.com/repos/${username}/${repo}`);
            const data = await res.json();
            console.log("Repository Data:**", data)
            return data;

    }catch(error){
        console.error("My Erro:",error);
        return ;
    }
}