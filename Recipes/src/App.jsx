import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { RandomRecipes } from './PickRandomRecipe'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RandomRecipes/>
    </div>
  )
}

export default App
