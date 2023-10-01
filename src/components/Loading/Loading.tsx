import { RingLoader } from 'react-spinners'
import styled from 'styled-components'

const Loading = () => {
  return (
    <Container>
      <RingLoader
        color={"#36d7b7"}
        loading={true}
        size={100}
      />
    </Container>
  )
}

export default Loading

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left:0; 
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`