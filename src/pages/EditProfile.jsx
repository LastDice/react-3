import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.danger ? "#cc0000" : "#0056b3")};
  }
`;

export default function Login() {
  return (
    <Container>
      <h1>프로필 수정</h1>
      <InputGroup>
        <label htmlFor="nick">닉네임</label>
        <input
          type="text"
          id="nick"
          placeholder="닉네임"
          min={4} max={15}
          defaultValue={localStorage.getItem("nickname")}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="avatar-img">아바타 이미지</label>
        <input
          type="file"
          id="avatar-img"
          placeholder="아바타 이미지"
        />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={() => {
            // {
            // 	"Content-Type": "multipart/form-data",
            // 	"Authorization": "Bearer AccessToken"
            // }

            // FORM
            // {
            // 	"avatar": [이미지파일],
            // 	"nickname": "변경할 닉네임"
            // }
            const formData = new FormData();
            formData.append("avatar", document.getElementById("avatar-img").files[0]);
            formData.append("nickname", document.getElementById("nick").value);
            axios.patch("https://moneyfulpublicpolicy.co.kr/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                if (res.data.success) {
                    localStorage.setItem("avatar", res.data.avatar);
                    localStorage.setItem("nickname", res.data.nickname);
                    alert("프로필 업데이트 성공");
                    location.href = "/profile";
                }
            }).catch((err) => {
                alert(err.response && err.response.data ? err.response.data.message : "프로필 업데이트 실패");
            })
        }}>프로필 업데이트</Button>
      </ButtonGroup>
    </Container>
  );
}
