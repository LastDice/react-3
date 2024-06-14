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

const BackButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

export default function Login() {
  return (
    <Container>
      <h1>로그인</h1>
      <InputGroup>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          id="id"
          placeholder="아이디"
          min={4} max={10}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="pass">비밀번호</label>
        <input
          type="password"
          id="pass"
          placeholder="비밀번호"
          min={4} max={15}
        />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={() => {
            axios.post("https://moneyfulpublicpolicy.co.kr/login", {
              id: document.getElementById("id").value,
              password: document.getElementById("pass").value,
            }).then((res) => {
              if (res.data.success) {
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("avatar", res.data.avatar);
                localStorage.setItem("nickname", res.data.nickname);
                alert("로그인 성공");
                location.href = "/";
              }
            }).catch((err) => {
                alert(err.response.data.message);
            })
        }}>로그인</Button>
        <BackButton onClick={() => location.href = "/register"}>회원가입</BackButton>
      </ButtonGroup>
    </Container>
  );
}
