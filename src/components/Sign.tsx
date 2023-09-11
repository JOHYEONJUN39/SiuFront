import { useState } from 'react'
import styled from 'styled-components'

interface SignProps {
  type: string
}

const Sign = ({type}: SignProps) => {
  const [userId, setUserId] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordCheck, setPasswordCheck] = useState<string>("")

  const [userIdError, setUserIdError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false)

  const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 아이디 유효성 검사
    const regExp = /^[a-zA-Z0-9]{4,12}$/
    if(regExp.test(e.target.value) || e.target.value === "") {
      setUserIdError(false)
    } else {
      setUserIdError(true)
    }

    setUserId(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== passwordCheck && passwordCheck !== "") {
      setPasswordCheckError(true)
    }

    const regExp = /^[a-zA-Z0-9]{4,12}$/
    if(regExp.test(e.target.value) || e.target.value === "") {
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
    setPassword(e.target.value)
  }

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === password || e.target.value === "") {
      setPasswordCheckError(false)
    } else {
      setPasswordCheckError(true)
    }

    setPasswordCheck(e.target.value)
  }

  return (
   <Container>
    <LoginForm>

      <UserId 
        type="text"
        placeholder="ID"
        value={userId}
        onChange={handleUserId}
        $error={userIdError}
      />
      {
        userIdError && (
          <ErrorText>아이디는 4~12자의 영문 대소문자와 숫자로만 입력해주세요.</ErrorText>
        )
      }

      <Password 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={handlePassword}
        $error={passwordError}
      />

      {
        passwordError && (
          <ErrorText>비밀번호는 4~12자의 영문 대소문자와 숫자로만 입력해주세요.</ErrorText>
        )
      }

      {type === "register" && (
        <>
          <RePassword 
            type="password" 
            placeholder="Password Check"
            value={passwordCheck}
            onChange={handlePasswordCheck}
          />
          {
            passwordCheckError && (
              <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
            )
          }
        </>

      )}

      <LoginButton>
        {type === "login" ? "Login" : "Register"}
      </LoginButton>
    </LoginForm>
   </Container> 
  )
}

export default Sign

const Container = styled.div`
  background: #de6161;
  background: -webkit-linear-gradient(to right, #2657eb, #de6161);
  background: linear-gradient(to right, #2657eb, #de6161);
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`

const LoginForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const UserId = styled.input<{$error: boolean}>`
  width: 300px;
  height: 40px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, .2);
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

  ${({$error}) => $error && `
    border-bottom: 2px solid red;

    &:focus {
      border-bottom: 2px solid red;
    }

    &:hover {
      border-bottom: 2px solid red;
    }
  `}
`

const Password = styled.input<{$error: boolean}>`
  width: 300px;
  height: 40px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, .2);
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

  ${({$error}) => $error && `
    border-bottom: 2px solid red;

    &:focus {
      border-bottom: 2px solid red;
    }

    &:hover {
      border-bottom: 2px solid red;
    }
  `}
`

const RePassword = styled.input`
  width: 300px;
  height: 40px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, .2);
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
`

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
`

const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`
