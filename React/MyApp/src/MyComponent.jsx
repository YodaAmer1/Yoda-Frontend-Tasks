import { useState } from "react"

function MyComponent(props){
  const [count,setCount] = useState(props.startingNumber);
    return (
    <div>
      <button onClick={() => setCount(count-1)}>-</button>
      <div>{count}</div>
      <button onClick={() => setCount(count+1)}>+</button>
    </div>
  )

}
export default MyComponent