import styled from "styled-components";

const Header = styled.header`
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin-bottom: 20px;
    background-color: dimgray;
    color: white;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

const Link = styled.a`
    color: white;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: #f9f9f9;
    }
`;

const Profile = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;


const Button = styled.button`
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #cc0000;
  }
`;

export default function Layout({children, isLogined}) {
    console.log(localStorage.getItem("avatar"))
    return !isLogined ? (<>{children}</>) : (
        <>
            <Header>
                <Nav>
                    <Link href="/">HOME</Link>
                    <Link href="/profile">내 프로필</Link>
                </Nav>
                <Profile>
                    {localStorage.getItem("avatar") && localStorage.getItem("avatar") != null && (
                        <ProfileImage src={localStorage.getItem("avatar")} alt="Profile Image" width="50" height="50"/>
                    )}
                    <span>{localStorage.getItem("nickname")}</span>
                    <Button onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("nickname");
                        localStorage.removeItem("avatar");
                        window.location.href = "/login";
                    }}>로그아웃</Button>
                </Profile>
            </Header>
            {children}
        </>
    )
}