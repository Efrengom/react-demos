import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Home from './components/Home.jsx'
import DemoPage from './components/DemoPage.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="content-inner">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo/:slug" element={<DemoPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
