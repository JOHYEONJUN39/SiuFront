import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { GetBoard } from '../../api/Board/Post';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { showOpen } from '../../store/headerSlice';
import { showClose } from '../../store/headerSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import AllLoading from '../../components/Loading/AllLoading';

const DetailPage = () => {
  // 주소창에서 /:postId 부분을 가져온다
  const { postId } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery(['detail', postId], () => GetBoard(Number(postId)), {
    enabled: !!postId,
    refetchOnWindowFocus: false,
  })

  const show = useSelector((state: RootState) => state.header.show);

  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { capture: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > bodyRef.current?.offsetTop!) {
      if (show) return;
      dispatch(showOpen())
    } else {
      dispatch(showClose())
    }
  }, [bodyRef.current])

  if (isLoading) return <AllLoading />

  return (
    <Container>
      <Header>
        <HeaderWrapper>

          <HeaderImage />

          <Title>
            <h1>{data?.post.title}</h1>
          </Title>
        </HeaderWrapper>
      </Header>

      <Body ref={bodyRef}>
        <Article
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.post.article || ''),
          }}
        />
      </Body>

    </Container>
  )
}

export default DetailPage

const Container = styled.div`
  height: 1000vh;
`

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
`

const HeaderWrapper = styled.div`
  position: relative;
`

const HeaderImage = styled.div`
  background: url("https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg");
  background-attachment: fixed;
  height: 400px;
  width: 100vw;
`

const Title = styled.div`
  position: absolute;
  bottom: 30%;
  left: 30%;
  font-size: 36px;
  color: #fff;
  font-weight: 500;
`

const Body = styled.div`
  margin-top: 400px;
  position: relative; 
`

const Article = styled.div`
  width: 100%;
  max-width: 768px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`