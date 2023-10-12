import styled from "styled-components";
import type { props } from "../../../types/Profile.interface";



const LNB = ({pages, activePage, setActivePage} : props) => {
  

  

  const handleClick = (key : string) => {
    setActivePage(key);
  };

  return (
    <NavigationMenuCon>
      {pages.map((page) => (
        <NavigationMenu key={page.key}>
          <NavigationMenuButton
            className={activePage === page.key ? "active" : ""}
            onClick={() => handleClick(page.key)}
          >
            <p>{page.key}</p>
          </NavigationMenuButton>
        </NavigationMenu>
      ))}
    </NavigationMenuCon>
  )
}

export default LNB;

const NavigationMenuCon = styled.div`
  width: 100%;
  height: 60px;
  margin: 70px 0 70px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const NavigationMenu = styled.div<{ active?: boolean }>`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const NavigationMenuButton = styled.button`
  width: 140px;
  height: 100%;
  background-color: transparent;
  border: none;
  display: block;
  font-size: 1.5rem;
  color: #000;
  border-bottom: 2px solid transparent;
  &:hover {
    cursor: pointer;
  }

  &.active {
    color: black;
    border-bottom: 2px solid red;
  }
`;