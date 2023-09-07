import { styled } from "styled-components"
import Editer from "../../components/Editer"

const WritePage = () => {
  return (
    <>
      <TitleInput 
        type="text" 
        placeholder="Title"
      />
      <Editer />
    </>
  )
}

export default WritePage

const TitleInput = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`