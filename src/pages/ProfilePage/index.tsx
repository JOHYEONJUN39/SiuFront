import styled from "styled-components";
import Profile from "../../components/Profile";
import LNB from "../../components/common/NB/LNB";
import type { page } from "../../types/Profile.interface";
import { useState } from "react";
import ProfilePostPage from "./ProfilePostPage";
import ProfileSettingPage from "./ProfileSettingPage";

// 
const pages : page[] = [
  {
    key: '글',
  },
  {
    key: '프로필 설정',
  },
]

const ProfilePage = () => {
  const [activePage, setActivePage] = useState<string>(pages[0].key);


  return (
    <Container>
      <Profile />
      <LNB pages={pages} activePage={activePage} setActivePage={setActivePage}/>
      {
        activePage === pages[0].key ?
        <ProfilePostPage />
        :
        <ProfileSettingPage />
      }
    </Container>
  );
}

export default ProfilePage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`


