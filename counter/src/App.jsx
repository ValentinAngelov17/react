import { useState } from 'react'



function App() {
  const [count, setCount] = useState(0)
  let increment = () => {
    setCount((count) => count + 1)
  }
  let decrement = () => {
    setCount((count) => count - 1)
  }


  return (
    <>
      <div className='flex-div'>

        <div className='buttons'>
          <button onClick={decrement}>
            decrement
          </button>
        </div>

        <div className="card">
          <h1>count is: {count}</h1>
        </div>

        <div className='buttons'>
          <button onClick={increment}>
            increment
          </button>
        </div>

      </div>
    </>
  )
}

export default App
