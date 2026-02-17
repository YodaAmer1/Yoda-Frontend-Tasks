import './App.css'
import MyComponent from './MyComponent'
import UsernameForm from './UsernameForm';

function App() {
  const startingNumber = 0;
  return (
    <div>
      <div>Number Counter :</div>
      <MyComponent startingNumber={startingNumber} />
      <UsernameForm />
    </div>
  )
}

export default App

// Task:  Create compopnent with (-) button
//and(+) button and show a number in the middle 
