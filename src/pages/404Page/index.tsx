import styled from "styled-components";

const NotPage = () => {
  return <Page404>404 Not Found</Page404>;
};

export default NotPage;

const Page404 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 700;
  height: 100vh;
`;
