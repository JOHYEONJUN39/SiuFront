import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GetTagList } from '../../api/Search/Search';

const tagData = [
  {
    'id': 1,
    'name': '#test1'
  },
  {
    'id': 2,
    'name': '#test2'
  },
  {
    'id': 3,
    'name': '#asdf'
  }
]

const SearchInput = () => {
  const [tagSearch, setTagSearch] = useState<boolean>(false);
  const [tagResult, setTagResult] = useState<string[]>([]);
  const [searchValue, setsearchValue] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  // 검색창 초기화
  useEffect(() => {
    if(location.pathname !== "/search") {
      setsearchValue("")
    }
  }, [location])

  // 검색 했을 때 검색 페이지로 이동
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 검색창 다 지우면 메인 페이지로 이동
    if (e.target.value === "") {
      navigate("/")
      setTagSearch(false)
      return;
    }

    // 첫 글자가 #이면 태그 검색
    if (e.target.value.startsWith("#")) {
      setsearchValue(e.target.value);
      // 이건 #만 입력했을 때 검색 안되도록
      if (e.target.value.length > 1) {
        handleTagSearch(e.target.value);
      }
      return;
    }

    setsearchValue(e.target.value)
    navigate(`/search?query=${e.target.value}`)
  }

  // 태그 검색 함수
  const handleTagSearch = async (tag: string) => {

    setTagSearch(true)

    const data = await GetTagList(tag)

    console.log(data);
    

  }

  function replace(url: string) {     
    url= encodeURIComponent(url);    
    return url;
  }

  // 태그 클릭 시 검색
  const tagClick = (item: string) => {
    setsearchValue(item)
    setTagSearch(false)
    const itemResult = replace(item)
    navigate(`/search?query=${itemResult}`)
  }

  return (
    <InputBox>
      <HeaderInput
        value={searchValue}
        onChange={handleSearch}
        type="text" 
        placeholder="Search" 
      />
      <TagSearchBox $tagSearch={tagSearch}>
        {
          tagResult.map((item, index) => {
            return (
              <TagResult key={index} 
                onClick={() => tagClick(item)}
              >
                {item}
              </TagResult>
            )
          })
        }
      </TagSearchBox>
    </InputBox>
  )
}

export default SearchInput

const TagSearchBox = styled.div<{$tagSearch: boolean}>`
  display: ${({$tagSearch}) => $tagSearch ? "block" : "none"};
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
`

const TagResult = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`

const InputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

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
`