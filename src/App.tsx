import { Routes, Route } from 'react-router-dom'

function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Les Echos Frontend</h1>
      <p className="text-gray-500">Vite + React 19 + Tailwind CSS v4</p>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}
