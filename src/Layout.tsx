import { Outlet } from "react-router-dom";
import Nav from "./components/Layout/Nav";
import { styled } from "styled-components";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { showClose, showOpen } from "./store/headerSlice";

const Layout = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { capture: true });

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > ref.current?.offsetTop!) {
      dispatch(showOpen());
    } else {
      dispatch(showClose());
    }
  }, []);

  return (
    <>
      <Nav />
      <Container ref={ref}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;

const Container = styled.div`
  width: 1240px;
  margin: 0 auto;
  padding-top: 20px;
`;
