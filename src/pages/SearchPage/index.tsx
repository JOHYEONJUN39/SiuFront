import { useLocation } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { GetByTag } from '../../api/Search/Search';
import Search from '../../components/Search';
import { RingLoader } from 'react-spinners';

type Data = {
  id: number;
  title: string;
  article: string;
  created_at: string;
}

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<Data[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  // 검색어 가져오기
  const query = new URLSearchParams(useLocation().search)
  const searchQuery = query.get('query')
  
  // 검색 하고 0.5초 후에 검색 결과 가져오기
  const debounceSearch = useDebounce(searchQuery!, 500)

  useEffect(() => {
    if(debounceSearch) {
      searchData(debounceSearch)
    } 
  }, [debounceSearch])

  const searchData = async (debounceSearch : string) => {
    if (debounceSearch[0] === '#') {
      try {
        setLoading(true)
        const result = await GetByTag(debounceSearch)
        setSearchResult(result)
        setLoading(false)
      }
      catch (err) {
        setLoading(false)
      }
    }
  }

  return (
    <Container>
      <Result>
        {searchQuery}
      </Result>
      {
        searchResult.map((result, index) => (
          <div key={index}>
            <Search data={result} />
          </div>
        ))
      }
      {
        searchResult.length === 0 && loading === false &&
        <NoResult>
          검색 결과가 없습니다.
        </NoResult>
      }
      {
        loading ? 
        <RingLoader
          color={"#36d7b7"}
          loading={loading}
          size={100}
        /> : null
      }
    </Container>
  )
}

export default SearchPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
`

const Result = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 4rem;
`

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`