import { useState } from "react";
import UsernameStatus from "./UsernameStatus";
function UsernameForm () {
    const [username,setUsername] = useState("");

    return(
        <div>
            <label>Username:</label>
            <input name="Username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <UsernameStatus username={username}/>        
        </div>
    )
}
export default UsernameForm;