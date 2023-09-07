import { useLocation } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { useEffect } from 'react';
import { styled } from 'styled-components';

const SearchPage = () => {
  const query = new URLSearchParams(useLocation().search)
  const searchQuery = query.get('query')
  const debounceSearch = useDebounce(searchQuery!, 500)

  useEffect(() => {
    if(debounceSearch) {
      searchData(debounceSearch)
    }
  }, [debounceSearch])

  const searchData = (debounceSearch : string) => {
    console.log(debounceSearch)
  }

  return (
    <NoResult>
      {
        searchQuery
        ? <h1> 찾고자하는 검색어 &quot;{searchQuery}&quot;에 대한 검색결과가 없습니다. </h1>
        : <h1> 검색어를 입력해주세요. </h1>
      }
    </NoResult>
  )
}

export default SearchPage

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`