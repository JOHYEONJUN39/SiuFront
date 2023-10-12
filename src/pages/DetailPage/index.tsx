import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { DeletePost, GetPost } from "../../api/Board/Post";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { showOpen } from "../../store/headerSlice";
import { showClose } from "../../store/headerSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AllLoading from "../../components/Loading/AllLoading";
import Nav from "../../components/Layout/Nav";
import { useTimeStamp } from "../../hooks/useTimeStamp";
import TagUI from "../../components/common/TagUI";
import Footer from "../../components/Detail/Footer";

const DetailPage = () => {
  // 주소창에서 /:postId 부분을 가져온다
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ["detail", postId],
    () => GetPost(Number(postId)),
    {
      enabled: !!postId,
      refetchOnWindowFocus: false,
      onError: () => {
        navigate("/404");
      },
    }
  );

  const show = useSelector((state: RootState) => state.header.show);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timeAgo = useTimeStamp(data?.post.created_at || "");
  const userData = useSelector((state: RootState) => state.user);

  const handleEdit = () => {
    navigate(`/write?post=${postId}`);
  };

  const deleteMutation = useMutation((postId: number) => DeletePost(postId), {
    onSuccess: () => {
      alert("삭제되었습니다");
      navigate("/");
    },
    onError: () => {
      alert("삭제에 실패하였습니다");
    },
  });

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(Number(postId));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { capture: true });

    return () => {
      window.removeEventListener("scroll", handleScroll), { capture: true };
    };
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > bodyRef.current?.offsetTop!) {
      if (show) return;
      dispatch(showOpen());
    } else {
      dispatch(showClose());
    }
  }, [bodyRef.current]);

  if (isLoading) return <AllLoading />;

  return (
    <>
      <Nav />
      <Container>
        <Header>
          <HeaderWrapper>
            <HeaderImage />
            <HeaderInner />
            <Title>
              <TitleText>{data?.post.title}</TitleText>
            </Title>

            <PostInfo>
              <Info>
                <div className="by">by</div>{" "}
                <div className="user-name">{data?.user.nickname}</div>{" "}
                <div className="date">{timeAgo}</div>
              </Info>
              <TagBox>
                {data?.tags.map((tag: string, index: number) => (
                  <TagUI key={index} tag_name={tag} />
                ))}
              </TagBox>
            </PostInfo>
          </HeaderWrapper>
        </Header>

        <Body ref={bodyRef}>
          <Article
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.post.article || ""),
            }}
          />
          {
            // 로그인한 유저와 작성자가 같을 경우에만 수정, 삭제 버튼이 보인다
            userData?.id === data?.user.id && (
              <ToolBox>
                <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
                <EditButton onClick={handleEdit}>수정</EditButton>
              </ToolBox>
            )
          }
          <Footer
            postId={Number(postId)}
            userId={userData?.id}
            comments={data?.comments}
          />
        </Body>
      </Container>
    </>
  );
};

export default DetailPage;

const Container = styled.div`
  min-width: 700px;
  margin: 0 auto;

  @media (max-width: 700px) {
    min-width: 0;
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const HeaderImage = styled.div`
  background-image: url("https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg");
  height: 450px;
`;

const HeaderInner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 450px;
  background-color: #000;
  opacity: 0.3;
`;

const Title = styled.div`
  position: absolute;
  width: 700px;
  bottom: 0;
  right: 50%;
  transform: translate(50%, -10rem);

  @media (max-width: 700px) {
    width: 500px;
  }
`;

const TitleText = styled.div`
  font-size: 3rem;
  font-weight: 400;
  margin: 0;
  color: #fff;
`;

const PostInfo = styled.div`
  position: absolute;
  align-items: center;
  width: 700px;
  bottom: 0.5rem;
  right: 50%;
  color: #fff;
  transform: translateX(50%);

  @media (max-width: 700px) {
    width: 500px;
  }
`;

const Info = styled.div`
  display: flex;
  margin-bottom: 1rem;

  & > .by {
    font-size: 0.8rem;
    font-weight: 600;
    font-style: italic;
    margin-right: 0.5rem;
  }

  & > .user-name {
    font-size: 0.8rem;
    font-weight: 600;
  }

  & > .date {
    color: #aaa;
    font-size: 0.8rem;
    font-weight: 600;
    margin-left: 0.5rem;
  }
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  color: #fff;
  z-index: 2;

  @media (max-width: 700px) {
    width: 500px;
  }
`;

const Body = styled.div`
  margin-top: 400px;
  position: relative;
  background-color: #fff;
  height: 500vh;
  margin-bottom: 60px;
  padding-top: 1rem;

  @media (max-width: 700px) {
    width: 700px;
  }
`;

const Article = styled.div`
  width: 700px;
  text-align: left;
  margin: 0 auto;
  background: #fff;
  overflow: hidden;
  position: relative;
  z-index: 10;

  @media (max-width: 700px) {
    width: 500px;
  }
`;

const ToolBox = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;
  width: 700px;
  color: #000;

  @media (max-width: 700px) {
    width: 500px;
  }
`;

const DeleteButton = styled.div`
  width: 50px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #868e96;

  &:hover {
    color: #000;
  }
`;

const EditButton = styled.div`
  width: 50px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #868e96;

  &:hover {
    color: #000;
  }
`;
