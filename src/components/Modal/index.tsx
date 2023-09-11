import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useOutsideClick from '../../hooks/useOutsideClick';
import Login from '../Sign';

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  type: string
}

const Modal = ({setOpenModal, type}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // 모달 외부 클릭 시 모달 닫기
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({ divRef: ref, handler: () => hadleModalClose() });

  // 모달 닫을 때 애니메이션 효과
  const hadleModalClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setOpenModal(false)
    }, 500)
  }

  return (
    <Container>
      <ModalWrapper>
        <ModalMain $isOpen={isOpen} ref={ref}>
          <Login type={type} />
        </ModalMain>
      </ModalWrapper>
    </Container>
  )
}

export default Modal

const Container = styled.div`
  position: absolute;
  z-index: 999;
`

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 71%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalMain = styled.div<{$isOpen: boolean}>`
  background-color: #fff;
  position: relative;
  display: flex;
  width: 500px;
  height: 400px;
  border-radius: 1rem;
  animation: puffIn 1s;

  ${({$isOpen}) => !$isOpen && `
    animation: puffOut 1s;
  `}
  
  @media all and (min-width:768px) and (max-width:1023px) {
    width: 600px;
  } 
  
  @media all and (max-width:767px) {
    width: 400px;
  }

  @keyframes puffIn {
    0% {
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(2, 2);
      filter: blur(2px);
    }
    100% {
      opacity: 1;
      transform-origin: 50% 50%;
      transform: scale(1, 1);
      filter: blur(0px);
    }
  }

  @keyframes puffOut {
    0% {
      opacity: 1;
      transform-origin: 50% 50%;
      transform: scale(1, 1);
      filter: blur(0px);
    }

    100% {
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(2, 2);
      filter: blur(2px);
    }
  }
`