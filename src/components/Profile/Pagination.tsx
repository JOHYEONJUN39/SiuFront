import styled from 'styled-components';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = [...Array(totalPages).keys()].map(i => i + 1);

  return (
    <PaginationContainer>
      {pages.map(page => (
        <PageButton key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
          {page}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;

const PageButton = styled.button<{ active: boolean }>`
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  background-color: ${props => (props.active ? '#96F2D6' : '#fff')};
`;
