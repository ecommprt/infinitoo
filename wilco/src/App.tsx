import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import TmPage from '@/pages/TmPage'
import SchedulePage from '@/pages/SchedulePage'
import BudgetPage from '@/pages/BudgetPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tm/:eventId/:dayId" element={<TmPage />} />
        <Route path="tm/:eventId" element={<TmPage />} />
        <Route path="cronograma/:eventId" element={<SchedulePage />} />
        <Route path="budget/:eventId" element={<BudgetPage />} />
      </Route>
    </Routes>
  )
}
