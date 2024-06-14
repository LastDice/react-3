import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditProfile from "./pages/EditProfile";
import Layout from "./components/Layout";
import React, {useEffect, useState} from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [login, setLogin] = useState(false);
  // 어플리케이션을 새로고침 했을 경우에 혹은 브라우저를 껐다가 다시 재접속을 했을 때, accessToken 을 바탕으로 회원정보 확인 API 호출하여 로그인이 유지가 될 수 있게 합니다.
  React.useEffect(() => {
    if (location.href.includes("login") || location.href.includes("register")) return;
    axios.get("https://moneyfulpublicpolicy.co.kr/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.data.success) {
        console.log(res.data)
        localStorage.setItem("avatar", res.data.avatar);
        localStorage.setItem("nickname", res.data.nickname);
      }
      setLogin(res.data.success);
    }).catch(() => {
      setLogin(false);
      location.href = '/login'
    })
  }, []);

  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/expenses").then((res) => {
        setExpenses(res.data);
    });
  }, []);

  if (expenses.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Layout isLogined={login}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home expenses={expenses} setExpenses={setExpenses} />}
          />
          <Route
            path="/detail/:id"
            element={<Detail expenses={expenses} setExpenses={setExpenses} />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
              path="/profile"
              element={<EditProfile />}
          />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
