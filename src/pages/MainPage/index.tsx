import { styled } from "styled-components"
import Galleries from "../../components/Gallery/Galleries";
import TopButton from "../../components/TopButton";

const tagName = [
  "테스트",
  "ㅇㅈ",
  "엄준식"
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
  height: 1000vh;
`
