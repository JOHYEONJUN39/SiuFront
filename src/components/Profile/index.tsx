import styled from "styled-components"


const Profile = () => {

  return (
    <ProfileContainer>
      <ProfileImageCon>
        <ProfileImage src="http://via.placeholder.com/640x640" alt="" />
      </ProfileImageCon>
      <ProfileInfoCon>
        <ProfileInfo>
          User Name
        </ProfileInfo>
      </ProfileInfoCon>
    </ProfileContainer>
  )
}

export default Profile;

const ProfileContainer = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

const ProfileImageCon = styled.div`
  width: 20%;
  height: 100%;
  border-radius: 50%;
  background-color: blue;
`

const ProfileInfoCon = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: yellow;
`

const ProfileInfo = styled.div`
  width: 100%;
  height: 30px;
  font-size: 2rem;
  font-weight: bold;
  margin-left: 20px;
`