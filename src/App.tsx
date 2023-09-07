import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import WritePage from './pages/WritePage'
import Layout from './Layout'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path='write' element={<WritePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
