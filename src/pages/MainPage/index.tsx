import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import Galleries from "../../components/Gallery/Galleries";
import TopButton from "../../components/TopButton";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Con>
      <h1>MainPage</h1>
      <button onClick={() => navigate('/write')}>Write</button>
      <Galleries category="인기순" />
      <Galleries category="추천" />
      <Galleries category="정치" />
      <Galleries category="영화" />
      <TopButton />
    </Con>
  )
}

export default MainPage

const Con = styled.div`
  height: 1000vh;
`
