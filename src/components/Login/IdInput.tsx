import React, { useState } from 'react'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

interface Props {
  onInputChange: (value: string) => void;
}

const IdInput = ({onInputChange}: Props) => {
  const [userId, setUserId] = useState<string>("")
  const [idDuplicate, setIdDuplicate] = useState<boolean>(false)
  const [userIdError, setUserIdError] = useState<boolean>(false)

  const type = useSelector((state: RootState) => state.modal.modalType)

  // 아이디 유효성 검사
  const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {

    setIdDuplicate(false)

    setUserId(e.target.value)
    onInputChange(e.target.value)

    if (type === "login") {
      return;
    }

    const regExp = /^[a-zA-Z0-9]{4,12}$/
    if(regExp.test(e.target.value) || e.target.value === "") {
      setUserIdError(false)
    } else {
      setUserIdError(true)
    }
  }

    // userid 칸 빠져나갈 때 중복 검사
    const handleUserIdBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value === 'test') {
        setIdDuplicate(true)
      } else {
        setIdDuplicate(false)
      }
    }

  return (
    <>
      <UserId 
        type="text"
        placeholder="ID"
        value={userId}
        onChange={handleUserId}
        $error={userIdError}
        onBlur={handleUserIdBlur}
      />
      {
        userIdError && (
          <ErrorText>아이디는 4~12자의 영문 대소문자와 숫자로만 입력해주세요.</ErrorText>
        )
      }

      {
        idDuplicate && (
          <ErrorText>이미 존재하는 아이디입니다.</ErrorText>
        )
      }
    </>


  )
}

export default IdInput

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

const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`