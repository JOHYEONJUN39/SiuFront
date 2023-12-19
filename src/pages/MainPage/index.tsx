import { styled } from "styled-components"
import Galleries from "../../components/Gallery/Galleries";
import TopButton from "../../components/TopButton";

const tagName = [
  "旅行",
  "料理",
  "趣味"
]

const MainPage = () => {
  
  return (
    <Con>
      {
        tagName.map((tag, index) => {
          return <Galleries category={tag} key={index} />
        })
      }
      <TopButton />
    </Con>
  )
}

export default MainPage

const Con = styled.div`
  height: 200vh;
`
