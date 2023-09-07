import { Outlet } from "react-router-dom"
import Nav from "./components/Layout/Nav"
import { styled } from "styled-components"

const Layout = () => {
  return (
    <>
      <Nav />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default Layout

const Container = styled.div`
  width: 1240px;
  margin: 0 auto;
`