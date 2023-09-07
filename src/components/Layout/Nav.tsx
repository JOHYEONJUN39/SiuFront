import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import Modal from "../Modal";

const Nav = () => {
  const [searchValue, setsearchValue] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname !== "/search") {
      setsearchValue("")
    }
  }, [location])
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchValue(e.target.value)
    navigate(`/search?query=${e.target.value}`)
  }

  const handleModal = (modalType: string) => {
    setType(modalType)
    setOpenModal(true)
  }
  
  return (
    <>
      <Header>
        <HeaderInner>
          <HeaderWrapper>
            <HeaderTitle onClick={() => navigate('/')}>Newbiesiuuuu</HeaderTitle>
            <HeaderInput
              value={searchValue}
              onChange={handleSearch}
              type="text" 
              placeholder="Search" 
            />
            <HeaderRight>
              <LoginButton onClick={() => handleModal("login")}>Login</LoginButton>
              <RegistButton onClick={() => handleModal("register")}>Register</RegistButton>
            </HeaderRight>
          </HeaderWrapper>
        </HeaderInner>
      </Header>

    {
      openModal && (
        <Modal setOpenModal={setOpenModal} type={type} />
      )
    }

    </>
  )
}

export default Nav

const Header = styled.header`
  background-color: #58FAD0;
  border-bottom: 1px solid #eee;
  width: 100%;
  position: fixed;
  top: 0;
`

const HeaderInner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  position: relative;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  cursor: pointer;
`

const HeaderInput = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-left: 1rem;
  padding-left: 1rem;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginButton = styled.div`
  width: 90px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  margin-right: 1rem;
  background-color: #fff;

  &:hover {
    cursor: pointer;
    background-color: #A9D0F5;
  }
`
const RegistButton = styled.div`
  width: 90px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: #fff;

  &:hover {
    cursor: pointer;
    background-color: #6E6E6E;
  }
`