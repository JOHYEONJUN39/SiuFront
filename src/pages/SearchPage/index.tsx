import { useLocation } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { GetBySearch, GetByTag } from "../../api/Search/Search";
import Search from "../../components/Search/Search";
import { useQuery } from "react-query";
import Loading from "../../components/Loading/Loading";

interface searchResult {
  title: string;
  article: string;
  created_at: Date;
  tag_names?: string[];
}

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<searchResult[]>([]);

  // 검색어 가져오기
  const query = new URLSearchParams(useLocation().search);
  const searchQuery = query.get("query");

  // 검색 하고 1초 후에 검색 결과 가져오기
  const debounceSearch = useDebounce(searchQuery!, 1000);

  // 검색 결과 가져오기 useQuery 사용
  // 후에 useInfiniteQuery로 변경
  const { data, isLoading } = useQuery(
    ["search", debounceSearch],
    () => {
      if (debounceSearch[0] === "#") {
        return GetByTag(debounceSearch);
      }
      return GetBySearch(debounceSearch);
    },
    {
      enabled: !!debounceSearch,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      setSearchResult(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Result>{debounceSearch}</Result>
      {searchResult.map((result, index) => (
        <div key={index}>
          <Search data={result} />
        </div>
      ))}
      {searchResult.length === 0 && isLoading === false && (
        <NoResult>검색 결과가 없습니다.</NoResult>
      )}
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
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
