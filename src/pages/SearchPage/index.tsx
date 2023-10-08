import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { styled } from "styled-components";
import { GetBySearch, GetByTag } from "../../api/Search/Search";
import Search from "../../components/Search/Search";
import { useInfiniteQuery } from "react-query";
import Loading from "../../components/Loading/Loading";
import { Post } from "../../types/Board.interface";
import InfiniteScroll from "react-infinite-scroller";
import { BeatLoader } from "react-spinners";

const SearchPage = () => {
  const navigate = useNavigate();

  // 검색어 가져오기
  const query = new URLSearchParams(useLocation().search);
  const searchQuery = query.get("query");

  // 검색 하고 1초 후에 검색 결과 가져오기
  const debounceSearch = useDebounce(searchQuery!, 1500);

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["search", debounceSearch],
      ({ pageParam = 0 }) => {
        if (debounceSearch![0] === "#") {
          return GetByTag(debounceSearch!, pageParam);
        }
        return GetBySearch(debounceSearch!, pageParam);
      },
      {
        enabled: !!debounceSearch,
        refetchOnWindowFocus: false,
        onError: () => {
          navigate("/404");
        },
        getNextPageParam: (lastpage) => {
          const page = lastpage.current_page;
          if (lastpage.last_page === page) {
            return undefined;
          }
          return page + 1;
        },
      }
    );

  const loadmore = () => {
    fetchNextPage();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Result>{debounceSearch}</Result>

      <InfiniteScroll loadMore={loadmore} hasMore={hasNextPage}>
        {data?.pages.map((page) => {
          return page.data.map((post: Post) => {
            return <Search key={post.id} data={post} />;
          });
        })}
      </InfiniteScroll>

      {isFetching && <BeatLoader size={12} style={{ marginBottom: "1rem " }} />}

      {!hasNextPage && <NoResult>검색 결과가 없습니다.</NoResult>}
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Result = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 4rem;
`;

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
