import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-8">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-24 w-24 hover:drop-shadow-[0_0_2em_#646cffaa] transition-filter duration-300" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-24 w-24 hover:drop-shadow-[0_0_2em_#61dafbaa] transition-filter duration-300 animate-[spin_20s_linear_infinite]" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Vite + React + Tailwind
      </h1>
      <div className="bg-neutral-800 p-8 rounded-2xl shadow-xl border border-neutral-700 text-center">
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer mb-4"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="text-neutral-400">
          Edit <code className="bg-neutral-900 px-2 py-1 rounded text-pink-400 text-sm">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-8 text-neutral-500">
        Click on the Vite, React and Tailwind logos to learn more
      </p>
    </div>
  )
}

export default App
