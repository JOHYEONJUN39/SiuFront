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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
`