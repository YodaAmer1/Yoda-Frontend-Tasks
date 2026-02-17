function UsernameStatus (props){

    return(
        <div>
            {props.username.length < 3 ?  "name should be at least 3 charachters" : "Valid Username"}
        </div>
    )
}
export default UsernameStatus;