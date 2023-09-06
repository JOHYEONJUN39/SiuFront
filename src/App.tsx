import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Layout/Nav'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'

const Layout = () => {
  return (
    <>
      <Nav />

      <Outlet />
    </>
  )
}

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
