import { useEffect, useState } from "react"
import { fetchRepoDetails } from "../hooks/useGithubExplorer"
import type { ReposDetails } from "../types/RepsData"
interface Props{
    username: string,
    name: string
}
export const RepoDetails = (props: Props) =>{
    const [repDetails, setRepDetails] = useState<ReposDetails>()

    useEffect(() => {
        handleHook();
    },[])

    const handleHook = async() =>{
        const data = await fetchRepoDetails(props.username,props.name);
        setRepDetails(data);
    }

    return(
        <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
            <div className="Border"> 
                <span className="Title">Name:</span> 
                    {repDetails?.name} 
            </div >
            <div className="Border">
                <span className="Title">Description:</span> 
                    {repDetails?.description} 
            </div>
            <div className="Border">
                <span className="Title">Stargazers Count:</span> 
                    {repDetails?.stargazers_count} 
            </div>
            <div className="Border">
                <span className="Title">Forks Count:</span> 
                    {repDetails?.forks_count} 
            </div>
            <div className="Border">
                <span className="Title">Open Issues Count:</span> 
                    {repDetails?.open_issues_count} 
            </div>
            <div className="Border">
                <span className="Title">Language:</span> 
                    {repDetails?.language} 
            </div>
            <div className="Border">
                <span className="Title">Updated At:</span> 
                    {repDetails?.updated_at} 
            </div>
            <div className="Border">
                <span className="Title">HTML URL:</span> 
                    <a
                    href={repDetails?.html_url} target="_blank" >
                    {repDetails?.html_url}
                    </a>
            </div>
        </div>
    )
}