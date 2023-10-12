import styled from "styled-components"
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((state: RootState) => state.user);
  return (
    <ProfileContainer>
      <ProfileImageCon>
        <ProfileImage src={userData.photo} alt="" />
      </ProfileImageCon>
      <ProfileInfoCon>
        <ProfileInfo>
          {userData.nickname}
        </ProfileInfo>
      </ProfileInfoCon>
    </ProfileContainer>
  )
}

export default Profile;

const ProfileContainer = styled.div`
  width: 70%;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

const ProfileImageCon = styled.div`
  flex: 0 1 auto;
  height: 100%;
  border-radius: 50%;
`

const ProfileInfoCon = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
`

const ProfileInfo = styled.div`
  width: 100%;
  height: 30px;
  font-size: 2rem;
  font-weight: bold;
  margin-left: 20px;
`