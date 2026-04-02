import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Layout } from '@/components/Layout/Layout'
import { Home } from '@/pages/Home/Home.tsx'
import { NotFound } from '@/pages/NotFound/NotFound.tsx'
import { ErrorFallback } from '@/components/ErrorFallback/ErrorFallback.tsx'

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
