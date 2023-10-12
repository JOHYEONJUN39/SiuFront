import { useState } from "react";
import styled from "styled-components";
import { register } from "../../api/Sign/register";
import { useLogin } from "../../api/Sign/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { showClose, showOpen } from "../../store/modalSlice";
import { useDispatch } from "react-redux";
import IdInput from "./IdInput";
import PasswordInput from "./Password";
import { PulseLoader } from "react-spinners";
import { useMutation } from "react-query";
import { setUser } from "../../store/userSlice";

const Sign = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginError, setLoginError] = useState<boolean>(false);
  const [accoutError, setAccountError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { login } = useLogin();

  const type = useSelector((state: RootState) => state.modal.modalType);

  const handleInputChange = (value: string) => {
    setUserId(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  // 로그인 mutation
  const loginMutation = useMutation(
    (data: { id: string; password: string }) => login(data),
    {
      onSuccess: (res) => {
        // 성공시 user 정보 저장
        dispatch(
          setUser({
            id: res.data.id,
            nickname: res.data.nickname,
            photo: res.data.profile_image,
          })
        );

        dispatch(showClose());
      },
      onError: () => {
        setAccountError(true);
      },
    }
  );

  // 회원가입 mutation
  const registerMutation = useMutation(
    (data: { id: string; nickname: string; password: string }) =>
      register(data),
    {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        loginMutation.mutate({ id: userId, password });
      },
      onError: (e) => {
        console.log(e);

        setAccountError(true);
      },
    }
  );

  // 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userId === "" || password === "") {
      setLoginError(true);
      return;
    }

    if (type === "login") {
      const data = {
        id: userId,
        password,
      };

      loginMutation.mutate(data);
    } else if (type === "register") {
      const data = {
        id: userId,
        nickname: userId,
        password,
      };

      registerMutation.mutate(data);
    }
  };

  // 로그인, 회원가입 창 전환
  const handleChange = (type: string) => {
    dispatch(
      showOpen({
        modalType: type,
      })
    );
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <IdInput onInputChange={handleInputChange} />

        <PasswordInput onInputChange={handlePasswordChange} />

        {loginError && <ErrorText>아이디와 비밀번호를 입력해주세요.</ErrorText>}

        {accoutError && (
          <ErrorText>올바르지 않은 아이디나 패스워드 입니다.</ErrorText>
        )}

        <LoginButton type="submit">
          {loginMutation.isLoading || registerMutation.isLoading ? (
            <PulseLoader color={"#36d7b7"} size={6} />
          ) : type === "login" ? (
            "로그인"
          ) : (
            "회원가입"
          )}
        </LoginButton>

        <TextBox>
          {type === "login" ? "아직 회원이 아니신가요?" : "이미 회원이신가요?"}

          <span
            style={{ color: "#ccc", marginLeft: "0.5rem", cursor: "pointer" }}
            onClick={() => {
              handleChange(type === "login" ? "register" : "login");
            }}
          >
            {type === "login" ? "회원가입" : "로그인"}
          </span>
        </TextBox>
      </LoginForm>
    </Container>
  );
};

export default Sign;

const Container = styled.div`
  background: #de6161;
  background: -webkit-linear-gradient(to right, #2657eb, #de6161);
  background: linear-gradient(to right, #2657eb, #de6161);
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

const LoginForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid #fff;
  border-radius: 0.5rem;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const TextBox = styled.div`
  border: none;
  background-color: transparent;
  border-radius: 0.2rem;
  box-sizing: border-box;
  color: #a4a4a4;
  font-size: 0.9rem;
  margin-top: 1.5rem;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;
