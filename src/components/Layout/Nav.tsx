import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { resetUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { showOpen } from "../../store/modalSlice";
import SearchInput from "../Search/SearchInput";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useLogin } from "../../api/Sign/Login";
import { toast } from "react-toastify";
import { removeCookie } from "../../hooks/useCookie";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
  const [detailePage, setDetailePage] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { logout } = useLogin();

  const setModal = useSelector((state: RootState) => state.modal);
  const userData = useSelector((state: RootState) => state.user);

  const show = useSelector((state: RootState) => state.header.show);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("/posts/")) {
      setDetailePage(true);
    } else {
      setDetailePage(false);
    }
  }, [location.pathname]);

  const logoutMutation = useMutation(() => logout(), {
    onSuccess: () => {
      dispatch(resetUser());
      removeCookie("XSRF-TOKEN");
      navigate("/");
      toast.success("로그아웃 되었습니다");
    },
    onError: () => {
      toast.error("로그아웃에 실패하였습니다");
    },
  });

  // 모달 창 띄우기
  const handleModal = (modalType: string) => {
    dispatch(
      showOpen({
        modalType,
      })
    );
  };

  const handleLogOut = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      <Header $detailePage={detailePage} $show={show}>
        <HeaderInner>
          <HeaderWrapper>
            <HeaderTitle onClick={() => navigate("/")}>BlogHub</HeaderTitle>
            <SearchInput />
  
            <HeaderRight>
              <ThemeToggle />
              {userData.id ? (
                <>
                  <WriteButton onClick={() => navigate("/write")}>
                    Write
                  </WriteButton>
                  <User>
                    <UserImg src={userData.photo} alt="userImg" />
                    <UserMenu>
                      <UserMenuList
                        onClick={() => navigate(`/profile`)}
                      >
                        Profile
                      </UserMenuList>
                      <UserMenuList onClick={handleLogOut}>Logout</UserMenuList>
                    </UserMenu>
                  </User>
                </>
              ) : (
                <>
                  <LoginButton onClick={() => handleModal("login")}>
                    Login
                  </LoginButton>
                  <RegistButton onClick={() => handleModal("register")}>
                    Register
                  </RegistButton>
                </>
              )}
            </HeaderRight>
          </HeaderWrapper>
        </HeaderInner>
      </Header>

      {setModal.show && <Modal />}
    </>
  );
};

export default Nav;

const Header = styled.header<{ $detailePage: boolean; $show: boolean }>`
  background-color: ${({ $show }) => $show && "rgba(255, 255, 255, 0.8)"};
  width: 100%;
  background-image: ${({ $detailePage, $show }) =>
    $detailePage
      ? "none"
      : $show
      ? "none"
      : "url(https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg)"};
  background-position: center;
  position: sticky;
  top: 0;
  z-index: 999;
  transition: all 0.2s ease-out;
`;

const HeaderInner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  position: relative;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  margin: 0;
  cursor: pointer;
  text-shadow: 2px 3px 0px #bdbdbd;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.div`
  width: 90px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  margin-right: 1rem;
  background-color: #848484;
  color: #d8d8d8;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
    background-color: #424242;
  }
`;
const RegistButton = styled.div`
  width: 90px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: #848484;
  color: #d8d8d8;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
    background-color: #424242;
  }
`;

const WriteButton = styled.div`
  width: 90px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: #6e6e6e;
  color: #cef6f5;
  margin-right: 1rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
    background-color: #424242;
  }
`;

const UserMenu = styled.div`
  display: none;
  position: absolute;
  top: 60px;
  right: 20px;
  width: 150px;
  color: #000;
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
`;

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
`;

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
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;
