import { useState, useEffect } from "react";
import styled from "styled-components";

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <TopBtn
      id="topBtn"
      onClick={scrollToTop}
      style={{ display: showButton ? "block" : "none" }}
    >
      ↑
    </TopBtn>
  );
};

const TopBtn = styled.button`
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 50px;
  height: 50px;
  background-color: #007BFF;
  color: white;
  font-size: 24px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  animation: fade-in 0.3s ease-in-out;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default TopButton;
