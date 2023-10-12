import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styled from "styled-components";

interface Props {
  onInputChange: (value: string) => void;
}

const PasswordInput = ({ onInputChange }: Props) => {
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);

  const type = useSelector((state: RootState) => state.modal.modalType);

  // 비밀번호 유효성 검사
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "password") {
      onInputChange(value);
      setPassword(value);

      // 로그인 상태면 패스
      if (type === "login") {
        return;
      }

      // 유효성 체크
      const regExp = /^[a-zA-Z0-9]{4,12}$/;
      if (!value?.match(regExp)) {
        setPasswordError(true);
      } else if (passwordCheck.length > 0 && value !== passwordCheck) {
        setPasswordCheckError(true);
      } else {
        setPasswordError(false);
      }
    } else if (name === "passwordCheck") {
      setPasswordCheck(value);

      if (value !== password) {
        setPasswordCheckError(true);
      } else {
        setPasswordCheckError(false);
      }
    }
  };

  return (
    <>
      <Password
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
        $error={passwordError}
      />
      {passwordError && (
        <ErrorText>
          비밀번호는 4~12자의 영문 대소문자와 숫자로만 입력해주세요.
        </ErrorText>
      )}

      {type === "register" && (
        <>
          <RePassword
            name="passwordCheck"
            type="password"
            placeholder="Password Check"
            value={passwordCheck}
            onChange={handlePassword}
          />
          {passwordCheckError && (
            <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
          )}
        </>
      )}
    </>
  );
};

export default PasswordInput;

const Password = styled.input<{ $error: boolean }>`
  width: 300px;
  height: 40px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  color: #fff;

  &:focus {
    border-bottom: 2px solid #fff;
    outline: none;
  }

  &:hover {
    border-bottom: 2px solid #fff;
  }

  &::placeholder {
    color: #d3d1d3;
    font-weight: 100;
    margin-left: 1rem;
  }

  ${({ $error }) =>
    $error &&
    `
    border-bottom: 2px solid red;

    &:focus {
      border-bottom: 2px solid red;
    }

    &:hover {
      border-bottom: 2px solid red;
    }
  `}
`;

const RePassword = styled.input`
  width: 300px;
  height: 40px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  color: #fff;

  &:focus {
    border-bottom: 2px solid #fff;
    outline: none;
  }

  &:hover {
    border-bottom: 2px solid #fff;
  }

  &::placeholder {
    color: #d3d1d3;
    font-weight: 100;
    margin-left: 1rem;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;
