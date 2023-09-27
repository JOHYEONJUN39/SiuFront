import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import WritePage from './pages/WritePage'
import ProfilePage from './pages/ProfilePage'
import Layout from './Layout'
import DetailPage from './pages/DetailPage'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path='write' element={<WritePage />} />
          <Route path="Profile" element={<ProfilePage />} />
          <Route path="/board/:postId" element={<DetailPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
