import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GetTagList } from "../../api/Search/Search";
import { useQuery } from "react-query";
import { HashLoader } from "react-spinners";

const SearchInput = () => {
  const [tagSearch, setTagSearch] = useState<boolean>(false);
  const [tagResult, setTagResult] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(useLocation().search);
  const searchQuery = query.get("query");

  // input 창 벗어나면 검색 결과 숨기기
  const handleBlur = () => {
    setTimeout(() => {
      setTagSearch(false);
      setFocus(false);
      setTagResult([]);
    }, 100);
  };

  // 검색창 초기화
  useEffect(() => {
    if (location.pathname !== "/search") {
      setSearchValue("");
      setTagResult([]);
    }
  }, [location]);

  useEffect(() => {
    if (searchQuery) {
      setSearchValue(searchQuery);
    }
  }, [searchQuery]);

  // 검색 했을 때 검색 페이지로 이동
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 검색창 다 지우면 메인 페이지로 이동
    if (e.target.value === "") {
      navigate("/");
      setTagSearch(false);
      return;
    }

    // 첫 글자가 #이면 태그 검색
    if (e.target.value.startsWith("#")) {
      setSearchValue(e.target.value);
      return;
    }

    setSearchValue(e.target.value);
    if (location.pathname === "/search") {
      navigate(`/search?query=${e.target.value}`);
    } else {
      setTimeout(() => {
        navigate(`/search?query=${e.target.value}`);
      }, 1000);
    }
  };

  // 태그 검색
  const { isLoading } = useQuery(
    ["tag", searchValue],
    async () => {
      setTagResult([]);
      setTagSearch(true);
      const data = await GetTagList(searchValue);
      return data;
    },
    {
      onSuccess: (data) => {
        setTagResult(data);
      },
      onError: () => {
        setTagSearch(false);
      },
      cacheTime: 0,
      enabled: searchValue.startsWith("#") && searchValue.length > 1 && focus,
    }
  );

  // url 인코딩
  function replace(url: string) {
    url = encodeURIComponent(url);
    return url;
  }

  // 태그 클릭 시 검색
  const tagClick = (item: string) => {
    setSearchValue(item);
    setTagSearch(false);
    const itemResult = replace(item);
    navigate(`/search?query=${itemResult}`);
  };

  return (
    <InputBox>
      <HeaderInput
        value={searchValue}
        onChange={handleSearch}
        type="text"
        placeholder="Search"
        onFocus={() => setFocus(true)}
        onBlur={handleBlur}
      />
      <TagSearchBox $tagSearch={tagSearch}>
        {tagResult.map((item, index) => {
          return (
            <TagResult key={index} onClick={() => tagClick(item)}>
              {item}
            </TagResult>
          );
        })}
        <HashLoader
          color="#36d7b7"
          loading={isLoading}
          size={20}
          cssOverride={{ margin: "0 auto" }}
        />
      </TagSearchBox>
    </InputBox>
  );
};

export default SearchInput;

const TagSearchBox = styled.div<{ $tagSearch: boolean }>`
  display: ${({ $tagSearch }) => ($tagSearch ? "block" : "none")};
  position: absolute;
  top: 50px;
  margin: 0 auto;
  width: 300px;
  max-height: 300px;
  overflow-y: hidden;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const TagResult = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderInput = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding-left: 1rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 700px) {
    width: 200px;
  }
`;
