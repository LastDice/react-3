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

export default function Register() {
  return (
    <Container>
      <h1>회원가입</h1>
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
      <InputGroup>
        <label htmlFor="pass">닉네임</label>
        <input
          type="text"
          id="nick"
          placeholder="닉네임"
          min={1} max={10}
        />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={() => {
            axios.post("https://moneyfulpublicpolicy.co.kr/register", {
                id: document.getElementById("id").value,
                password: document.getElementById("pass").value,
                nickname: document.getElementById("nick").value
            }).then((res) => {
                if (res.data.success) {
                    alert("회원가입 성공.");
                    location.href = "/";
                }
            }).catch((err) => {
                alert(err.response.data.message);
            })
        }}>회원가입</Button>
        <BackButton onClick={() => location.href = "/login"}>로그인</BackButton>
      </ButtonGroup>
    </Container>
  );
}
