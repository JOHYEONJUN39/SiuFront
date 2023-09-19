import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import Modal from "../Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { resetUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { showOpen } from "../../store/modalSlice";
import SearchInput from "../Search/SearchInput";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setModal = useSelector((state: RootState) => state.modal);
  const userData = useSelector((state: RootState) => state.user);

  // 모달 창 띄우기
  const handleModal = (modalType: string) => {
    dispatch(showOpen({
      modalType
    }))
  }

  const handleLogOut = () => {
    dispatch(resetUser())
    navigate("/")
  }
  
  return (
    <>
      <Header>
        <HeaderInner>
          <HeaderWrapper>
            <HeaderTitle onClick={() => navigate('/')}>Newbiesiuuuu</HeaderTitle>

            <SearchInput />

            <HeaderRight>
              {
                userData.id ? (
                  <>
                    <WriteButton onClick={() => navigate("/write")}>Write</WriteButton>
                    <User>
                      <UserImg src={userData.photo} alt="userImg" />
                      <UserMenu>
                        <UserMenuList onClick={() => navigate(`/user/${userData.id}`)}>Profile</UserMenuList>
                        <UserMenuList onClick={handleLogOut}>Logout</UserMenuList>
                      </UserMenu>
                    </User>
                  </>

                ) : (
                  <>
                    <LoginButton onClick={() => handleModal("login")}>Login</LoginButton>
                    <RegistButton onClick={() => handleModal("register")}>Register</RegistButton>      
                  </>
                )
              }
            </HeaderRight>

          </HeaderWrapper>
        </HeaderInner>
      </Header>

    {
      setModal.show && (
        <Modal />
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
  z-index: 999;
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
  text-shadow: 2px 3px 0px #bdbdbd;
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
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

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
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
    background-color: #6E6E6E;
  }
`

const WriteButton = styled.div`
  width: 90px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: #fff;
  margin-right: 1rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
    background-color: #A9D0F5;
  }
`

const UserMenu = styled.div`
  display: none;
  position: absolute;
  top: 60px;
  right: 20px;
  width: 150px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  animation: toggle 0.5s;

  @keyframes toggle {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:before {
    content: "";
    position: absolute;
    width: 120px;
    top: -20px;
    right: 0;
    border: 10px solid transparent;
  }
`

const UserMenuList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  cursor: pointer;

  &:hover {
    ${UserMenu} {
      display: block;
    }
  }
`

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`