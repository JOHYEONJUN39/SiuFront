import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Con>
      <h1>MainPage</h1>
      <button onClick={() => navigate('/write')}>Write</button>
    </Con>
  )
}

export default MainPage

const Con = styled.div`
  height: 1000vh;
`