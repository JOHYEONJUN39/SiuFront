import styled from "styled-components";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateNickname, updatePhoto } from "../../store/userSlice";


const ProfileSettingPage = () => {
  const dispatch = useDispatch();
  // input type="file"은 value를 사용할 수 없다.
  // inputRef를 사용해서 input type="file"의 value를 사용할 수 있다.
  const inputRef = useRef<HTMLInputElement | null>(null);

  const userData = useSelector((state: RootState) => state.user);
  const [nicknameValue, setNicknameValue] = useState<string>(userData.nickname);
  const [profileImage, setProfileImage] = useState(userData.photo);
  
  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(e.target.value);
    console.log(nicknameValue);
  };

  const handleChangeClick = () => {

    // 21글자 이상인 경우
    if (nicknameValue.length >= 21) {
        return alert("닉네임은 20글자 이하여야 합니다.");
    }

    // 띄어쓰기를 사용한 경우
    if (nicknameValue.includes(' ')) {
        return alert("공백을 포함해서는 안됩니다.");
    }

    // formData 생성 // id, _method 필수
    const formData = new FormData();
    formData.append('id', userData.id)
    formData.append('_method', 'PATCH')
    formData.append('nickname', nicknameValue);
    formData.append('profile_image', profileImage);


    axios.post('http://localhost:8000/api/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
        dispatch(updateNickname(nicknameValue));
        dispatch(updatePhoto(profileImage));
      })
      .catch(error => {
        console.error(error);
      });
    // 업로드했던 이미지들 삭제
  };

  
  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.files가 없으면 return
    if (!e.target.files) {
      return;
    }
    // formData에 e.target.files[0]을 담아서 서버로 보내기
    // const formData = new FormData();
    // formData.append('id', userData.id)
    // formData.append('profile_image', e.target.files[0]);

    const formData = {
      id: userData.id,
      profile_image: e.target.files[0]
    }
    console.log(formData);

    // axios로 서버로 보내기 (예정)
    axios.post('http://localhost:8000/api/preview', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
        setProfileImage(response.data.profile_image);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  const onUploadImageButtonClick = useCallback(() => {
    // inputRef가 없으면 return
    if (!inputRef.current) {
      return;
    }
    // 클릭이벤트 발생
    inputRef.current.click();
  }, []);

  const handleDeleteImg = () => {
    const formData = {
      id: userData.id,
      _method: 'DELETE',
      profile_image: userData.photo
    }
    // 업로드되어있는 이미지 aws s3에서 삭제 요청
    axios.post('http://localhost:8000/api/preview', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
        setProfileImage('https://cdn-icons-png.flaticon.com/512/3985/3985429.png');
      })
      .catch(error => {
        console.error(error);
      });

    
  }

  return (
    <Container>
      <ProfileChangeCon>
          <ProfileImageCon>
            <ProfileImg src={profileImage} alt="" />
            <ImageUploadInput type="file" accept="image/*" ref={inputRef} onChange={onUploadImage}/>
            <ImageUploadBtn onClick={onUploadImageButtonClick}>이미지 업로드</ImageUploadBtn>
            <ImageDeleteBtn onClick={handleDeleteImg}>이미지 삭제</ImageDeleteBtn>
          </ProfileImageCon>
          <ProfileInfoCon>
            <UserNameInput type="text" value={nicknameValue}  onChange={handleInputChange}/>
          </ProfileInfoCon>
      </ProfileChangeCon>
      <DecisionCon>
        <ChangeBtn  onClick={handleChangeClick}>변경</ChangeBtn>
        <DeleteAccountBtn>회원탈퇴</DeleteAccountBtn>
      </DecisionCon>
    </Container>
  )
}

export default ProfileSettingPage;

const Container = styled.div`
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
`

const ProfileChangeCon = styled.div`
  width: 70%;
  height: 85%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`


const ProfileImageCon = styled.div`
  width: 18%;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  padding-right: 2rem;
  display: flex;
  flex-direction: column; 
  align-items: center;
`

const ProfileImg = styled.img`
  width: 100%;
  height: 60%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin-bottom: 1rem;
`

const ImageUploadInput = styled.input`
  display: none;
`

const ImageUploadBtn = styled.button`
  width: 100%;
  height: 12%;
  font-size: 1rem;
  font-weight: bold;
  background-color: #96F2D6;
  border: none;
  border-radius: 4px;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    background-color: #63E6BE;
  }
`

const ImageDeleteBtn = styled(ImageUploadBtn)`
  color:  #96F2D6;
  background-color: black;
  margin-top: 0.5rem;
  &:hover {
    background-color: #2A2A2A;
  }
`

const ProfileInfoCon = styled.div`
  flex: 1 0 auto;
  height: 100%;
  padding-left: 2rem;
  display: flex;
  align-items: center;
`

const UserNameInput = styled.input`
  width: 100%;
  height: 20%;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 0 20px;
  box-sizing: border-box;
  outline: none;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25) inset;
`

const DecisionCon = styled(ProfileChangeCon)`
  height: 15%;
  margin-top: 1rem;
  justify-content: flex-end;
`

const ChangeBtn = styled(ImageUploadBtn)`
  width: 20%;
  height: 100%;
  margin-right: 1rem;
`
const DeleteAccountBtn = styled(ImageDeleteBtn)`
  width: 20%;
  height: 100%;
  margin: 0;
`
