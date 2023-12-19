import { Outlet } from "react-router-dom";
import Nav from "./components/Layout/Nav";
import { styled } from "styled-components";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { showClose, showOpen } from "./store/headerSlice";
import { throttle } from "lodash";

const Layout = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const dispatchShowOpen = useCallback(() => dispatch(showOpen()), [dispatch]);
  const dispatchShowClose = useCallback(
    () => dispatch(showClose()),
    [dispatch]
  );

  const handleScrollThrottled = throttle(() => {
    const currentScrollY = window.scrollY;
    const offsetTop = ref.current?.offsetTop ?? 0;
    if (currentScrollY > offsetTop) {
      dispatchShowOpen();
    } else {
      dispatchShowClose();
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollThrottled, { capture: true });

    return () => {
      window.removeEventListener("scroll", handleScrollThrottled, {
        capture: true,
      });
    };
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
